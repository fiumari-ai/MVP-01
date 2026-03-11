'use server'

import { createClient } from '@/lib/supabase/server'

export async function updateName(userId: string, name: string) {
  const supabase = createClient()
  await supabase.from('profiles').update({ name }).eq('id', userId)
}
