import { createClient } from '@/lib/supabase/server'
import SuppliersClient from './SuppliersClient'

export default async function SuppliersPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user!.id)
    .single()
  const isPro = profile?.subscription_status === 'active'
  return <SuppliersClient isPro={isPro} />
}
