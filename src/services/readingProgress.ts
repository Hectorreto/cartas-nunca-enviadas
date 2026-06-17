import { supabase } from '@/lib/supabase'
import type { Chapter } from '@/types'

export interface LastReadData {
  chapter_id: string
  panel_index: number
  updated_at: string
  chapter: Chapter
}

export async function upsertProgress(userId: string, chapterId: string, panelIndex: number): Promise<void> {
  const { error } = await supabase
    .from('reading_progress')
    .upsert({ user_id: userId, chapter_id: chapterId, panel_index: panelIndex, updated_at: new Date().toISOString() })
  if (error) throw error
}

export async function fetchChapterProgress(userId: string, chapterId: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('reading_progress')
    .select('panel_index')
    .eq('user_id', userId)
    .eq('chapter_id', chapterId)
    .single()
  if (error) return null
  return data.panel_index
}

export async function getLastReadProgress(userId: string): Promise<LastReadData | null> {
  const { data, error } = await supabase
    .from('reading_progress')
    .select('*, chapter:chapters(*)')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()
  if (error) return null
  const raw = data as { chapter_id: string; panel_index: number; updated_at: string; chapter: Chapter }
  return {
    chapter_id: raw.chapter_id,
    panel_index: raw.panel_index,
    updated_at: raw.updated_at,
    chapter: raw.chapter,
  }
}
