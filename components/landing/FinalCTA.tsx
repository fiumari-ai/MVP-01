import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-brand-surface border border-brand-border rounded-3xl p-12 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-orange-glow opacity-40 pointer-events-none" />

          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Your first sale is closer<br />than you think.
            </h2>
            <p className="text-brand-muted text-lg mb-8 max-w-xl mx-auto">
              Join 2,847 sellers who started with Operator Path. Free to begin. No credit card needed.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 hover:scale-105 glow-orange"
            >
              Start for Free
              <ArrowRight size={20} />
            </Link>
            <p className="text-brand-muted text-sm mt-4">
              No credit card. No commitment. Start in 5 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
