import { createClient } from '@/lib/supabase/server'
import { getModules, getLessons } from '@/lib/content'
import WelcomeBar from '@/components/dashboard/WelcomeBar'
import ProgressRing from '@/components/dashboard/ProgressRing'
import ContinueCard from '@/components/dashboard/ContinueCard'
import QuickStats from '@/components/dashboard/QuickStats'
import ModuleGrid from '@/components/dashboard/ModuleGrid'
import UpgradeBanner from '@/components/dashboard/UpgradeBanner'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profileResult, progressResult, streakResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user!.id).single(),
    supabase.from('lesson_progress').select('*').eq('user_id', user!.id),
    supabase.from('streaks').select('*').eq('user_id', user!.id).single(),
  ])

  const profile = profileResult.data
  const progress = progressResult.data || []
  const streak = streakResult.data

  const isPro = profile?.subscription_status === 'active'

  // Get all modules and compute progress
  const modules = getModules()
  const totalFreeLessons = modules
    .filter((m) => m.tier === 'free')
    .reduce((acc, m) => acc + m.lessons.length, 0)

  const completedLessonSlugs = new Set(
    progress.map((p) => `${p.module_slug}::${p.lesson_slug}`)
  )

  const lessonsCompleted = progress.length
  const modulesDone = modules.filter((m) => {
    const allLessons = getLessons(m.slug)
    return allLessons.length > 0 && allLessons.every((l) => completedLessonSlugs.has(`${m.slug}::${l.slug}`))
  }).length

  // Compute per-module progress map
  const progressMap: Record<string, { completed: number; total: number }> = {}
  for (const mod of modules) {
    const lessons = getLessons(mod.slug)
    const completed = lessons.filter((l) => completedLessonSlugs.has(`${mod.slug}::${l.slug}`)).length
    progressMap[mod.slug] = { completed, total: lessons.length }
  }

  // Overall % (only counting free lessons for non-pro)
  const denominator = isPro ? modules.reduce((a, m) => a + m.lessons.length, 0) : totalFreeLessons
  const overallPct = denominator > 0 ? Math.min(Math.round((lessonsCompleted / denominator) * 100), 100) : 0

  // Find last lesson to continue
  let lastLesson = null
  if (progress.length > 0) {
    const sorted = [...progress].sort(
      (a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
    )
    const last = sorted[0]
    const mod = modules.find((m) => m.slug === last.module_slug)
    if (mod) {
      const lessons = getLessons(mod.slug)
      const lastCompleted = lessons.find((l) => l.slug === last.lesson_slug)
      const lastIdx = lessons.findIndex((l) => l.slug === last.lesson_slug)
      const nextLessonInModule = lessons[lastIdx + 1]
      const targetLesson = nextLessonInModule || lastCompleted
      if (targetLesson) {
        lastLesson = {
          moduleSlug: mod.slug,
          moduleName: mod.title,
          lessonSlug: targetLesson.slug,
          lessonTitle: targetLesson.title,
          moduleProgress: progressMap[mod.slug]
            ? Math.round((progressMap[mod.slug].completed / progressMap[mod.slug].total) * 100)
            : 0,
        }
      }
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <WelcomeBar name={profile?.name ?? null} lessonsCompleted={lessonsCompleted} />
        <div className="shrink-0 hidden sm:block">
          <ProgressRing percentage={overallPct} size={72} />
        </div>
      </div>

      {/* Upgrade banner */}
      {!isPro && (
        <div className="mb-6">
          <UpgradeBanner isPro={isPro} context="default" />
        </div>
      )}

      {/* Continue card */}
      <div className="mb-6">
        <ContinueCard lastLesson={lastLesson} />
      </div>

      {/* Stats */}
      <div className="mb-8">
        <QuickStats
          lessonsCompleted={lessonsCompleted}
          modulesDone={modulesDone}
          streak={streak?.current_streak ?? 0}
        />
      </div>

      {/* Module grid */}
      <ModuleGrid modules={modules} progressMap={progressMap} isPro={isPro} />
    </div>
  )
}
