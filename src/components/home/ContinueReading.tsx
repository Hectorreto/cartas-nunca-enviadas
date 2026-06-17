import { Link } from 'react-router-dom'
import { useLastReadProgress } from '@/hooks/useLastReadProgress'

export default function ContinueReading() {
  const { isLoading, data } = useLastReadProgress()

  if (isLoading) {
    return (
      <section>
        <h2 className="text-[11px] tracking-[0.25em] text-[#d4c4a0] uppercase mb-4">
          Continuar Leyendo
        </h2>
        <div className="h-36 bg-[#1a1510] border border-[#3a2e1e] rounded-sm animate-pulse" />
      </section>
    )
  }

  if (!data) return null

  const { chapter_id, panel_index, chapter } = data

  return (
    <section>
      <h2 className="text-[11px] tracking-[0.25em] text-[#d4c4a0] uppercase mb-4">
        Continuar Leyendo
      </h2>
      <div className="flex gap-4 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-4">
        <div className="w-20 h-28 flex-shrink-0 rounded-sm border border-[#3a2e1e] overflow-hidden bg-gradient-to-b from-[#2a1f10] to-[#1a1208]">
          {chapter.cover_url ? (
            <img src={chapter.cover_url} alt={chapter.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-end justify-start p-1.5">
              <span className="text-[9px] text-[#6a5a40] font-mono">CAP. {chapter.number}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <p className="text-[11px] text-[#8a7a60] mb-1">Leído por última vez</p>
            <p className="text-[14px] font-serif text-[#f0e0c0] leading-tight truncate">
              {chapter.title}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#8a7a60]">{panel_index}%</span>
            </div>
            <div className="h-0.5 bg-[#3a2e1e] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c9a96e] rounded-full transition-all"
                style={{ width: `${panel_index}%` }}
              />
            </div>
            <Link
              to={`/leer/${chapter_id}`}
              className="mt-3 inline-block px-5 py-1.5 border border-[#c9a96e] text-[10px] tracking-widest text-[#c9a96e] uppercase hover:bg-[#c9a96e] hover:text-[#0d0b08] transition-all"
            >
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
