import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

interface UpgradeBannerProps {
  isPro: boolean
  context?: 'suppliers' | 'prompts' | 'finder' | 'default'
}

const MESSAGES: Record<string, string> = {
  suppliers: 'Get access to 200+ verified suppliers. Start with real products this week.',
  prompts: '50+ AI prompts to write listings, research products, and contact suppliers.',
  finder: 'New winning products dropped every week. Don\'t miss this week\'s picks.',
  default: 'Upgrade to Pro and unlock the full execution layer for $9.90/month.',
}

export default function UpgradeBanner({ isPro, context = 'default' }: UpgradeBannerProps) {
  if (isPro) return null

  return (
    <div className="bg-brand-amber/5 border border-brand-amber/20 rounded-xl p-4 flex items-center gap-4 border-l-4 border-l-brand-amber">
      <div className="p-2 bg-brand-amber/10 rounded-lg shrink-0">
        <Zap size={18} className="text-brand-amber" />
      </div>
      <p className="text-brand-text text-sm flex-1">{MESSAGES[context]}</p>
      <Link
        href="/upgrade"
        className="inline-flex items-center gap-1.5 text-brand-amber font-semibold text-sm hover:text-amber-400 transition-colors shrink-0"
      >
        Upgrade Now
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}
