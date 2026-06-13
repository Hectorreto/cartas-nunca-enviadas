import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ReadingProgress } from '@/types'

interface ReadingStore {
  progress: Record<string, ReadingProgress>
  setProgress: (chapterId: string, panelIndex: number) => void
  getProgress: (chapterId: string) => ReadingProgress | null
}

export const useReadingStore = create<ReadingStore>()(
  persist(
    (set, get) => ({
      progress: {},
      setProgress: (chapterId, panelIndex) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [chapterId]: {
              chapter_id: chapterId,
              panel_index: panelIndex,
              updated_at: new Date().toISOString(),
            },
          },
        })),
      getProgress: (chapterId) => get().progress[chapterId] ?? null,
    }),
    { name: 'reading-progress' }
  )
)
