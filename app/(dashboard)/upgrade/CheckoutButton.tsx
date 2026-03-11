'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  userId: string
  email: string
}

export default function CheckoutButton({ userId, email }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, email }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold text-lg py-4 rounded-xl transition-all glow-orange disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <>
          Upgrade to Pro — $9.90/month
          <ArrowRight size={18} />
        </>
      )}
    </button>
  )
}
