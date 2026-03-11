import { CheckCircle2 } from 'lucide-react'

const features = [
  'Structured lessons that go from zero to first sale',
  'Verified supplier database, updated weekly',
  'Curated weekly product picks with real margins',
  'AI prompt pack for every Amazon task',
  'Community of active sellers sharing wins',
]

export default function SolutionBlock() {
  return (
    <section className="py-24 bg-brand-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-brand-green font-medium text-sm uppercase tracking-widest mb-3">
            The Solution
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Operator Path removes
            <br />
            <span className="text-brand-orange">every blocker</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature list */}
          <div className="space-y-5">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-brand-green" />
                </div>
                <p className="text-brand-text text-lg leading-relaxed">{feature}</p>
              </div>
            ))}

            <div className="pt-4">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
              >
                Get Started Free
              </a>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-brand-border">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 ml-2 bg-brand-dark rounded px-3 py-1 text-xs text-brand-muted">
                  operatorpath.com/dashboard
                </div>
              </div>

              {/* Mock dashboard content */}
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-36 bg-brand-border/80 rounded mb-1.5" />
                    <div className="h-3 w-48 bg-brand-border/50 rounded" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center">
                    <span className="text-brand-orange text-xs font-bold">68%</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {['12 Lessons', '3 Modules', '7 Day Streak'].map((s) => (
                    <div key={s} className="bg-brand-dark rounded-lg p-2.5">
                      <div className="h-5 w-12 bg-brand-orange/30 rounded mb-1" />
                      <div className="text-[10px] text-brand-muted">{s}</div>
                    </div>
                  ))}
                </div>

                {/* Continue card */}
                <div className="bg-brand-dark border-l-4 border-brand-orange rounded-lg p-3">
                  <div className="text-xs text-brand-muted mb-1">Continue</div>
                  <div className="h-3.5 w-40 bg-brand-border rounded mb-2" />
                  <div className="h-1.5 w-full bg-brand-border rounded-full">
                    <div className="h-1.5 w-3/5 bg-brand-orange rounded-full" />
                  </div>
                </div>

                {/* Module grid */}
                <div className="grid grid-cols-3 gap-2">
                  {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map((m, i) => (
                    <div
                      key={m}
                      className={`rounded-lg p-2.5 ${
                        i < 2
                          ? 'bg-brand-green/10 border border-brand-green/20'
                          : i === 2
                          ? 'bg-brand-orange/10 border border-brand-orange/20'
                          : i === 5
                          ? 'bg-brand-amber/10 border border-brand-amber/20'
                          : 'bg-brand-dark border border-brand-border'
                      }`}
                    >
                      <div className="text-xs font-medium text-brand-muted">{m}</div>
                      <div className="h-2 w-full bg-brand-border rounded mt-1">
                        <div
                          className={`h-2 rounded ${
                            i < 2
                              ? 'bg-brand-green w-full'
                              : i === 2
                              ? 'bg-brand-orange w-2/3'
                              : 'w-0'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pro banner */}
                <div className="bg-brand-amber/10 border border-brand-amber/20 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-brand-amber">Upgrade to Pro</div>
                    <div className="text-[10px] text-brand-muted">200+ suppliers, prompts & picks</div>
                  </div>
                  <div className="bg-brand-amber text-black text-xs font-bold px-2 py-1 rounded">
                    $9.90
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-brand-orange/5 blur-3xl rounded-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
