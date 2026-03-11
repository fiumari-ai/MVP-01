'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Do I need Amazon seller experience?',
    a: 'No. Operator Path starts from zero. Module 1 walks you through exactly how the model works and who it is for — no prior ecommerce experience required. The Standard tier takes you from zero to your first sale, step by step.',
  },
  {
    q: "What's in the Supplier Database?",
    a: 'Verified U.S. and international wholesale suppliers organized by product category — Home & Kitchen, Health & Beauty, Sports & Outdoors, Electronics Accessories, Pet Supplies, and more. Each entry includes contact info, minimum order ranges, Amazon seller policy notes, and a verification status. Updated weekly.',
  },
  {
    q: 'Is this FBA or FBM?',
    a: 'Both are covered. The training explains the difference between Fulfilled by Amazon (FBA) and Fulfilled by Merchant (FBM), helps you understand when each makes sense, and recommends the right starting path based on your budget and goals. Most beginners start with FBM and switch to FBA once they have validated their first product.',
  },
  {
    q: 'Can I cancel the Pro subscription?',
    a: 'Yes, anytime — no penalties, no contracts. You keep full Pro access until the end of your current billing period. Cancel from the Settings page in under 60 seconds.',
  },
  {
    q: 'How often is Pro content updated?',
    a: 'The Supplier Database and Product Finder are updated weekly. New prompts are added monthly based on community requests and new AI capabilities. The weekly update system includes a market intelligence summary, new product opportunities, and any supplier status changes.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-brand-text font-medium text-sm sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-brand-muted shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-brand-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
