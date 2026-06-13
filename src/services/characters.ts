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

export async function getCharacter(id: string): Promise<Character> {
  const { data, error } = await supabase.from('characters').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createCharacter(data: Omit<Character, 'id'>): Promise<Character> {
  const { data: character, error } = await supabase.from('characters').insert(data).select().single()
  if (error) throw error
  return character
}

export async function updateCharacter(id: string, data: Partial<Omit<Character, 'id'>>): Promise<void> {
  const { error } = await supabase.from('characters').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteCharacter(id: string): Promise<void> {
  const { error } = await supabase.from('characters').delete().eq('id', id)
  if (error) throw error
}
