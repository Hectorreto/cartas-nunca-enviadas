import { supabase } from '@/lib/supabase'

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
