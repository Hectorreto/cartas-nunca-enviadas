import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getHeroSlide,
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '@/services/heroSlides'
import { toast } from '@/lib/toast'
import ImageUpload from '@/components/admin/ImageUpload'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import type { HeroSlide } from '@/types'

const inputClass =
  'w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

export default function AdminCarouselEditPage() {
  const { id } = useParams<{ id: string }>()
  const { data: slide } = useQuery({
    queryKey: ['hero_slide', id],
    queryFn: () => getHeroSlide(id!),
    enabled: !!id,
  })
  const { data: allSlides = [] } = useQuery({
    queryKey: ['hero_slides'],
    queryFn: getHeroSlides,
    enabled: !id,
  })

  return (
    <SlideForm
      key={slide?.id ?? 'new'}
      id={id}
      slide={slide}
      nextOrder={allSlides.length}
    />
  )
}

function SlideForm({ id, slide, nextOrder }: { id?: string; slide?: HeroSlide; nextOrder: number }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = !id
  const [newId] = useState(() => `new-${Date.now()}`)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [title, setTitle] = useState(slide?.title ?? '')
  const [subtitle, setSubtitle] = useState(slide?.subtitle ?? '')
  const [imageUrl, setImageUrl] = useState(slide?.image_url ?? '')
  const [linkUrl, setLinkUrl] = useState(slide?.link_url ?? '')

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        title,
        subtitle: subtitle || null,
        image_url: imageUrl || null,
        link_url: linkUrl || null,
        order: slide?.order ?? nextOrder,
      }
      await (isNew ? createHeroSlide(data) : updateHeroSlide(id!, data))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['hero_slides'] })
      if (!isNew) await queryClient.invalidateQueries({ queryKey: ['hero_slide', id] })
      toast.success(isNew ? 'Slide creado' : 'Slide actualizado')
      await navigate('/admin/carrusel')
    },
    onError: () => toast.error('Error al guardar. Inténtalo de nuevo.'),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteHeroSlide(id!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['hero_slides'] })
      toast.success('Slide eliminado')
      await navigate('/admin/carrusel')
    },
    onError: () => toast.error('Error al eliminar el slide'),
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/carrusel" className="text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-serif text-2xl text-[#f0e0c0]">
          {isNew ? 'Nuevo slide' : 'Editar slide'}
        </h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate() }} className="space-y-6">
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Capítulo 01 — El reencuentro"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">
            Subtítulo <span className="text-[#6a5a40] normal-case tracking-normal">— opcional</span>
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Romance • Drama • Segundas oportunidades"
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">
            Enlace <span className="text-[#6a5a40] normal-case tracking-normal">— opcional</span>
          </label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="/leer/uuid-del-capítulo"
            className={inputClass}
          />
          <p className="text-[11px] text-[#6a5a40] mt-1.5">Ruta interna (e.g. /leer/…) o URL externa.</p>
        </div>

        <ImageUpload
          value={imageUrl}
          storagePath={`hero_slides/${id ?? newId}/image.jpg`}
          label="Imagen de fondo"
          onChange={setImageUrl}
          onClear={() => setImageUrl('')}
        />

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saveMutation.isPending || !title}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {saveMutation.isPending && <Loader2 size={13} className="animate-spin" />}
            {saveMutation.isPending ? 'Guardando...' : 'Guardar slide'}
          </button>
          <Link
            to="/admin/carrusel"
            className="px-6 py-2.5 border border-[#3a2e1e] text-[#8a7a60] text-[11px] tracking-widest uppercase hover:border-[#c9a96e]/50 hover:text-[#d4c4a0] transition-all"
          >
            Cancelar
          </Link>
          {!isNew && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="ml-auto flex items-center gap-2 px-4 py-2.5 text-[11px] tracking-widest uppercase text-red-400/70 hover:text-red-400 transition-colors"
            >
              <Trash2 size={13} /> Eliminar
            </button>
          )}
        </div>

        <ConfirmDialog
          open={confirmDelete}
          title={`¿Eliminar "${title}"?`}
          description="Esta acción no se puede deshacer."
          loading={deleteMutation.isPending}
          onConfirm={() => { setConfirmDelete(false); deleteMutation.mutate() }}
          onCancel={() => setConfirmDelete(false)}
        />
      </form>
    </div>
  )
}
