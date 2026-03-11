import { createClient } from '@/lib/supabase/server'
import { getModules, getLessons } from '@/lib/content'
import ModuleCard from '@/components/learn/ModuleCard'

export default async function LearnPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profileResult, progressResult] = await Promise.all([
    supabase.from('profiles').select('subscription_status').eq('id', user!.id).single(),
    supabase.from('lesson_progress').select('module_slug, lesson_slug').eq('user_id', user!.id),
  ])

  const isPro = profileResult.data?.subscription_status === 'active'
  const progress = progressResult.data || []

  const completedSet = new Set(progress.map((p) => `${p.module_slug}::${p.lesson_slug}`))
  const modules = getModules()

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">The Invisible Partner Code</h1>
        <p className="text-brand-muted mt-1">
          {isPro
            ? `${modules.length} modules · ${modules.reduce((a, m) => a + m.lessons.length, 0)} lessons`
            : `6 modules · 18 lessons free · ${modules.filter((m) => m.tier === 'pro').length} Pro modules`}
        </p>
      </div>

      <div className="space-y-6">
        {/* Free modules */}
        <div>
          <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-4">
            Standard — Free
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {modules
              .filter((m) => m.tier === 'free')
              .map((module) => {
                const lessons = getLessons(module.slug)
                const completed = lessons.filter((l) =>
                  completedSet.has(`${module.slug}::${l.slug}`)
                ).length
                return (
                  <ModuleCard
                    key={module.slug}
                    module={module}
                    completedCount={completed}
                    isPro={isPro}
                  />
                )
              })}
          </div>
        </div>

        {/* Pro modules */}
        <div>
          <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
            Premium — Pro
            {!isPro && <span className="pro-badge">Upgrade Required</span>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {modules
              .filter((m) => m.tier === 'pro')
              .map((module) => {
                const lessons = getLessons(module.slug)
                const completed = lessons.filter((l) =>
                  completedSet.has(`${module.slug}::${l.slug}`)
                ).length
                return (
                  <ModuleCard
                    key={module.slug}
                    module={module}
                    completedCount={completed}
                    isPro={isPro}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
