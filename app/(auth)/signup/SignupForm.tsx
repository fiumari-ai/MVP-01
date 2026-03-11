'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const supabase = createClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Create profile
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        name,
        subscription_status: 'free',
      })

      if (plan === 'pro') {
        router.push('/upgrade')
      } else {
        router.push('/dashboard')
      }
      router.refresh()
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${plan === 'pro' ? '/upgrade' : '/dashboard'}`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-brand-orange font-bold text-2xl">
            Operator Path
          </Link>
          <p className="text-brand-muted text-sm mt-2">
            {plan === 'pro' ? 'Create your account to start Pro' : 'Start for free — no credit card needed'}
          </p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-brand-border hover:border-brand-orange/40 text-brand-text font-medium py-3 rounded-xl transition-all text-sm mb-5 disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-brand-surface px-3 text-brand-muted text-xs">or</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-brand-muted text-xs font-medium mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full bg-brand-dark border border-brand-border hover:border-brand-orange/40 focus:border-brand-orange text-brand-text placeholder:text-brand-muted rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-brand-muted text-xs font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-brand-dark border border-brand-border hover:border-brand-orange/40 focus:border-brand-orange text-brand-text placeholder:text-brand-muted rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-brand-muted text-xs font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Min. 6 characters"
                  className="w-full bg-brand-dark border border-brand-border hover:border-brand-orange/40 focus:border-brand-orange text-brand-text placeholder:text-brand-muted rounded-xl px-4 py-3 pr-10 text-sm outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Create Free Account
            </button>
          </form>

          <p className="text-brand-muted text-xs text-center mt-4">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-brand-text hover:text-brand-orange">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-brand-text hover:text-brand-orange">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-brand-muted text-sm mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-orange hover:text-orange-400 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
