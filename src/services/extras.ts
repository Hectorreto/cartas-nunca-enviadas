import { supabase } from '@/lib/supabase'
import type { Extra } from '@/types'

export async function getExtras(): Promise<Extra[]> {
  const { data, error } = await supabase
    .from('extras')
    .select('*')
    .order('category', { ascending: true })
  if (error) throw error
  return data
}
