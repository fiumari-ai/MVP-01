'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-brand-orange font-bold text-xl tracking-tight">
              Operator Path
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-brand-muted hover:text-brand-text text-sm transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-brand-muted hover:text-brand-text text-sm transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-brand-muted hover:text-brand-text text-sm transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-brand-muted hover:text-brand-text text-sm transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-brand-orange hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brand-muted hover:text-brand-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-dark/98 border-b border-brand-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="#features"
              className="block text-brand-muted hover:text-brand-text text-sm py-2"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block text-brand-muted hover:text-brand-text text-sm py-2"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="block text-brand-muted hover:text-brand-text text-sm py-2"
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                className="block text-center text-brand-muted border border-brand-border rounded-lg py-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="block text-center bg-brand-orange text-white rounded-lg py-2 text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
