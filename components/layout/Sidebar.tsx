'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  Package,
  Sparkles,
  TrendingUp,
  Users,
  Settings,
  ArrowUpCircle,
  LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  userName: string | null
  userEmail: string
  isPro: boolean
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, pro: false },
  { href: '/learn', label: 'Learn', icon: BookOpen, pro: false },
  { href: '/suppliers', label: 'Suppliers', icon: Package, pro: true },
  { href: '/prompts', label: 'Prompts', icon: Sparkles, pro: true },
  { href: '/finder', label: 'Product Finder', icon: TrendingUp, pro: true },
  { href: '/community', label: 'Community', icon: Users, pro: true },
]

export default function Sidebar({ userName, userEmail, isPro }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-brand-surface border-r border-brand-border">
      {/* Logo */}
      <div className="p-6 border-b border-brand-border">
        <Link href="/" className="text-brand-orange font-bold text-xl">
          Operator Path
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          const showProBadge = item.pro && !isPro

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-brand-orange/10 text-brand-orange'
                  : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span className="flex-1">{item.label}</span>
              {showProBadge && (
                <span className="pro-badge text-[10px]">PRO</span>
              )}
            </Link>
          )
        })}

        <div className="pt-2 border-t border-brand-border">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              pathname === '/settings'
                ? 'bg-brand-orange/10 text-brand-orange'
                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
            }`}
          >
            <Settings size={18} className="shrink-0" />
            Settings
          </Link>
        </div>
      </nav>

      {/* Upgrade button */}
      {!isPro && (
        <div className="p-4 border-t border-brand-border">
          <Link
            href="/upgrade"
            className="flex items-center gap-2 w-full bg-brand-amber/10 border border-brand-amber/30 hover:border-brand-amber text-brand-amber font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 animate-pulse-glow"
          >
            <ArrowUpCircle size={16} />
            Upgrade to Pro
          </Link>
        </div>
      )}

      {/* User */}
      <div className="p-4 border-t border-brand-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange text-xs font-bold shrink-0">
            {(userName || userEmail)?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-brand-text text-sm font-medium truncate">
              {userName || 'Operator'}
            </p>
            <p className="text-brand-muted text-xs truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-brand-muted hover:text-brand-text transition-colors"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
