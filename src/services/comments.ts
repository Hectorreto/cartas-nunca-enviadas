import { supabase } from '@/lib/supabase'

export interface RecentComment {
  id: string
  content: string
  created_at: string
  user: { username: string }
}

export async function getRecentComments(limit = 3): Promise<RecentComment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, content, created_at, user:profiles(username)')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data ?? []).map((row) => ({
    id: row.id as string,
    content: row.content as string,
    created_at: row.created_at as string,
    user: (Array.isArray(row.user) ? row.user[0] : row.user) as { username: string },
  }))
}
