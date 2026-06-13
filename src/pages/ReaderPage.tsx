import { useState, useCallback } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getChapter, getChapters, getChapterPanels } from '@/services/chapters'
import { useReadingStore } from '@/store/readingStore'
import { useReadingSync } from '@/hooks/useReadingSync'
import ReaderHeader from '@/components/reader/ReaderHeader'
import PanelList from '@/components/reader/PanelList'
import ChapterNav from '@/components/reader/ChapterNav'
import CommentSection from '@/components/reader/CommentSection'

export default function ReaderPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const [progress, setProgress] = useState(0)
  const setStoreProgress = useReadingStore((s) => s.setProgress)

  const { data: chapter, isLoading: chapterLoading, isError } = useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: () => getChapter(chapterId!),
    enabled: !!chapterId,
  })

  const { data: allChapters = [] } = useQuery({
    queryKey: ['chapters'],
    queryFn: getChapters,
  })

  const { data: panels = [] } = useQuery({
    queryKey: ['panels', chapterId],
    queryFn: () => getChapterPanels(chapterId!),
    enabled: !!chapterId,
  })

  useReadingSync(chapterId ?? '')

  const handleProgressChange = useCallback(
    (p: number) => {
      setProgress(p)
      if (chapterId) setStoreProgress(chapterId, p)
    },
    [chapterId, setStoreProgress]
  )

  if (!chapterId) return <Navigate to="/capitulos" replace />
  if (isError) return <Navigate to="/capitulos" replace />
  if (chapterLoading || !chapter) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const currentIndex = allChapters.findIndex((c) => c.id === chapterId)
  const prev = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const next = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-black">
      <ReaderHeader
        chapter={chapter}
        prevId={prev?.id ?? null}
        nextId={next?.id ?? null}
        progress={progress}
      />
      <div className="pt-14">
        <PanelList panels={panels} onProgressChange={handleProgressChange} />
        <ChapterNav prev={prev} next={next} />
        <CommentSection chapterId={chapterId} />
      </div>
    </div>
  )
}
