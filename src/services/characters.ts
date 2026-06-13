import { supabase } from '@/lib/supabase'
import type { Character } from '@/types'

export async function getCharacters(): Promise<Character[]> {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('role', { ascending: true })
  if (error) throw error
  return data
}
