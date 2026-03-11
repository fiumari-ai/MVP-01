import { HelpCircle, Package, Brain } from 'lucide-react'

const problems = [
  {
    icon: HelpCircle,
    title: "You don't know what to sell",
    description:
      'Every product seems saturated. You spend weeks researching and never pull the trigger. The fear of picking the wrong item keeps you paralyzed.',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
  },
  {
    icon: Package,
    title: "You don't know where to source",
    description:
      'Alibaba feels risky. Domestic suppliers are hard to find. You\'re stuck before you even start because you can\'t figure out where real products come from.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
  },
  {
    icon: Brain,
    title: 'You feel overwhelmed by the platform',
    description:
      "Seller Central is confusing. The rules feel complex. You're scared of making a costly mistake that could get your account suspended before you make a dollar.",
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
]

export default function ProblemBlock() {
  return (
    <section className="py-24 bg-brand-dark relative">
      {/* Subtle separator from hero */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-orange font-medium text-sm uppercase tracking-widest mb-3">
            Sound familiar?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            The 3 Reasons Most People
            <br />
            <span className="text-brand-muted">Never Start</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <div
                key={index}
                className={`bg-brand-surface border ${problem.border} rounded-2xl p-8 relative overflow-hidden group hover:border-brand-border/60 transition-all duration-300`}
              >
                {/* Background number */}
                <div className="absolute top-4 right-4 text-7xl font-bold text-white/[0.03] select-none">
                  {index + 1}
                </div>

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${problem.bg} mb-6`}
                >
                  <Icon size={22} className={problem.color} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {problem.title}
                </h3>
                <p className="text-brand-muted leading-relaxed text-sm">
                  {problem.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-brand-muted text-lg">
            These aren&apos;t knowledge problems.{' '}
            <span className="text-brand-text font-medium">
              They&apos;re execution problems.
            </span>{' '}
            And we built the solution.
          </p>
        </div>
      </div>
    </section>
  )
}
