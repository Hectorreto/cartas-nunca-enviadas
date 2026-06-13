import { ArrowLeft, ChevronLeft, ChevronRight, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Chapter } from '@/types'

interface Props {
  chapter: Chapter
  prevId: string | null
  nextId: string | null
  progress: number // 0-100
}

export default function ReaderHeader({ chapter, prevId, nextId, progress }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0b08]/95 backdrop-blur border-b border-[#1a1510]">
      {/* Progress bar */}
      <div className="h-0.5 bg-[#1a1510]">
        <div
          className="h-full bg-[#c9a96e] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 h-12 flex items-center gap-4">
        {/* Back */}
        <Link
          to="/capitulos"
          className="flex items-center gap-1.5 text-[#8a7a60] hover:text-[#d4c4a0] transition-colors flex-shrink-0"
        >
          <ArrowLeft size={15} />
          <span className="text-[11px] tracking-wider hidden sm:block">Capítulos</span>
        </Link>

        {/* Chapter info */}
        <div className="flex-1 text-center min-w-0">
          <p className="text-[10px] tracking-[0.2em] text-[#8a7a60] uppercase">
            Cap. {String(chapter.number).padStart(2, '0')}
          </p>
          <p className="text-[12px] text-[#d4c4a0] truncate font-serif leading-tight">
            {chapter.title}
          </p>
        </div>

        {/* Chapter nav */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to={prevId ? `/leer/${prevId}` : '#'}
            aria-disabled={!prevId}
            className={`p-1.5 border border-[#3a2e1e] rounded-sm transition-all ${
              prevId
                ? 'text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e]'
                : 'text-[#3a2e1e] pointer-events-none'
            }`}
          >
            <ChevronLeft size={14} />
          </Link>
          <Link
            to={nextId ? `/leer/${nextId}` : '#'}
            aria-disabled={!nextId}
            className={`p-1.5 border border-[#3a2e1e] rounded-sm transition-all ${
              nextId
                ? 'text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e]'
                : 'text-[#3a2e1e] pointer-events-none'
            }`}
          >
            <ChevronRight size={14} />
          </Link>
          <button className="p-1.5 border border-[#3a2e1e] rounded-sm text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all">
            <List size={14} />
          </button>
        </div>
      </div>
    </header>
  )
}
