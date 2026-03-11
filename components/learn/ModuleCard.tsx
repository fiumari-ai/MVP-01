import Link from 'next/link'
import { Lock, Clock, BookOpen } from 'lucide-react'
import type { ModuleMeta } from '@/lib/content'
import ProgressRing from '@/components/dashboard/ProgressRing'

interface ModuleCardProps {
  module: ModuleMeta
  completedCount: number
  isPro: boolean
}

export default function ModuleCard({ module, completedCount, isPro }: ModuleCardProps) {
  const isLocked = module.tier === 'pro' && !isPro
  const total = module.lessons.length
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0

  const status =
    pct === 100 ? 'Complete' : completedCount > 0 ? 'In Progress' : 'Not Started'
  const statusColor =
    pct === 100
      ? 'text-brand-green'
      : completedCount > 0
      ? 'text-brand-orange'
      : 'text-brand-muted'

  const content = (
    <div
      className={`relative bg-brand-surface border rounded-2xl p-6 h-full transition-all duration-200 ${
        isLocked
          ? 'border-brand-border opacity-70'
          : 'border-brand-border hover:border-brand-orange/40 hover:-translate-y-0.5'
      }`}
    >
      {isLocked && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-brand-dark/50 z-10">
          <div className="text-center">
            <Lock size={22} className="text-brand-amber mx-auto mb-1.5" />
            <span className="pro-badge">PRO</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
          style={{ backgroundColor: module.color + '22', color: module.color }}
        >
          {String(module.order).padStart(2, '0')}
        </div>
        <ProgressRing percentage={pct} size={44} />
      </div>

      <h3 className="text-white font-semibold text-base mb-1">{module.title}</h3>
      <p className="text-brand-muted text-sm mb-4 line-clamp-2">{module.description}</p>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-brand-muted">
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            {total} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {module.estimatedTime}
          </span>
        </div>
        <span className={`font-medium ${statusColor}`}>{status}</span>
      </div>
    </div>
  )

  if (isLocked) {
    return (
      <Link href="/upgrade" className="block h-full">
        {content}
      </Link>
    )
  }

  return (
    <Link href={`/learn/${module.slug}/${module.lessons[0]}`} className="block h-full">
      {content}
    </Link>
  )
}
