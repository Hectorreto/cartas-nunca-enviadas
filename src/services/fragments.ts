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

export async function getFragment(id: string): Promise<Fragment> {
  const { data, error } = await supabase.from('fragments').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createFragment(data: Omit<Fragment, 'id'>): Promise<Fragment> {
  const { data: fragment, error } = await supabase.from('fragments').insert(data).select().single()
  if (error) throw error
  return fragment
}

export async function updateFragment(id: string, data: Partial<Omit<Fragment, 'id'>>): Promise<void> {
  const { error } = await supabase.from('fragments').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteFragment(id: string): Promise<void> {
  const { error } = await supabase.from('fragments').delete().eq('id', id)
  if (error) throw error
}
