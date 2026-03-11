import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/Sidebar'
import DashboardNav from '@/components/layout/DashboardNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const isPro = profile?.subscription_status === 'active'

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <Sidebar
        userName={profile?.name ?? null}
        userEmail={user.email ?? ''}
        isPro={isPro}
      />
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">
        {children}
      </main>
      <DashboardNav isPro={isPro} />
    </div>
  )
}
