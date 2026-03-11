'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { CheckCircle2, ArrowRight, ChevronLeft, Clock, CheckCheck } from 'lucide-react'
import type { LessonMeta } from '@/lib/content'

interface LessonViewerProps {
  moduleSlug: string
  moduleName: string
  lesson: { title: string; duration: string; content: string }
  serializedContent: MDXRemoteSerializeResult
  isCompleted: boolean
  lessonList: LessonMeta[]
  nextLesson: LessonMeta | null
  onComplete: () => Promise<void>
}

export default function LessonViewer({
  moduleSlug,
  moduleName,
  lesson,
  serializedContent,
  isCompleted,
  lessonList,
  nextLesson,
  onComplete,
}: LessonViewerProps) {
  const [completing, setCompleting] = useState(false)
  const [done, setDone] = useState(isCompleted)

  async function handleComplete() {
    if (done) return
    setCompleting(true)
    await onComplete()
    setDone(true)
    setCompleting(false)
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* Lesson sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-brand-border bg-brand-surface/50 sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 border-b border-brand-border">
          <Link
            href="/learn"
            className="flex items-center gap-1.5 text-brand-muted hover:text-brand-text text-sm transition-colors mb-2"
          >
            <ChevronLeft size={14} />
            All Modules
          </Link>
          <p className="text-brand-text font-semibold text-sm line-clamp-2">{moduleName}</p>
        </div>
        <nav className="p-3 space-y-1">
          {lessonList.map((l) => {
            const isCurrent = l.title === lesson.title
            return (
              <Link
                key={l.slug}
                href={`/learn/${moduleSlug}/${l.slug}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                  isCurrent
                    ? 'bg-brand-orange/10 text-brand-orange font-medium'
                    : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
                }`}
              >
                {l.slug === lessonList.find(ls => ls.title === lesson.title)?.slug && done ? (
                  <CheckCircle2 size={14} className="text-brand-green shrink-0" />
                ) : (
                  <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${isCurrent ? 'border-brand-orange' : 'border-brand-border'}`} />
                )}
                <span className="line-clamp-2">{l.title}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/learn"
              className="flex items-center gap-1.5 text-brand-muted hover:text-brand-text text-sm transition-colors mb-4 lg:hidden"
            >
              <ChevronLeft size={14} />
              Back to modules
            </Link>
            <div className="flex items-center gap-2 text-brand-muted text-xs mb-3">
              <Clock size={13} />
              <span>{lesson.duration}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{lesson.title}</h1>
          </div>

          {/* MDX content */}
          <div className="mdx-content">
            <MDXRemote {...serializedContent} />
          </div>

          {/* Action footer */}
          <div className="mt-12 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {!done ? (
              <button
                onClick={handleComplete}
                disabled={completing}
                className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 hover:border-brand-green text-brand-green font-semibold text-sm px-6 py-3 rounded-xl transition-all disabled:opacity-50"
              >
                <CheckCheck size={16} />
                {completing ? 'Saving...' : 'Mark as Complete'}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-brand-green font-semibold text-sm">
                <CheckCircle2 size={18} />
                Completed
              </div>
            )}

            {nextLesson && (
              <Link
                href={`/learn/${moduleSlug}/${nextLesson.slug}`}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all"
              >
                Next Lesson
                <ArrowRight size={16} />
              </Link>
            )}
            {!nextLesson && done && (
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border hover:border-brand-orange text-brand-text hover:text-brand-orange font-semibold text-sm px-6 py-3 rounded-xl transition-all"
              >
                All Modules
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
