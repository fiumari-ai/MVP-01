import Link from 'next/link'
import { ArrowRight, PlayCircle } from 'lucide-react'

interface LastLesson {
  moduleSlug: string
  moduleName: string
  lessonSlug: string
  lessonTitle: string
  moduleProgress: number
}

interface ContinueCardProps {
  lastLesson: LastLesson | null
}

export default function ContinueCard({ lastLesson }: ContinueCardProps) {
  if (!lastLesson) {
    return (
      <div className="bg-brand-surface border border-brand-orange/20 rounded-2xl p-6 border-l-4 border-l-brand-orange">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-brand-orange/10 rounded-xl shrink-0">
            <PlayCircle size={24} className="text-brand-orange" />
          </div>
          <div className="flex-1">
            <p className="text-brand-muted text-xs font-medium uppercase tracking-wide mb-1">
              Start Here
            </p>
            <h3 className="text-white font-semibold text-lg mb-1">
              The Invisible Partner Code
            </h3>
            <p className="text-brand-muted text-sm mb-4">
              Module 1 — The Model: What This Is and How It Works
            </p>
            <Link
              href="/learn/01-the-model/what-you-just-activated"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              Start Learning
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-brand-surface border border-brand-orange/20 rounded-2xl p-6 border-l-4 border-l-brand-orange">
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-brand-orange/10 rounded-xl shrink-0">
          <PlayCircle size={24} className="text-brand-orange" />
        </div>
        <div className="flex-1">
          <p className="text-brand-muted text-xs font-medium uppercase tracking-wide mb-1">
            Continue Learning
          </p>
          <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">
            {lastLesson.lessonTitle}
          </h3>
          <p className="text-brand-muted text-sm mb-3">{lastLesson.moduleName}</p>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-brand-muted mb-1.5">
              <span>Module Progress</span>
              <span>{lastLesson.moduleProgress}%</span>
            </div>
            <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-orange rounded-full transition-all duration-500"
                style={{ width: `${lastLesson.moduleProgress}%` }}
              />
            </div>
          </div>

          <Link
            href={`/learn/${lastLesson.moduleSlug}/${lastLesson.lessonSlug}`}
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            Continue
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
