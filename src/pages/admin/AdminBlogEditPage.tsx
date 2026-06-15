import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Plus, X, Trash2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from '@/services/blog'
import { toast } from '@/lib/toast'
import ImageUpload from '@/components/admin/ImageUpload'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import type { BlogPost } from '@/types'

const inputClass =
  'w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function AdminBlogEditPage() {
  const { id } = useParams<{ id: string }>()
  const { data: post } = useQuery({
    queryKey: ['blog_post_id', id],
    queryFn: () => getBlogPostById(id!),
    enabled: !!id,
  })

  return <BlogForm key={post?.id ?? 'new'} id={id} post={post} />
}

function BlogForm({ id, post }: { id?: string; post?: BlogPost }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = !id
  const [newId] = useState(() => `new-${Date.now()}`)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const [slug, setSlug] = useState(post?.slug ?? '')
  const [title, setTitle] = useState(post?.title ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState<string[]>(post?.content.length ? post.content : [''])
  const [coverUrl, setCoverUrl] = useState(post?.cover_url ?? '')
  const [publishedAt, setPublishedAt] = useState(post?.published_at ?? new Date().toISOString().split('T')[0])
  const [tag, setTag] = useState(post?.tag ?? '')
  const [featured, setFeatured] = useState(post?.featured ?? false)
  const [slugManual, setSlugManual] = useState(!!post)

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!slugManual) setSlug(slugify(val))
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        slug,
        title,
        excerpt,
        content: content.filter((p) => p.trim()),
        cover_url: coverUrl,
        published_at: publishedAt,
        tag,
        featured,
      }
      if (isNew) await createBlogPost(data)
      else await updateBlogPost(id!, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['blog_posts'] })
      if (!isNew) await queryClient.invalidateQueries({ queryKey: ['blog_post_id', id] })
      toast.success(isNew ? 'Entrada creada' : 'Entrada actualizada')
      await navigate('/admin/blog')
    },
    onError: () => toast.error('Error al guardar. Inténtalo de nuevo.'),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteBlogPost(id!),
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['blog_posts'] }); toast.success('Entrada eliminada'); await navigate('/admin/blog') },
    onError: () => toast.error('Error al eliminar la entrada'),
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/blog" className="text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-serif text-2xl text-[#f0e0c0]">
          {isNew ? 'Nueva entrada' : 'Editar entrada'}
        </h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate() }} className="space-y-6">
        {/* Título */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Título</label>
          <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título de la entrada" required className={inputClass} />
        </div>

        {/* Slug */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Slug (URL)</label>
          <input type="text" value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugManual(true) }}
            placeholder="url-de-la-entrada" required className={inputClass} />
        </div>

        {/* Excerpt */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Extracto</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Resumen breve que aparece en la lista del blog" rows={2} required
            className={`${inputClass} resize-none`} />
        </div>

        {/* Tag + Fecha + Featured */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Tag</label>
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)}
              placeholder="Anuncio, Proceso…" className={inputClass} />
          </div>
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Fecha</label>
            <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)}
              required className={inputClass} />
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setFeatured(!featured)}
            className={`w-10 h-5 rounded-full transition-all relative ${featured ? 'bg-[#c9a96e]' : 'bg-[#3a2e1e]'}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${featured ? 'left-5' : 'left-0.5'}`} />
          </button>
          <span className="text-[12px] text-[#8a7a60]">Entrada destacada (aparece primera en el blog)</span>
        </div>

        {/* Portada */}
        <ImageUpload value={coverUrl} storagePath={`blog/${id ?? newId}/cover.jpg`}
          label="Imagen de portada" onChange={setCoverUrl} onClear={() => setCoverUrl('')} />

        {/* Contenido */}
        <div className="border-t border-[#3a2e1e] pt-6">
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-3 block">
            Contenido ({content.length} párrafos)
          </label>
          <div className="space-y-3">
            {content.map((para, i) => (
              <div key={i} className="flex gap-2">
                <textarea value={para} onChange={(e) => {
                    const next = [...content]; next[i] = e.target.value; setContent(next)
                  }} rows={3} placeholder={`Párrafo ${i + 1}`}
                  className={`${inputClass} resize-none flex-1`} />
                {content.length > 1 && (
                  <button type="button"
                    onClick={() => setContent(content.filter((_, j) => j !== i))}
                    className="text-[#6a5a40] hover:text-red-400 transition-colors mt-1">
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setContent([...content, ''])}
            className="mt-3 flex items-center gap-1.5 text-[11px] tracking-widest text-[#8a7a60] uppercase hover:text-[#c9a96e] transition-colors">
            <Plus size={12} /> Agregar párrafo
          </button>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saveMutation.isPending || !title || !slug}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {saveMutation.isPending && <Loader2 size={13} className="animate-spin" />}
            {saveMutation.isPending ? 'Guardando...' : 'Guardar entrada'}
          </button>
          <Link to="/admin/blog"
            className="px-6 py-2.5 border border-[#3a2e1e] text-[#8a7a60] text-[11px] tracking-widest uppercase hover:border-[#c9a96e]/50 hover:text-[#d4c4a0] transition-all">
            Cancelar
          </Link>
          {!isNew && (
            <button type="button" onClick={() => setConfirmDelete(true)}
              className="ml-auto flex items-center gap-2 px-4 py-2.5 text-[11px] tracking-widest uppercase text-red-400/70 hover:text-red-400 transition-colors">
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
