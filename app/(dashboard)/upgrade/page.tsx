import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createCheckoutSession } from '@/lib/stripe'
import { Check, Star, Database, Sparkles, TrendingUp, Users, RefreshCw } from 'lucide-react'
import CheckoutButton from './CheckoutButton'

const PRO_FEATURES = [
  { icon: Database, title: 'Supplier Database', desc: '200+ verified U.S. wholesale suppliers, updated weekly' },
  { icon: Sparkles, title: 'AI Prompt Pack', desc: '50+ structured prompts for listings, research, and outreach' },
  { icon: TrendingUp, title: 'Product Finder', desc: 'Weekly curated picks with demand scores and margin data' },
  { icon: Users, title: 'Community', desc: 'Peer intelligence network — supplier intel, wins, Q&A' },
  { icon: RefreshCw, title: 'Weekly Updates', desc: 'Market intelligence, new picks, database updates every week' },
]

const TESTIMONIALS = [
  {
    name: 'Marcus T., Ohio',
    text: 'I used the supplier database to find my first product in 3 days. Made $340 on my first 20 units. Worth way more than $9.90.',
  },
  {
    name: 'Jessica R., Texas',
    text: 'The prompt pack alone is worth it. I optimized 6 listings in one afternoon and my click-through went up immediately.',
  },
  {
    name: 'Daniel K., Florida',
    text: 'I was stuck for months before Operator Path. The Product Finder showed me exactly what was selling. Launched in 2 weeks.',
  },
]

export default async function UpgradePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, email')
    .eq('id', user.id)
    .single()

  if (profile?.subscription_status === 'active') {
    redirect('/dashboard')
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-10">
        <span className="pro-badge mb-4 inline-block">Pro Execution Layer</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Unlock the full operating system
        </h1>
        <p className="text-brand-muted text-lg max-w-xl mx-auto">
          Stop guessing. Start operating. Everything you need to source, list, and sell — for less than a coffee a week.
        </p>
      </div>

      {/* Pricing card */}
      <div className="relative bg-brand-surface border-2 border-brand-orange rounded-2xl p-8 mb-8">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
            <Star size={11} fill="white" />
            Most Popular
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-end justify-center gap-1 mb-1">
            <span className="text-5xl font-bold text-white">$9.90</span>
            <span className="text-brand-muted mb-2">/month</span>
          </div>
          <p className="text-brand-muted text-sm">Less than a coffee a week. Cancel anytime.</p>
        </div>

        <CheckoutButton userId={user.id} email={profile?.email || user.email || ''} />
      </div>

      {/* Features */}
      <div className="mb-8">
        <h2 className="text-white font-semibold text-lg mb-4">What you unlock</h2>
        <div className="space-y-3">
          {PRO_FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="flex items-start gap-3 bg-brand-surface border border-brand-border rounded-xl p-4">
                <div className="p-2 bg-brand-orange/10 rounded-lg shrink-0">
                  <Icon size={16} className="text-brand-orange" />
                </div>
                <div>
                  <p className="text-brand-text font-semibold text-sm">{feature.title}</p>
                  <p className="text-brand-muted text-xs mt-0.5">{feature.desc}</p>
                </div>
                <Check size={16} className="text-brand-green ml-auto shrink-0" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-3 mb-8">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="bg-brand-surface border-l-4 border-brand-orange border border-brand-border rounded-xl p-4">
            <p className="text-brand-text text-sm italic mb-2">"{t.text}"</p>
            <p className="text-brand-muted text-xs font-medium">— {t.name}</p>
          </div>
        ))}
      </div>

      <CheckoutButton userId={user.id} email={profile?.email || user.email || ''} />
    </div>
  )
}
