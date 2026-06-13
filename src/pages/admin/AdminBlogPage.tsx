import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBlogPosts, deleteBlogPost } from '@/services/blog'
import { formatChapterDate } from '@/lib/mockData'
import { toast } from '@/lib/toast'
import AdminBlogEditPage from './AdminBlogEditPage'

function BlogList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: posts = [], isLoading } = useQuery({ queryKey: ['blog_posts'], queryFn: getBlogPosts })

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['blog_posts'] }); toast.success('Entrada eliminada') },
    onError: () => toast.error('Error al eliminar la entrada'),
  })

  if (isLoading) return <div className="flex justify-center py-16"><Loader2 size={20} className="animate-spin text-[#8a7a60]" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Blog</h1>
          <p className="text-[12px] text-[#6a5a40] mt-1">{posts.length} entradas</p>
        </div>
        <Link to="nuevo" className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] transition-all">
          <Plus size={13} /> Nueva entrada
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#3a2e1e] rounded-sm">
          <p className="text-[13px] text-[#6a5a40]">No hay entradas todavía.</p>
          <Link to="nuevo" className="text-[11px] text-[#c9a96e] mt-2 inline-block hover:underline">Crear la primera</Link>
        </div>
      ) : (
        <div className="border border-[#3a2e1e] rounded-sm overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#3a2e1e] bg-[#1a1510]">
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal">Título</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal hidden sm:table-cell">Tag</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal hidden sm:table-cell">Fecha</th>
                <th className="px-4 py-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-[#3a2e1e] last:border-0 hover:bg-[#1a1510] transition-colors">
                  <td className="px-4 py-3 text-[#d4c4a0]">
                    <div className="flex items-center gap-2">
                      {p.featured && <Star size={11} className="text-[#c9a96e] flex-shrink-0" fill="currentColor" />}
                      {p.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-[9px] tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/30 px-2 py-0.5">{p.tag}</span>
                  </td>
                  <td className="px-4 py-3 text-[#6a5a40] hidden sm:table-cell">{formatChapterDate(p.published_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => navigate(p.id)} className="p-1.5 text-[#8a7a60] hover:text-[#c9a96e] transition-colors" title="Editar">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => { if (confirm(`¿Eliminar "${p.title}"?`)) deleteMutation.mutate(p.id) }}
                        disabled={deleteMutation.isPending} className="p-1.5 text-[#8a7a60] hover:text-red-400 transition-colors" title="Eliminar">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function AdminBlogPage() {
  return (
    <Routes>
      <Route index element={<BlogList />} />
      <Route path="nuevo" element={<AdminBlogEditPage />} />
      <Route path=":id" element={<AdminBlogEditPage />} />
    </Routes>
  )
}
