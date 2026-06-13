import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getExtra, createExtra, updateExtra } from '@/services/extras'
import { toast } from '@/lib/toast'
import ImageUpload from '@/components/admin/ImageUpload'
import type { ExtraCategory } from '@/types'

const inputClass =
  'w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

const CATEGORIES: ExtraCategory[] = ['Arte conceptual', 'Wallpapers', 'Bocetos', 'Fan art']

export default function AdminExtraEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = !id

  const { data: extra } = useQuery({
    queryKey: ['extra', id],
    queryFn: () => getExtra(id!),
    enabled: !!id,
  })

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ExtraCategory>('Arte conceptual')
  const [imageUrl, setImageUrl] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!extra) return
    setTitle(extra.title)
    setCategory(extra.category as ExtraCategory)
    setImageUrl(extra.image_url)
    setDownloadUrl(extra.download_url ?? '')
    setDescription(extra.description ?? '')
  }, [extra])

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        title,
        category,
        image_url: imageUrl,
        download_url: downloadUrl || undefined,
        description,
      }
      if (isNew) await createExtra(data)
      else await updateExtra(id!, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extras'] })
      toast.success(isNew ? 'Extra creado' : 'Extra actualizado')
      navigate('/admin/extras')
    },
    onError: () => toast.error('Error al guardar. Inténtalo de nuevo.'),
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/extras" className="text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-serif text-2xl text-[#f0e0c0]">
          {isNew ? 'Nuevo extra' : 'Editar extra'}
        </h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate() }} className="space-y-6">
        {/* Título */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Título</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Nikolai — diseño original" required className={inputClass} />
        </div>

        {/* Categoría */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Categoría</label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => setCategory(cat)}
                className={`py-2 text-[11px] tracking-widest uppercase border rounded-sm transition-all ${
                  category === cat ? 'bg-[#c9a96e] text-[#0d0b08] border-[#c9a96e] font-medium' : 'border-[#3a2e1e] text-[#8a7a60] hover:text-[#d4c4a0]'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del contenido…" rows={2}
            className={`${inputClass} resize-none`} />
        </div>

        {/* URL de descarga (solo Wallpapers) */}
        {category === 'Wallpapers' && (
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">URL de descarga</label>
            <input type="url" value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)}
              placeholder="https://…" className={inputClass} />
          </div>
        )}

        {/* Imagen */}
        <ImageUpload value={imageUrl} storagePath={`extras/${id ?? `new-${Date.now()}`}/image.jpg`}
          label="Imagen" onChange={setImageUrl} />

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saveMutation.isPending || !title}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {saveMutation.isPending && <Loader2 size={13} className="animate-spin" />}
            {saveMutation.isPending ? 'Guardando...' : 'Guardar extra'}
          </button>
          <Link to="/admin/extras"
            className="px-6 py-2.5 border border-[#3a2e1e] text-[#8a7a60] text-[11px] tracking-widest uppercase hover:border-[#c9a96e]/50 hover:text-[#d4c4a0] transition-all">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
