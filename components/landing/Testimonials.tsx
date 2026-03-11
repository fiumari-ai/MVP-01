import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marcus T.',
    location: 'Ohio',
    quote:
      'I used the supplier database to find my first product in 3 days. Made $340 on my first 20 units. Worth way more than $9.90.',
    initials: 'MT',
    color: 'bg-brand-orange',
  },
  {
    name: 'Jessica R.',
    location: 'Texas',
    quote:
      'The prompt pack alone is worth it. I optimized 6 listings in one afternoon and my click-through went up immediately.',
    initials: 'JR',
    color: 'bg-purple-500',
  },
  {
    name: 'Daniel K.',
    location: 'Florida',
    quote:
      "I was stuck for months before Operator Path. The Product Finder showed me exactly what was selling. Launched in 2 weeks.",
    initials: 'DK',
    color: 'bg-brand-green',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-dark relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-orange font-medium text-sm uppercase tracking-widest mb-3">
            Real results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What operators are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-brand-surface border border-brand-border rounded-2xl p-8 border-l-4"
              style={{ borderLeftColor: '#F97316' }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-brand-amber fill-brand-amber"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-brand-text leading-relaxed mb-8 text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-brand-text font-semibold text-sm">{t.name}</div>
                  <div className="text-brand-muted text-xs">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom social proof */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-brand-surface border border-brand-border rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {['#F97316', '#10B981', '#8B5CF6', '#F59E0B'].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-brand-surface flex items-center justify-center text-xs text-white font-bold"
                  style={{ backgroundColor: color }}
                >
                  {['M', 'J', 'D', 'K'][i]}
                </div>
              ))}
            </div>
            <span className="text-brand-text text-sm">
              <span className="font-semibold">2,847 sellers</span>{' '}
              <span className="text-brand-muted">already on the platform</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
