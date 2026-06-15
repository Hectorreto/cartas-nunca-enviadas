import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCharacters } from '@/services/characters'

export default function CharactersSection() {
  const { data: characters = [] } = useQuery({ queryKey: ['characters'], queryFn: getCharacters })
  const main = characters.filter((c) => c.role === 'main')

  if (main.length === 0) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] tracking-[0.25em] text-[#d4c4a0] uppercase">
          Personajes Principales
        </h2>
        <Link
          to="/personajes"
          className="text-[11px] text-[#8a7a60] hover:text-[#c9a96e] flex items-center gap-0.5 transition-colors"
        >
          Ver todos <ChevronRight size={11} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {main.map((ch) => (
          <div
            key={ch.id}
            className="bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-4"
          >
            {ch.portrait_url ? (
              <img src={ch.portrait_url} alt={ch.name} className="w-full aspect-[3/4] object-cover rounded-sm border border-[#3a2e1e] mb-3" />
            ) : (
              <div className="w-full aspect-[3/4] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e] mb-3" />
            )}
            <p className="text-[11px] tracking-[0.2em] text-[#c9a96e] font-medium mb-1">
              {ch.label}
            </p>
            <p className="text-[11px] text-[#8a7a60] leading-relaxed mb-3">{ch.description}</p>
            <Link
              to="/personajes"
              className="block w-full py-1.5 border border-[#3a2e1e] text-[10px] tracking-widest text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e] uppercase transition-all text-center"
            >
              Conocer más
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
