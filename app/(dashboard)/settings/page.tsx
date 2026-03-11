import { createClient } from '@/lib/supabase/server'
import { BadgeCheck, CreditCard, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import NameForm from './NameForm'
import PortalButton from './PortalButton'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  const isPro = profile?.subscription_status === 'active'

  const statusLabels: Record<string, { label: string; color: string }> = {
    free: { label: 'Free', color: 'text-brand-muted' },
    active: { label: 'Pro — Active', color: 'text-brand-green' },
    canceled: { label: 'Canceled', color: 'text-red-400' },
    past_due: { label: 'Past Due', color: 'text-brand-amber' },
  }
  const statusInfo = statusLabels[profile?.subscription_status || 'free']

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">Settings</h1>

      {/* Profile */}
      <section className="bg-brand-surface border border-brand-border rounded-2xl p-6 mb-6">
        <h2 className="text-brand-text font-semibold mb-4 flex items-center gap-2">
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-brand-muted text-xs font-medium mb-1.5">Name</label>
            <NameForm userId={user!.id} currentName={profile?.name || ''} />
          </div>
          <div>
            <label className="block text-brand-muted text-xs font-medium mb-1.5">Email</label>
            <p className="text-brand-text text-sm bg-brand-dark border border-brand-border rounded-xl px-4 py-3">
              {user!.email}
            </p>
          </div>
        </div>
      </section>

      {/* Billing */}
      <section className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <h2 className="text-brand-text font-semibold mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-brand-muted" />
          Billing
        </h2>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-brand-text text-sm font-medium">Subscription Status</p>
            <p className={`text-sm font-semibold ${statusInfo.color}`}>{statusInfo.label}</p>
          </div>
          {isPro && (
            <div className="flex items-center gap-1.5 text-brand-green">
              <BadgeCheck size={18} />
              <span className="text-sm font-medium">Pro</span>
            </div>
          )}
        </div>

        {isPro && profile?.stripe_customer_id ? (
          <PortalButton customerId={profile.stripe_customer_id} />
        ) : (
          <Link
            href="/upgrade"
            className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Upgrade to Pro — $9.90/month
            <ArrowRight size={16} />
          </Link>
        )}
      </section>
    </div>
  )
}
