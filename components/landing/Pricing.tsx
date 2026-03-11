'use client'

import Link from 'next/link'
import { Check, Star } from 'lucide-react'

const FREE_FEATURES = [
  '6 modules — 18 lessons',
  'Full beginner training',
  'Progress tracking',
  'Lesson completion streak',
  'Basic dashboard',
]

const PRO_FEATURES = [
  'Everything in Free',
  'Supplier Database (200+ verified)',
  'Weekly database updates',
  'AI Prompt Pack (50+ prompts)',
  'Product Finder — weekly picks',
  'Community access',
  'Weekly market intelligence',
  'Priority updates',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-brand-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready to execute.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <div className="mb-6">
              <p className="text-brand-muted text-sm font-medium uppercase tracking-wide mb-2">
                Standard
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-brand-muted mb-1">/month</span>
              </div>
              <p className="text-brand-muted text-sm">Free forever</p>
            </div>

            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-brand-text text-sm">
                  <Check size={16} className="text-brand-green shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="block w-full text-center bg-brand-surface border border-brand-border hover:border-brand-orange text-brand-text hover:text-brand-orange font-semibold py-3 rounded-xl transition-all duration-200"
            >
              Start Free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative bg-brand-surface border-2 border-brand-orange rounded-2xl p-8">
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                <Star size={11} fill="white" />
                Most Popular
              </div>
            </div>

            <div className="mb-6">
              <p className="text-brand-amber text-sm font-medium uppercase tracking-wide mb-2">
                Pro
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">$9.90</span>
                <span className="text-brand-muted mb-1">/month</span>
              </div>
              <p className="text-brand-muted text-sm">Less than a coffee a week</p>
            </div>

            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map((feature, i) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check
                    size={16}
                    className={i === 0 ? 'text-brand-muted shrink-0' : 'text-brand-orange shrink-0'}
                  />
                  <span className={i === 0 ? 'text-brand-muted' : 'text-brand-text'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup?plan=pro"
              className="block w-full text-center bg-brand-orange hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 glow-orange"
            >
              Start Pro — $9.90/month
            </Link>

            <p className="text-center text-brand-muted text-xs mt-3">
              Cancel anytime. No contracts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
