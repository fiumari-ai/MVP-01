import Link from 'next/link'
import { CheckCircle2, ArrowRight, Database, FileText, TrendingUp, Users, Zap } from 'lucide-react'

const proFeatures = [
  { icon: Database, label: 'Supplier Database — 200+ verified, updated weekly' },
  { icon: FileText, label: 'AI Prompt Pack — 50+ prompts for every task' },
  { icon: TrendingUp, label: 'Product Finder — Weekly winning product picks' },
  { icon: Users, label: 'Community — Active sellers sharing what works' },
  { icon: Zap, label: 'Priority updates — New tools added every month' },
]

export default function ProTeaser() {
  return (
    <section className="py-24 bg-brand-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-amber/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/20 rounded-full px-4 py-1.5 text-sm text-brand-amber mb-6">
              <Zap size={14} />
              <span className="font-medium">The Pro Execution Layer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Stop guessing.
              <br />
              <span className="text-brand-orange">Start operating.</span>
            </h2>

            <p className="text-brand-muted text-lg mb-8 leading-relaxed">
              The training gets you ready. Pro tools get you{' '}
              <span className="text-brand-text font-medium">moving</span>. Real supplier
              contacts. Real product data. AI prompts that write your listings in minutes.
            </p>

            <div className="space-y-4 mb-10">
              {proFeatures.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-brand-orange" />
                    </div>
                    <span className="text-brand-text text-sm">{feature.label}</span>
                  </div>
                )
              })}
            </div>

            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 glow-orange"
            >
              Unlock Pro — $9.90/month
              <ArrowRight size={18} />
            </Link>
            <p className="text-brand-muted text-xs mt-3">
              Cancel anytime. No contracts. Instant access.
            </p>
          </div>

          {/* Right: Frosted glass dashboard preview */}
          <div className="relative">
            <div className="relative bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-2xl">
              {/* Glass overlay with blur effect */}
              <div className="absolute inset-0 backdrop-blur-[1px] bg-brand-surface/30 z-10 pointer-events-none" />

              {/* PRO badge overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
                <div className="bg-brand-dark/90 border border-brand-amber/40 rounded-2xl px-8 py-6 shadow-xl">
                  <div className="pro-badge mx-auto mb-3 inline-block">PRO</div>
                  <p className="text-brand-text font-semibold text-sm">Unlock Pro to access</p>
                </div>
              </div>

              {/* Blurred content */}
              <div className="p-5 filter blur-[2px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white font-semibold">Supplier Database</div>
                    <div className="text-xs text-brand-muted">Updated Jan 15, 2024</div>
                  </div>
                  <span className="text-xs bg-brand-green/20 text-brand-green border border-brand-green/30 px-2 py-1 rounded-full">
                    Updated Weekly
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Midwest Wholesale Co.', cat: 'Home & Kitchen', country: 'USA' },
                    { name: 'Pacific Rim Exports', cat: 'Electronics', country: 'Taiwan' },
                    { name: 'Southern Beauty Supply', cat: 'Beauty', country: 'USA' },
                    { name: 'Great Lakes Distributors', cat: 'Outdoor', country: 'USA' },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-brand-dark rounded-lg p-3"
                    >
                      <div>
                        <div className="text-sm font-medium text-brand-text">{s.name}</div>
                        <div className="text-xs text-brand-muted">{s.cat}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-brand-muted">{s.country}</span>
                        <CheckCircle2 size={14} className="text-brand-green" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-brand-border">
                  <div className="text-xs text-brand-muted mb-2">This Week&apos;s Product Picks</div>
                  <div className="space-y-2">
                    {['Silicone Utensil Set', 'Portable Blender', 'Foam Roller'].map((p, i) => (
                      <div key={i} className="flex items-center justify-between bg-brand-dark rounded p-2">
                        <span className="text-xs text-brand-text">{p}</span>
                        <span className="text-xs text-brand-green">+{32 + i * 5}% margin</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute -inset-8 bg-brand-orange/10 blur-3xl rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
