import { notFound, redirect } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import { createClient } from '@/lib/supabase/server'
import { getLesson, getLessons, getModule } from '@/lib/content'
import LessonViewerWrapper from './LessonViewerWrapper'
import ProLock from '@/components/pro/ProLock'

interface LessonPageProps {
  params: { module: string; lesson: string }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const lesson = getLesson(params.module, params.lesson)
  const module = getModule(params.module)

  if (!lesson || !module) notFound()

  // Check Pro access
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const isPro = profile?.subscription_status === 'active'

  if (lesson.tier === 'pro' && !isPro) {
    return (
      <div className="p-6">
        <ProLock
          featureName={lesson.title}
          description="This lesson is part of the Pro tier. Upgrade to access all 15 Pro lessons, the Supplier Database, Prompt Pack, Product Finder, and Community."
        />
      </div>
    )
  }

  // Check if completed
  const { data: progressData } = await supabase
    .from('lesson_progress')
    .select('id')
    .eq('user_id', user.id)
    .eq('module_slug', params.module)
    .eq('lesson_slug', params.lesson)
    .single()

  const isCompleted = !!progressData

  // Get all lessons for sidebar
  const allLessons = getLessons(params.module)
  const currentIdx = allLessons.findIndex((l) => l.slug === params.lesson)
  const nextLesson = allLessons[currentIdx + 1] || null

  // Serialize MDX
  const serializedContent = await serialize(lesson.content)

  return (
    <LessonViewerWrapper
      userId={user.id}
      moduleSlug={params.module}
      moduleName={module.title}
      lesson={{ title: lesson.title, duration: lesson.duration, content: lesson.content }}
      serializedContent={serializedContent}
      isCompleted={isCompleted}
      lessonList={allLessons}
      nextLesson={nextLesson}
    />
  )
}
