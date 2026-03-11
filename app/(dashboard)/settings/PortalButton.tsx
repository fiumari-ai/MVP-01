'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function PortalButton({ customerId }: { customerId: string }) {
  const [loading, setLoading] = useState(false)

  async function handlePortal() {
    setLoading(true)
    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(false)
  }

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-brand-surface border border-brand-border hover:border-brand-orange text-brand-text hover:text-brand-orange font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : null}
      Manage Billing & Subscription
    </button>
  )
}
