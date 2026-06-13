import { useEffect, useRef } from 'react'
import type { ChapterPanel } from '@/types'

interface Props {
  panels: ChapterPanel[]
  onProgressChange: (progress: number) => void
}

export default function PanelList({ panels, onProgressChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      if (total > 0) onProgressChange(Math.round((scrolled / total) * 100))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onProgressChange])

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full">
      {panels.map((panel, i) => (
        <div key={panel.id} className="w-full max-w-3xl">
          {panel.image_url ? (
            <img
              src={panel.image_url}
              alt={`Panel ${i + 1}`}
              width={panel.width}
              height={panel.height}
              className="w-full h-auto block"
              loading={i < 3 ? 'eager' : 'lazy'}
            />
          ) : (
            // Placeholder hasta tener imágenes reales
            <div
              className="w-full bg-gradient-to-b from-[#1a1510] to-[#231d15] border-b border-[#3a2e1e]/30 flex items-center justify-center"
              style={{ height: panel.height || 400 }}
            >
              <span className="text-[11px] text-[#6a5a40] font-mono">Panel {i + 1}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
