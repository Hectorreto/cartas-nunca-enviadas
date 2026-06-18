import { supabase } from '@/lib/supabase'
import type { SiteSettings } from '@/types'

const DEFAULTS: SiteSettings = {
  hero_image_url: null,
  trailer_url: null,
  playlist_url: null,
  story_paragraphs: null,
  story_closing: null,
  story_quote: null,
}

export async function getSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('hero_image_url, trailer_url, playlist_url, story_paragraphs, story_closing, story_quote')
    .maybeSingle()
  if (error) throw error
  return data ?? DEFAULTS
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<void> {
  const { error } = await supabase.from('site_settings').update(settings).eq('id', true)
  if (error) throw error
}
