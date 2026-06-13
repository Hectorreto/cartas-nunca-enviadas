import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [1, 2, 3, 4, 5]

export default function HeroSection() {
  return (
    <div className="relative w-full aspect-[16/9] max-h-[520px] overflow-hidden rounded-sm">
      {/* Imagen de fondo — placeholder hasta tener imagen real */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1f10] via-[#1a1208] to-[#0d0b08]" />

      {/* Overlay inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b08]/60 via-transparent to-transparent" />

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 p-8 max-w-lg">
        <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-3">
          Romance • Drama • Segundas Oportunidades
        </p>
        <h1 className="font-serif text-4xl text-[#f0e0c0] leading-tight mb-3">
          Una historia sobre<br />amor, silencio y destino.
        </h1>
        <p className="font-serif italic text-[#8a7a60] text-base mb-6">
          "La amé como yo sabía amar."
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/capitulos"
            className="px-6 py-2.5 border border-[#c9a96e] text-[#c9a96e] text-[11px] tracking-widest uppercase hover:bg-[#c9a96e] hover:text-[#0d0b08] transition-all"
          >
            Comenzar a leer
          </Link>
          <button className="flex items-center gap-2 text-[#d4c4a0] text-[13px] hover:text-[#c9a96e] transition-colors">
            <span className="w-8 h-8 rounded-full border border-[#8a7a60] flex items-center justify-center">
              <Play size={12} fill="currentColor" />
            </span>
            Ver Tráiler
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === 1 ? 'bg-[#c9a96e] w-4' : 'bg-[#8a7a60]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
