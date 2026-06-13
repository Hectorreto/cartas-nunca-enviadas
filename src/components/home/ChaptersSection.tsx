import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const chapters = [
  { id: '1', number: '01', title: 'El hombre que no tenía nada que enseñar', date: '12 MAY 2024' },
  { id: '2', number: '02', title: 'Los caracoles y las primeras reglas', date: '19 MAY 2024' },
  { id: '3', number: '03', title: 'Debajo del escritorio', date: '26 MAY 2024' },
  { id: '4', number: '04', title: 'La noche del piano', date: '02 JUN 2024' },
  { id: '5', number: '05', title: 'Cartas desde Milán', date: '09 JUN 2024' },
  { id: '6', number: '06', title: 'Nuestra vida. Nuestra familia.', date: '16 JUN 2024' },
]

export default function ChaptersSection() {
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
        {chapters.map((ch) => (
          <Link
            key={ch.id}
            to={`/leer/${ch.id}`}
            className="flex-shrink-0 w-[145px] group"
          >
            {/* Cover placeholder */}
            <div className="relative w-full aspect-[2/3] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm overflow-hidden border border-[#3a2e1e] group-hover:border-[#c9a96e]/50 transition-all">
              <span className="absolute top-2 left-2 text-[10px] font-mono text-[#c9a96e] bg-[#0d0b08]/80 px-1.5 py-0.5">
                {ch.number}
              </span>
              {/* Progress bar for read chapters (mock: first 2 read) */}
              {parseInt(ch.number) <= 2 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3a2e1e]">
                  <div className="h-full bg-[#c9a96e] w-full" />
                </div>
              )}
            </div>
            <p className="mt-2 text-[12px] text-[#d4c4a0] leading-tight line-clamp-2 group-hover:text-[#c9a96e] transition-colors">
              {ch.title}
            </p>
            <p className="mt-1 text-[10px] text-[#8a7a60]">{ch.date}</p>
          </Link>
        ))}

        {/* Arrow */}
        <button className="flex-shrink-0 w-8 self-center text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
