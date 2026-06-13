import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getChapter,
  getChapterPanels,
  createChapter,
  updateChapter,
  replacePanels,
} from '@/services/chapters'
import { uploadFile } from '@/lib/storage'
import { toast } from '@/lib/toast'
import ImageUpload from '@/components/admin/ImageUpload'
import PanelUploader, { type PanelSlot } from '@/components/admin/PanelUploader'

const inputClass =
  'w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

export default function AdminChapterEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = !id
  const [newId] = useState(() => `new-${Date.now()}`)

  const { data: chapter } = useQuery({
    queryKey: ['chapter', id],
    queryFn: () => getChapter(id!),
    enabled: !!id,
  })

  const { data: existingPanels = [] } = useQuery({
    queryKey: ['panels', id],
    queryFn: () => getChapterPanels(id!),
    enabled: !!id,
  })

  const [number, setNumber] = useState('')
  const [title, setTitle] = useState('')
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0])
  const [isFree, setIsFree] = useState(true)
  const [coverUrl, setCoverUrl] = useState('')
  const [panels, setPanels] = useState<PanelSlot[]>([])

  useEffect(() => {
    if (!chapter) return
    setNumber(String(chapter.number))
    setTitle(chapter.title)
    setPublishedAt(chapter.published_at.split('T')[0])
    setIsFree(chapter.is_free)
    setCoverUrl(chapter.cover_url)
  }, [chapter])

  useEffect(() => {
    if (!existingPanels.length) return
    setPanels(
      existingPanels.map((p) => ({
        id: p.id,
        previewUrl: p.image_url,
        url: p.image_url,
        width: p.width,
        height: p.height,
      }))
    )
  }, [existingPanels])

  const saveMutation = useMutation({
    mutationFn: async () => {
      let chapterId = id

      if (isNew) {
        const created = await createChapter({
          number: parseInt(number),
          title,
          cover_url: coverUrl,
          published_at: publishedAt,
          is_free: isFree,
        })
        chapterId = created.id
      } else {
        await updateChapter(id!, {
          number: parseInt(number),
          title,
          cover_url: coverUrl,
          published_at: publishedAt,
          is_free: isFree,
        })
      }

      const panelData = await Promise.all(
        panels.map(async (slot, order) => {
          if (slot.file) {
            const ext = slot.file.name.split('.').pop() ?? 'jpg'
            const image_url = await uploadFile(`panels/${chapterId}/${order}.${ext}`, slot.file)
            return { image_url, order, width: slot.width, height: slot.height }
          }
          return { image_url: slot.url!, order, width: slot.width, height: slot.height }
        })
      )

      await replacePanels(chapterId!, panelData)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['chapters'] })
      if (id) {
        await queryClient.invalidateQueries({ queryKey: ['chapter', id] })
        await queryClient.invalidateQueries({ queryKey: ['panels', id] })
      }
      toast.success(isNew ? 'Capítulo creado' : 'Capítulo actualizado')
      await navigate('/admin/capitulos')
    },
    onError: () => toast.error('Error al guardar. Verifica los datos e inténtalo de nuevo.'),
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/capitulos" className="text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-serif text-2xl text-[#f0e0c0]">
          {isNew ? 'Nuevo capítulo' : 'Editar capítulo'}
        </h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate() }} className="space-y-6">
        {/* Número + Título */}
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">N°</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="1"
              min="1"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del capítulo"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Fecha + Acceso */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">
              Fecha de publicación
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Acceso</label>
            <div className="flex rounded-sm border border-[#3a2e1e] overflow-hidden h-[42px]">
              {([true, false] as const).map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => setIsFree(val)}
                  className={`flex-1 text-[11px] tracking-widest uppercase transition-all ${
                    isFree === val
                      ? 'bg-[#c9a96e] text-[#0d0b08] font-medium'
                      : 'text-[#8a7a60] hover:text-[#d4c4a0]'
                  }`}
                >
                  {val ? 'Gratis' : 'Premium'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portada */}
        <ImageUpload
          value={coverUrl}
          storagePath={`covers/${id ?? newId}/cover.jpg`}
          label="Portada del capítulo"
          onChange={setCoverUrl}
        />

        {/* Paneles */}
        <div className="border-t border-[#3a2e1e] pt-6">
          <PanelUploader panels={panels} onChange={setPanels} />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saveMutation.isPending || !title || !number}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {saveMutation.isPending && <Loader2 size={13} className="animate-spin" />}
            {saveMutation.isPending ? 'Guardando...' : 'Guardar capítulo'}
          </button>
          <Link
            to="/admin/capitulos"
            className="px-6 py-2.5 border border-[#3a2e1e] text-[#8a7a60] text-[11px] tracking-widest uppercase hover:border-[#c9a96e]/50 hover:text-[#d4c4a0] transition-all"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
