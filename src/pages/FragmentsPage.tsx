import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { MOCK_FRAGMENTS } from '@/lib/mockData'
import type { Fragment } from '@/types'

const aspectClass: Record<Fragment['aspect'], string> = {
  tall:   'row-span-2',
  wide:   'row-span-1',
  square: 'row-span-1',
}

const placeholderHeight: Record<Fragment['aspect'], string> = {
  tall:   'h-96',
  wide:   'h-44',
  square: 'h-44',
}

export default function FragmentsPage() {
  const [selected, setSelected] = useState<Fragment | null>(null)

  return (
    <Layout>
      {/* Banner */}
      <div className="relative w-full h-36 rounded-sm overflow-hidden mb-10 bg-gradient-to-r from-[#2a1f10] via-[#1a1208] to-[#0d0b08] flex items-end p-6 border border-[#3a2e1e]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/80 to-transparent" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-1">Momentos</p>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Fragmentos</h1>
        </div>
      </div>

      <p className="text-[13px] text-[#8a7a60] mb-8 max-w-xl">
        Escenas que se quedan. Ilustraciones sueltas de los momentos que definen la historia.
      </p>

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {MOCK_FRAGMENTS.map((f) => (
          <div
            key={f.id}
            className={`break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm border border-[#3a2e1e] hover:border-[#c9a96e]/50 transition-all ${aspectClass[f.aspect]}`}
            onClick={() => setSelected(f)}
          >
            {/* Image / placeholder */}
            {f.image_url ? (
              <img src={f.image_url} alt={f.title} className="w-full h-auto block" />
            ) : (
              <div className={`w-full bg-gradient-to-b from-[#2a1f10] to-[#1a1208] ${placeholderHeight[f.aspect]}`} />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0d0b08]/0 group-hover:bg-[#0d0b08]/70 transition-all flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
              <p className="font-serif text-[13px] text-[#f0e0c0] leading-tight">{f.title}</p>
              <p className="text-[10px] text-[#8a7a60] mt-0.5">Cap. {f.chapter_number}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <Lightbox
          fragment={selected}
          onClose={() => setSelected(null)}
          onPrev={() => {
            const i = MOCK_FRAGMENTS.findIndex((f) => f.id === selected.id)
            if (i > 0) setSelected(MOCK_FRAGMENTS[i - 1])
          }}
          onNext={() => {
            const i = MOCK_FRAGMENTS.findIndex((f) => f.id === selected.id)
            if (i < MOCK_FRAGMENTS.length - 1) setSelected(MOCK_FRAGMENTS[i + 1])
          }}
          hasPrev={MOCK_FRAGMENTS.findIndex((f) => f.id === selected.id) > 0}
          hasNext={MOCK_FRAGMENTS.findIndex((f) => f.id === selected.id) < MOCK_FRAGMENTS.length - 1}
        />
      )}
    </Layout>
  )
}

interface LightboxProps {
  fragment: Fragment
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

function Lightbox({ fragment: f, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[#8a7a60] hover:text-[#d4c4a0] transition-colors z-10"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        disabled={!hasPrev}
        className={`absolute left-4 p-2 border border-[#3a2e1e] rounded-sm transition-all ${hasPrev ? 'text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e]' : 'text-[#3a2e1e] pointer-events-none'}`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        disabled={!hasNext}
        className={`absolute right-4 p-2 border border-[#3a2e1e] rounded-sm transition-all ${hasNext ? 'text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e]' : 'text-[#3a2e1e] pointer-events-none'}`}
      >
        <ChevronRight size={18} />
      </button>

      {/* Content */}
      <div
        className="relative max-w-lg w-full bg-[#1a1510] border border-[#3a2e1e] rounded-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {f.image_url ? (
          <img src={f.image_url} alt={f.title} className="w-full h-auto block" />
        ) : (
          <div className="w-full h-80 bg-gradient-to-b from-[#2a1f10] to-[#1a1208]" />
        )}

        {/* Info */}
        <div className="p-5">
          <h2 className="font-serif text-lg text-[#f0e0c0] mb-1">{f.title}</h2>
          <p className="text-[13px] text-[#8a7a60] leading-relaxed mb-4">{f.description}</p>
          <Link
            to={`/leer/${f.chapter_number}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/40 px-3 py-1.5 hover:bg-[#c9a96e] hover:text-[#0d0b08] transition-all"
          >
            <BookOpen size={12} />
            Cap. {f.chapter_number} — {f.chapter_title}
          </Link>
        </div>
      </div>
    </div>
  )
}
