'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import LessonViewer from '@/components/learn/LessonViewer'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { LessonMeta } from '@/lib/content'

interface LessonViewerWrapperProps {
  userId: string
  moduleSlug: string
  moduleName: string
  lesson: { title: string; duration: string; content: string }
  serializedContent: MDXRemoteSerializeResult
  isCompleted: boolean
  lessonList: LessonMeta[]
  nextLesson: LessonMeta | null
}

export default function LessonViewerWrapper({
  userId,
  moduleSlug,
  moduleName,
  lesson,
  serializedContent,
  isCompleted,
  lessonList,
  nextLesson,
}: LessonViewerWrapperProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleComplete() {
    const currentSlug = lessonList.find((l) => l.title === lesson.title)?.slug
    if (!currentSlug) return

    await supabase.from('lesson_progress').upsert({
      user_id: userId,
      module_slug: moduleSlug,
      lesson_slug: currentSlug,
      completed_at: new Date().toISOString(),
    })

    // Update streak
    const today = new Date().toISOString().split('T')[0]
    const { data: streakData } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!streakData) {
      await supabase.from('streaks').insert({
        user_id: userId,
        current_streak: 1,
        longest_streak: 1,
        last_active_date: today,
      })
    } else {
      const lastDate = streakData.last_active_date
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      let newStreak = 1
      if (lastDate === yesterdayStr) {
        newStreak = streakData.current_streak + 1
      } else if (lastDate === today) {
        newStreak = streakData.current_streak
      }

      await supabase
        .from('streaks')
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, streakData.longest_streak),
          last_active_date: today,
        })
        .eq('user_id', userId)
    }

    router.refresh()
  }

  return (
    <LessonViewer
      moduleSlug={moduleSlug}
      moduleName={moduleName}
      lesson={lesson}
      serializedContent={serializedContent}
      isCompleted={isCompleted}
      lessonList={lessonList}
      nextLesson={nextLesson}
      onComplete={handleComplete}
    />
  )
}
