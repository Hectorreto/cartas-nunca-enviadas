import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getChapters } from '@/services/chapters'
import { formatChapterDate } from '@/lib/mockData'

export default function ChaptersSection() {
  const { data: chapters = [] } = useQuery({ queryKey: ['chapters'], queryFn: getChapters })
  const preview = chapters.slice(0, 6)

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] tracking-[0.25em] text-[#d4c4a0] uppercase">Capítulos</h2>
        <Link
          to="/capitulos"
          className="text-[11px] tracking-widest text-[#8a7a60] hover:text-[#c9a96e] uppercase flex items-center gap-1 transition-colors"
        >
          Ver todos los capítulos <ChevronRight size={12} />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {preview.map((ch) => (
          <Link key={ch.id} to={`/leer/${ch.id}`} className="flex-shrink-0 w-[145px] group">
            <div className="relative w-full aspect-[2/3] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm overflow-hidden border border-[#3a2e1e] group-hover:border-[#c9a96e]/50 transition-all">
              <span className="absolute top-2 left-2 text-[10px] font-mono text-[#c9a96e] bg-[#0d0b08]/80 px-1.5 py-0.5">
                {String(ch.number).padStart(2, '0')}
              </span>
            </div>
            <p className="mt-2 text-[12px] text-[#d4c4a0] leading-tight line-clamp-2 group-hover:text-[#c9a96e] transition-colors">
              {ch.title}
            </p>
            <p className="mt-1 text-[10px] text-[#8a7a60]">{formatChapterDate(ch.published_at)}</p>
          </Link>
        ))}
        <button className="flex-shrink-0 w-8 self-center text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
