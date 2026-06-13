import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFragment, createFragment, updateFragment } from '@/services/fragments'
import { toast } from '@/lib/toast'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Fragment } from '@/types'

const inputClass =
  'w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

const ASPECTS: Fragment['aspect'][] = ['tall', 'wide', 'square']
const ASPECT_LABELS: Record<Fragment['aspect'], string> = { tall: 'Vertical', wide: 'Horizontal', square: 'Cuadrado' }

export default function AdminFragmentEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = !id

  const { data: fragment } = useQuery({
    queryKey: ['fragment', id],
    queryFn: () => getFragment(id!),
    enabled: !!id,
  })

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [chapterNumber, setChapterNumber] = useState('')
  const [chapterTitle, setChapterTitle] = useState('')
  const [aspect, setAspect] = useState<Fragment['aspect']>('square')

  useEffect(() => {
    if (!fragment) return
    setTitle(fragment.title)
    setDescription(fragment.description)
    setImageUrl(fragment.image_url)
    setChapterNumber(String(fragment.chapter_number))
    setChapterTitle(fragment.chapter_title)
    setAspect(fragment.aspect)
  }, [fragment])

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = { title, description, image_url: imageUrl, chapter_number: parseInt(chapterNumber), chapter_title: chapterTitle, aspect }
      if (isNew) await createFragment(data)
      else await updateFragment(id!, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fragments'] })
      toast.success(isNew ? 'Fragmento creado' : 'Fragmento actualizado')
      navigate('/admin/fragmentos')
    },
    onError: () => toast.error('Error al guardar. Inténtalo de nuevo.'),
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/fragmentos" className="text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-serif text-2xl text-[#f0e0c0]">
          {isNew ? 'Nuevo fragmento' : 'Editar fragmento'}
        </h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate() }} className="space-y-6">
        {/* Título */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Título</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="El piano" required className={inputClass} />
        </div>

        {/* Descripción */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Descripción</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="La primera vez que ella tocó para él." required className={inputClass} />
        </div>

        {/* Capítulo */}
        <div className="grid grid-cols-[100px_1fr] gap-4">
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Cap. N°</label>
            <input type="number" value={chapterNumber} onChange={(e) => setChapterNumber(e.target.value)}
              placeholder="4" min="1" required className={inputClass} />
          </div>
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Título del capítulo</label>
            <input type="text" value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="La noche del piano" required className={inputClass} />
          </div>
        </div>

        {/* Aspecto */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Proporción de la imagen</label>
          <div className="flex gap-2">
            {ASPECTS.map((a) => (
              <button key={a} type="button" onClick={() => setAspect(a)}
                className={`flex-1 py-2 text-[11px] tracking-widest uppercase border rounded-sm transition-all ${
                  aspect === a ? 'bg-[#c9a96e] text-[#0d0b08] border-[#c9a96e] font-medium' : 'border-[#3a2e1e] text-[#8a7a60] hover:text-[#d4c4a0]'
                }`}>
                {ASPECT_LABELS[a]}
              </button>
            ))}
          </div>
        </div>

        {/* Imagen */}
        <ImageUpload value={imageUrl} storagePath={`fragments/${id ?? `new-${Date.now()}`}/image.jpg`}
          label="Imagen del fragmento" onChange={setImageUrl} />

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saveMutation.isPending || !title}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {saveMutation.isPending && <Loader2 size={13} className="animate-spin" />}
            {saveMutation.isPending ? 'Guardando...' : 'Guardar fragmento'}
          </button>
          <Link to="/admin/fragmentos"
            className="px-6 py-2.5 border border-[#3a2e1e] text-[#8a7a60] text-[11px] tracking-widest uppercase hover:border-[#c9a96e]/50 hover:text-[#d4c4a0] transition-all">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
