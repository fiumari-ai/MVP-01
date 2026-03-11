'use client'

import Link from 'next/link'
import { Lock, X, ArrowRight } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  featureName: string
}

export default function UpgradeModal({ isOpen, onClose, featureName }: UpgradeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-brand-surface border border-brand-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-muted hover:text-brand-text transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-brand-amber/10 rounded-xl">
            <Lock size={20} className="text-brand-amber" />
          </div>
          <div>
            <p className="text-brand-muted text-xs font-medium uppercase tracking-wide">Pro Feature</p>
            <h3 className="text-white font-bold">{featureName}</h3>
          </div>
        </div>

        <p className="text-brand-muted text-sm mb-5 leading-relaxed">
          This tool is part of the Pro execution layer. Upgrade to unlock suppliers, prompts, product picks, and community access.
        </p>

        <Link
          href="/upgrade"
          className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all"
        >
          Upgrade to Pro — $9.90/month
          <ArrowRight size={16} />
        </Link>
        <p className="text-center text-brand-muted text-xs mt-2">Cancel anytime</p>
      </div>
    </div>
  )
}
