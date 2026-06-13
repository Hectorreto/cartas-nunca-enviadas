import { useState, useCallback } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MOCK_CHAPTERS } from '@/lib/mockData'
import { useReadingStore } from '@/store/readingStore'
import ReaderHeader from '@/components/reader/ReaderHeader'
import PanelList from '@/components/reader/PanelList'
import ChapterNav from '@/components/reader/ChapterNav'
import type { ChapterPanel } from '@/types'

// Mock panels con alturas variadas para simular un webtoon real
function getMockPanels(chapterId: string): ChapterPanel[] {
  const heights = [520, 380, 640, 480, 560, 420, 700, 460, 500, 380]
  return heights.map((h, i) => ({
    id: `${chapterId}-panel-${i}`,
    chapter_id: chapterId,
    order: i,
    image_url: '',
    width: 800,
    height: h,
  }))
}

export default function ReaderPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const [progress, setProgress] = useState(0)
  const setStoreProgress = useReadingStore((s) => s.setProgress)

  const handleProgressChange = useCallback(
    (p: number) => {
      setProgress(p)
      if (chapterId) setStoreProgress(chapterId, p)
    },
    [chapterId, setStoreProgress]
  )

  if (!chapterId) return <Navigate to="/capitulos" replace />

  const chapterIndex = MOCK_CHAPTERS.findIndex((c) => c.id === chapterId)
  const chapter = MOCK_CHAPTERS[chapterIndex]

  if (!chapter) return <Navigate to="/capitulos" replace />

  const prev = chapterIndex > 0 ? MOCK_CHAPTERS[chapterIndex - 1] : null
  const next = chapterIndex < MOCK_CHAPTERS.length - 1 ? MOCK_CHAPTERS[chapterIndex + 1] : null
  const panels = getMockPanels(chapterId)

  return (
    <div className="min-h-screen bg-black">
      <ReaderHeader
        chapter={chapter}
        prevId={prev?.id ?? null}
        nextId={next?.id ?? null}
        progress={progress}
      />

      {/* Panels — pt-14 para no quedar bajo el header */}
      <div className="pt-14">
        <PanelList panels={panels} onProgressChange={handleProgressChange} />
        <ChapterNav prev={prev} next={next} />
      </div>
    </div>
  )
}
