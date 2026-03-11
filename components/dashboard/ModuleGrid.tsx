import Link from 'next/link'
import { Lock, Clock, BookOpen, CheckCircle2 } from 'lucide-react'
import type { ModuleMeta } from '@/lib/content'
import ProgressRing from './ProgressRing'

interface ModuleProgress {
  completed: number
  total: number
}

interface ModuleGridProps {
  modules: ModuleMeta[]
  progressMap: Record<string, ModuleProgress>
  isPro: boolean
}

export default function ModuleGrid({ modules, progressMap, isPro }: ModuleGridProps) {
  return (
    <div>
      <h2 className="text-white font-semibold text-lg mb-4">All Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {modules.map((module) => {
          const isLocked = module.tier === 'pro' && !isPro
          const progress = progressMap[module.slug] || { completed: 0, total: module.lessons.length }
          const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0
          const isDone = pct === 100

          const cardContent = (
            <div
              className={`relative bg-brand-surface border rounded-xl p-5 transition-all duration-200 h-full ${
                isLocked
                  ? 'border-brand-border opacity-70'
                  : 'border-brand-border hover:border-brand-orange/40 cursor-pointer'
              }`}
            >
              {/* Pro overlay */}
              {isLocked && (
                <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-brand-dark/60 z-10">
                  <div className="text-center">
                    <Lock size={20} className="text-brand-amber mx-auto mb-1" />
                    <span className="pro-badge text-xs">PRO</span>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: module.color + '33', color: module.color }}
                >
                  {String(module.order).padStart(2, '0')}
                </div>
                {isDone ? (
                  <CheckCircle2 size={20} className="text-brand-green shrink-0" />
                ) : (
                  <ProgressRing percentage={pct} size={36} />
                )}
              </div>

              <h3 className="text-brand-text font-semibold text-sm mb-1 line-clamp-2">
                {module.title}
              </h3>
              <p className="text-brand-muted text-xs mb-3 line-clamp-2">{module.description}</p>

              <div className="flex items-center gap-3 text-xs text-brand-muted">
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {module.lessons.length} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {module.estimatedTime}
                </span>
              </div>
            </div>
          )

          if (isLocked) {
            return (
              <Link key={module.slug} href="/upgrade" className="block h-full">
                {cardContent}
              </Link>
            )
          }

          return (
            <Link
              key={module.slug}
              href={`/learn/${module.slug}/${module.lessons[0]}`}
              className="block h-full"
            >
              {cardContent}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
