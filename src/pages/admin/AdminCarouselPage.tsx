import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getHeroSlides, updateHeroSlide } from '@/services/heroSlides'
import { toast } from '@/lib/toast'
import AdminCarouselEditPage from './AdminCarouselEditPage'
import type { HeroSlide } from '@/types'

function CarouselList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: slides = [], isLoading } = useQuery({ queryKey: ['hero_slides'], queryFn: getHeroSlides })

  const reorderMutation = useMutation({
    mutationFn: async ({ a, b }: { a: HeroSlide; b: HeroSlide }) => {
      await Promise.all([
        updateHeroSlide(a.id, { order: b.order }),
        updateHeroSlide(b.id, { order: a.order }),
      ])
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['hero_slides'] }),
    onError: () => toast.error('Error al reordenar'),
  })

  if (isLoading) return <div className="flex justify-center py-16"><Loader2 size={20} className="animate-spin text-[#8a7a60]" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Carrusel</h1>
          <p className="text-[12px] text-[#6a5a40] mt-1">{slides.length} slides · se muestran en orden</p>
        </div>
        <Link
          to="nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] transition-all"
        >
          <Plus size={13} /> Nuevo slide
        </Link>
      </div>

      {slides.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#3a2e1e] rounded-sm">
          <p className="text-[13px] text-[#6a5a40]">No hay slides todavía.</p>
          <Link to="nuevo" className="text-[11px] text-[#c9a96e] mt-2 inline-block hover:underline">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="flex items-center gap-3 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-3 hover:border-[#c9a96e]/30 transition-all"
            >
              {/* Thumbnail */}
              <div className="w-16 h-10 flex-shrink-0 rounded-sm overflow-hidden border border-[#3a2e1e] bg-gradient-to-b from-[#2a1f10] to-[#1a1208]">
                {slide.image_url && (
                  <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#d4c4a0] truncate">{slide.title}</p>
                {slide.subtitle && (
                  <p className="text-[11px] text-[#6a5a40] truncate mt-0.5">{slide.subtitle}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => reorderMutation.mutate({ a: slides[i], b: slides[i - 1] })}
                  disabled={i === 0 || reorderMutation.isPending}
                  className="p-1.5 text-[#6a5a40] hover:text-[#d4c4a0] disabled:opacity-20 transition-colors"
                  title="Subir"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => reorderMutation.mutate({ a: slides[i], b: slides[i + 1] })}
                  disabled={i === slides.length - 1 || reorderMutation.isPending}
                  className="p-1.5 text-[#6a5a40] hover:text-[#d4c4a0] disabled:opacity-20 transition-colors"
                  title="Bajar"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  onClick={() => navigate(slide.id)}
                  className="p-1.5 text-[#8a7a60] hover:text-[#c9a96e] transition-colors ml-1"
                  title="Editar"
                >
                  <Pencil size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminCarouselPage() {
  return (
    <Routes>
      <Route index element={<CarouselList />} />
      <Route path="nuevo" element={<AdminCarouselEditPage />} />
      <Route path=":id" element={<AdminCarouselEditPage />} />
    </Routes>
  )
}
