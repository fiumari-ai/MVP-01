'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  Package,
  TrendingUp,
  Users,
} from 'lucide-react'

interface DashboardNavProps {
  isPro: boolean
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/suppliers', label: 'Sources', icon: Package },
  { href: '/finder', label: 'Finder', icon: TrendingUp },
  { href: '/community', label: 'Community', icon: Users },
]

export default function DashboardNav({ isPro }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-surface border-t border-brand-border">
      <div className="flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          const isProItem = ['Sources', 'Finder', 'Community'].includes(item.label)
          const showBadge = isProItem && !isPro

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium transition-colors relative ${
                isActive ? 'text-brand-orange' : 'text-brand-muted'
              }`}
            >
              <Icon size={20} />
              {item.label}
              {showBadge && (
                <span className="absolute top-1.5 right-1/4 w-1.5 h-1.5 bg-brand-amber rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
