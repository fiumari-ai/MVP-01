import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-brand-dark" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] rounded-full bg-brand-amber/5 blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#E8E8E8 1px, transparent 1px), linear-gradient(90deg, #E8E8E8 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border rounded-full px-4 py-1.5 text-sm text-brand-muted mb-8">
          <span>🔥</span>
          <span className="text-brand-text font-medium">Live Platform</span>
          <span className="text-brand-muted">— Not Just a Course</span>
        </div>

        {/* H1 */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">The Operating System</span>
          <br />
          <span className="gradient-text">for Amazon Resellers</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Learn the model for free. Run it with Pro. Used by{' '}
          <span className="text-brand-text font-medium">2,847 sellers</span> building
          their first $1,000/month.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 glow-orange"
          >
            Start for Free
            <ArrowRight size={18} />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-brand-border hover:border-brand-orange text-brand-text hover:text-brand-orange font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200"
          >
            See Pro Tools
          </Link>
        </div>

        {/* Social proof pills */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {[
            'No credit card needed',
            'Start in 5 minutes',
            'Real supplier data',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm text-brand-muted"
            >
              <CheckCircle2 size={15} className="text-brand-green shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          {[
            { value: '2,847', label: 'Active Sellers' },
            { value: '18', label: 'Free Lessons' },
            { value: '$9.90', label: 'Pro / Month' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-orange">
                {stat.value}
              </div>
              <div className="text-xs text-brand-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
