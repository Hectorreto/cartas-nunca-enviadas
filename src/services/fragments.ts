import { supabase } from '@/lib/supabase'
import type { Fragment } from '@/types'

export async function getFragments(): Promise<Fragment[]> {
  const { data, error } = await supabase
    .from('fragments')
    .select('*')
    .order('chapter_number', { ascending: true })
  if (error) throw error
  return data
}
