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

export async function getExtra(id: string): Promise<Extra> {
  const { data, error } = await supabase.from('extras').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createExtra(data: Omit<Extra, 'id'>): Promise<Extra> {
  const { data: extra, error } = await supabase.from('extras').insert(data).select().single()
  if (error) throw error
  return extra
}

export async function updateExtra(id: string, data: Partial<Omit<Extra, 'id'>>): Promise<void> {
  const { error } = await supabase.from('extras').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteExtra(id: string): Promise<void> {
  const { error } = await supabase.from('extras').delete().eq('id', id)
  if (error) throw error
}
