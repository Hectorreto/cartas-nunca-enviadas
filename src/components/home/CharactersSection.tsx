import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const characters = [
  {
    id: 'el',
    label: 'ÉL',
    description: 'Empresario. Frío. Brillante. Un hombre que aprendió a vivir sin esperar.',
  },
  {
    id: 'ella',
    label: 'ELLA',
    description: 'Inteligente. Terca. Inquieta. Una mujer que llegó para enseñarle a sentir.',
  },
]

export default function CharactersSection() {
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
        {characters.map((ch) => (
          <div
            key={ch.id}
            className="bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-4 hover:border-[#c9a96e]/40 transition-all"
          >
            {/* Portrait placeholder */}
            <div className="w-full aspect-[3/4] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e] mb-3" />
            <p className="text-[11px] tracking-[0.2em] text-[#c9a96e] font-medium mb-1">
              {ch.label}
            </p>
            <p className="text-[11px] text-[#8a7a60] leading-relaxed mb-3">{ch.description}</p>
            <button className="w-full py-1.5 border border-[#3a2e1e] text-[10px] tracking-widest text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e] uppercase transition-all">
              Conocer más
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
