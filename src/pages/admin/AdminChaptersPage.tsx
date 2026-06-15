import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getChapters } from '@/services/chapters'
import { formatChapterDate } from '@/lib/utils'
import AdminChapterEditPage from './AdminChapterEditPage'

function ChapterList() {
  const navigate = useNavigate()
  const { data: chapters = [], isLoading } = useQuery({
    queryKey: ['chapters'],
    queryFn: getChapters,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={20} className="animate-spin text-[#8a7a60]" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Capítulos</h1>
          <p className="text-[12px] text-[#6a5a40] mt-1">{chapters.length} capítulos publicados</p>
        </div>
        <Link
          to="nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] transition-all"
        >
          <Plus size={13} /> Nuevo capítulo
        </Link>
      </div>

      {chapters.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#3a2e1e] rounded-sm">
          <p className="text-[13px] text-[#6a5a40]">No hay capítulos todavía.</p>
          <Link to="nuevo" className="text-[11px] text-[#c9a96e] mt-2 inline-block hover:underline">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="border border-[#3a2e1e] rounded-sm overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#3a2e1e] bg-[#1a1510]">
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal w-16">N°</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal">Título</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal hidden sm:table-cell">Fecha</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal hidden sm:table-cell">Tipo</th>
                <th className="px-4 py-3 w-12" />
              </tr>
            </thead>
            <tbody>
              {chapters.map((ch) => (
                <tr key={ch.id} className="border-b border-[#3a2e1e] last:border-0 hover:bg-[#1a1510] transition-colors">
                  <td className="px-4 py-3 font-mono text-[#c9a96e]">
                    {String(ch.number).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-3 text-[#d4c4a0]">{ch.title}</td>
                  <td className="px-4 py-3 text-[#6a5a40] hidden sm:table-cell">
                    {formatChapterDate(ch.published_at)}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`text-[9px] tracking-widest uppercase px-2 py-0.5 border ${
                        ch.is_free
                          ? 'text-emerald-400 border-emerald-400/30'
                          : 'text-[#c9a96e] border-[#c9a96e]/30'
                      }`}
                    >
                      {ch.is_free ? 'Gratis' : 'Premium'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => navigate(ch.id)}
                        className="p-1.5 text-[#8a7a60] hover:text-[#c9a96e] transition-colors"
                        title="Editar"
                      >
                        <Pencil size={13} />
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

export default function AdminChaptersPage() {
  return (
    <Routes>
      <Route index element={<ChapterList />} />
      <Route path="nuevo" element={<AdminChapterEditPage />} />
      <Route path=":id" element={<AdminChapterEditPage />} />
    </Routes>
  )
}
