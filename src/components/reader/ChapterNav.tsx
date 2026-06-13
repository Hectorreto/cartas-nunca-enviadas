import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Chapter } from '@/types'

interface Props {
  prev: Chapter | null
  next: Chapter | null
}

export default function ChapterNav({ prev, next }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-16 px-4">
      <div className="border-t border-[#3a2e1e] pt-8 grid grid-cols-2 gap-4">
        {/* Prev */}
        <div>
          {prev ? (
            <Link
              to={`/leer/${prev.id}`}
              className="flex items-start gap-3 group p-4 border border-[#3a2e1e] rounded-sm hover:border-[#c9a96e]/50 transition-all"
            >
              <ChevronLeft size={16} className="text-[#8a7a60] group-hover:text-[#c9a96e] mt-0.5 flex-shrink-0 transition-colors" />
              <div className="min-w-0">
                <p className="text-[10px] tracking-widest text-[#8a7a60] uppercase mb-1">Anterior</p>
                <p className="text-[12px] text-[#d4c4a0] line-clamp-2 group-hover:text-[#c9a96e] transition-colors">
                  Cap. {String(prev.number).padStart(2, '0')} — {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="p-4 border border-[#1a1510] rounded-sm opacity-30">
              <p className="text-[10px] tracking-widest text-[#8a7a60] uppercase">Primer capítulo</p>
            </div>
          )}
        </div>

        {/* Next */}
        <div>
          {next ? (
            <Link
              to={`/leer/${next.id}`}
              className="flex items-start gap-3 group p-4 border border-[#3a2e1e] rounded-sm hover:border-[#c9a96e]/50 transition-all text-right justify-end"
            >
              <div className="min-w-0">
                <p className="text-[10px] tracking-widest text-[#8a7a60] uppercase mb-1">Siguiente</p>
                <p className="text-[12px] text-[#d4c4a0] line-clamp-2 group-hover:text-[#c9a96e] transition-colors">
                  Cap. {String(next.number).padStart(2, '0')} — {next.title}
                </p>
              </div>
              <ChevronRight size={16} className="text-[#8a7a60] group-hover:text-[#c9a96e] mt-0.5 flex-shrink-0 transition-colors" />
            </Link>
          ) : (
            <div className="p-4 border border-[#1a1510] rounded-sm opacity-30 text-right">
              <p className="text-[10px] tracking-widest text-[#8a7a60] uppercase">Último capítulo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
