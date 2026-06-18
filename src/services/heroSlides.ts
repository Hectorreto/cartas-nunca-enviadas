import { supabase } from '@/lib/supabase'
import type { HeroSlide } from '@/types'

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('order', { ascending: true })
  if (error) throw error
  return data
}

export async function getHeroSlide(id: string): Promise<HeroSlide> {
  const { data, error } = await supabase.from('hero_slides').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createHeroSlide(data: Omit<HeroSlide, 'id'>): Promise<HeroSlide> {
  const { data: slide, error } = await supabase.from('hero_slides').insert(data).select().single()
  if (error) throw error
  return slide
}

export async function updateHeroSlide(id: string, data: Partial<Omit<HeroSlide, 'id'>>): Promise<void> {
  const { error } = await supabase.from('hero_slides').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteHeroSlide(id: string): Promise<void> {
  const { error } = await supabase.from('hero_slides').delete().eq('id', id)
  if (error) throw error
}
