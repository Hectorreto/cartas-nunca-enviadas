import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useReadingStore } from '@/store/readingStore'
import { upsertProgress, fetchChapterProgress } from '@/services/readingProgress'

export function useReadingSync(chapterId: string) {
  const userId = useAuthStore((s) => s.user?.id)
  const progress = useReadingStore((s) => s.progress[chapterId])
  const setProgress = useReadingStore((s) => s.setProgress)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // On mount (or login): pull progress from Supabase and hydrate local store
  useEffect(() => {
    if (!userId || !chapterId) return
    fetchChapterProgress(userId, chapterId).then((panelIndex) => {
      if (panelIndex !== null) setProgress(chapterId, panelIndex)
    })
  }, [userId, chapterId, setProgress])

  // On scroll: debounced upsert to Supabase
  const panelIndex = progress?.panel_index
  useEffect(() => {
    if (!userId || !chapterId || panelIndex === undefined) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      upsertProgress(userId, chapterId, panelIndex).catch(() => {})
    }, 2000)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [userId, chapterId, panelIndex])
}
