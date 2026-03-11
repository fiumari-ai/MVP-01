import { BookOpen, Zap, Users } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Learn',
    description:
      '5 modules, 18 lessons. Zero to first sale. Start with account setup and go all the way to generating reviews. Learn at your own pace, on your schedule.',
    badge: 'Free',
    badgeStyle: 'bg-brand-green/20 text-brand-green border border-brand-green/30',
    iconBg: 'bg-brand-green/10',
    iconColor: 'text-brand-green',
    border: 'border-brand-green/20',
    highlight: false,
  },
  {
    icon: Zap,
    title: 'Pro Tools',
    description:
      'Suppliers, AI prompts, weekly product picks. Everything you need to execute — not just learn. Stop guessing and start operating with real data.',
    badge: 'Pro',
    badgeStyle: 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30',
    iconBg: 'bg-brand-amber/10',
    iconColor: 'text-brand-amber',
    border: 'border-brand-amber/30',
    highlight: true,
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Active sellers sharing wins, supplier finds, and product ideas. Weekly drops of what\'s working right now. Real conversations, not a ghost town.',
    badge: 'Pro',
    badgeStyle: 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    border: 'border-brand-border',
    highlight: false,
  },
]

export default function FeaturePreview() {
  return (
    <section id="features" className="py-24 bg-brand-dark relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-orange font-medium text-sm uppercase tracking-widest mb-3">
            Everything you need
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            One platform, two tracks
          </h2>
          <p className="text-brand-muted mt-4 max-w-xl mx-auto">
            Start free with full access to 5 training modules. Upgrade to Pro when you&apos;re ready to execute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`relative bg-brand-surface border ${feature.border} rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                  feature.highlight
                    ? 'shadow-lg shadow-brand-amber/10 ring-1 ring-brand-amber/20'
                    : ''
                }`}
              >
                {feature.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-amber text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.iconBg} mb-6`}
                >
                  <Icon size={22} className={feature.iconColor} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${feature.badgeStyle}`}>
                    {feature.badge}
                  </span>
                </div>

                <p className="text-brand-muted leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
