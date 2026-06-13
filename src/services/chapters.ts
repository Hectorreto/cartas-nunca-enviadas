import { supabase } from '@/lib/supabase'
import type { Chapter, ChapterPanel, Comment } from '@/types'

export async function getChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .order('number', { ascending: true })
  if (error) throw error
  return data
}

export async function getChapter(id: string): Promise<Chapter> {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function getChapterPanels(chapterId: string): Promise<ChapterPanel[]> {
  const { data, error } = await supabase
    .from('chapter_panels')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('order', { ascending: true })
  if (error) throw error
  return data
}

export async function getChapterComments(chapterId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*, user:profiles(username, avatar_url)')
    .eq('chapter_id', chapterId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Comment[]
}

export async function postComment(chapterId: string, userId: string, content: string): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .insert({ chapter_id: chapterId, user_id: userId, content })
  if (error) throw error
}

export async function deleteComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
  if (error) throw error
}

// ── Admin CRUD ────────────────────────────────────────────────────────────────

export async function createChapter(data: {
  number: number
  title: string
  cover_url: string
  published_at: string
  is_free: boolean
}): Promise<Chapter> {
  const { data: chapter, error } = await supabase
    .from('chapters')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return chapter
}

export async function updateChapter(
  id: string,
  data: { number?: number; title?: string; cover_url?: string; published_at?: string; is_free?: boolean }
): Promise<void> {
  const { error } = await supabase.from('chapters').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteChapter(id: string): Promise<void> {
  const { error } = await supabase.from('chapters').delete().eq('id', id)
  if (error) throw error
}

export async function replacePanels(
  chapterId: string,
  panels: Array<{ image_url: string; order: number; width: number; height: number }>
): Promise<void> {
  const { error: del } = await supabase.from('chapter_panels').delete().eq('chapter_id', chapterId)
  if (del) throw del
  if (!panels.length) return
  const { error: ins } = await supabase
    .from('chapter_panels')
    .insert(panels.map((p) => ({ chapter_id: chapterId, ...p })))
  if (ins) throw ins
}
