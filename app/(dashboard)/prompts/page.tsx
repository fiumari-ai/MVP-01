import { createClient } from '@/lib/supabase/server'
import PromptsClient from './PromptsClient'

export default async function PromptsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user!.id)
    .single()
  const isPro = profile?.subscription_status === 'active'
  return <PromptsClient isPro={isPro} />
}
