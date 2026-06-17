import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import { useReadingStore } from '@/store/readingStore'
import { getLastReadProgress, type LastReadData } from '@/services/readingProgress'
import { getChapter } from '@/services/chapters'

export function useLastReadProgress(): { isLoading: boolean; data: LastReadData | null } {
  const userId = useAuthStore((s) => s.user?.id)
  const authReady = useAuthStore((s) => s.authReady)
  const localProgress = useReadingStore((s) => s.progress)

  const serverQuery = useQuery({
    queryKey: ['last-read-progress', userId],
    queryFn: () => getLastReadProgress(userId!),
    enabled: authReady && !!userId,
  })

  const localLast = useMemo(() => {
    if (userId) return null
    const entries = Object.values(localProgress)
    if (!entries.length) return null
    return entries.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))[0]
  }, [userId, localProgress])

  const localChapterQuery = useQuery({
    queryKey: ['chapter', localLast?.chapter_id],
    queryFn: () => getChapter(localLast!.chapter_id),
    enabled: authReady && !userId && !!localLast,
  })

  if (!authReady) return { isLoading: true, data: null }

  if (userId) {
    return { isLoading: serverQuery.isLoading, data: serverQuery.data ?? null }
  }

  if (!localLast) return { isLoading: false, data: null }
  if (localChapterQuery.isLoading) return { isLoading: true, data: null }
  if (!localChapterQuery.data) return { isLoading: false, data: null }

  return {
    isLoading: false,
    data: {
      chapter_id: localLast.chapter_id,
      panel_index: localLast.panel_index,
      updated_at: localLast.updated_at,
      chapter: localChapterQuery.data,
    },
  }
}
