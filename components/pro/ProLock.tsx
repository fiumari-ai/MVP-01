import Link from 'next/link'
import { Lock, Database, Sparkles, TrendingUp, Users, ArrowRight } from 'lucide-react'

interface ProLockProps {
  featureName: string
  description?: string
}

const PRO_FEATURES = [
  { icon: Database, text: 'Supplier Database — 200+ verified sources' },
  { icon: Sparkles, text: 'AI Prompt Pack — 50+ ready-to-use prompts' },
  { icon: TrendingUp, text: 'Product Finder — weekly winning picks' },
  { icon: Users, text: 'Community — peer intelligence network' },
]

export default function ProLock({ featureName, description }: ProLockProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex p-4 bg-brand-amber/10 rounded-2xl border border-brand-amber/20 mb-6">
          <Lock size={32} className="text-brand-amber" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{featureName}</h2>
        <p className="text-brand-muted mb-6 text-sm leading-relaxed">
          {description ||
            'This is a Pro execution tool. Upgrade to unlock the full operating layer.'}
        </p>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 mb-6 text-left">
          <p className="text-brand-muted text-xs font-semibold uppercase tracking-wide mb-3">
            Pro includes
          </p>
          <ul className="space-y-3">
            {PRO_FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <li key={f.text} className="flex items-center gap-3 text-brand-text text-sm">
                  <Icon size={15} className="text-brand-orange shrink-0" />
                  {f.text}
                </li>
              )
            })}
          </ul>
        </div>

        <Link
          href="/upgrade"
          className="inline-flex items-center gap-2 w-full justify-center bg-brand-orange hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-all glow-orange"
        >
          Upgrade to Pro — $9.90/month
          <ArrowRight size={16} />
        </Link>
        <p className="text-brand-muted text-xs mt-3">Cancel anytime. No contracts.</p>
      </div>
    </div>
  )
}
