import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getSettings } from '@/services/siteSettings'
import { getHeroSlides } from '@/services/heroSlides'

export default function HeroSection() {
  const { data: settings } = useQuery({ queryKey: ['site_settings'], queryFn: getSettings })
  const { data: slides = [] } = useQuery({ queryKey: ['hero_slides'], queryFn: getHeroSlides })

  const trailerUrl = settings?.trailer_url

  const [active, setActive] = useState(0)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length, resetKey])

  function goTo(i: number) {
    setActive(i)
    setResetKey((k) => k + 1)
  }

  if (slides.length === 0) return <StaticHero trailerUrl={trailerUrl} />

  const clampedActive = Math.min(active, slides.length - 1)

  return (
    <div className="relative w-full aspect-[16/9] max-h-[520px] overflow-hidden rounded-sm">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1f10] via-[#1a1208] to-[#0d0b08]" />

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === clampedActive ? 'opacity-100' : 'opacity-0'}`}
        >
          {slide.image_url && (
            <img src={slide.image_url} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b08]/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 max-w-lg">
            {slide.subtitle && (
              <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-3">
                {slide.subtitle}
              </p>
            )}
            <h1 className="font-serif text-4xl text-[#f0e0c0] leading-tight mb-6">
              {slide.title}
            </h1>
            <div className="flex items-center gap-4">
              {slide.link_url && (
                <Link
                  to={slide.link_url}
                  className="px-6 py-2.5 border border-[#c9a96e] text-[#c9a96e] text-[11px] tracking-widest uppercase hover:bg-[#c9a96e] hover:text-[#0d0b08] transition-all"
                >
                  Leer capítulo
                </Link>
              )}
              {trailerUrl && (
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#d4c4a0] text-[13px] hover:text-[#c9a96e] transition-colors"
                >
                  <span className="w-8 h-8 rounded-full border border-[#8a7a60] flex items-center justify-center">
                    <Play size={12} fill="currentColor" />
                  </span>
                  Ver Tráiler
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === clampedActive ? 'bg-[#c9a96e] w-4' : 'bg-[#8a7a60] w-1.5 hover:bg-[#d4c4a0]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function StaticHero({ trailerUrl }: { trailerUrl?: string | null }) {
  return (
    <div className="relative w-full aspect-[16/9] max-h-[520px] overflow-hidden rounded-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1f10] via-[#1a1208] to-[#0d0b08]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b08]/60 via-transparent to-transparent" />
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
          {trailerUrl && (
            <a
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#d4c4a0] text-[13px] hover:text-[#c9a96e] transition-colors"
            >
              <span className="w-8 h-8 rounded-full border border-[#8a7a60] flex items-center justify-center">
                <Play size={12} fill="currentColor" />
              </span>
              Ver Tráiler
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
