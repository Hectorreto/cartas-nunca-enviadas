import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getFragments } from '@/services/fragments'
import AdminFragmentEditPage from './AdminFragmentEditPage'

function FragmentList() {
  const navigate = useNavigate()
  const { data: fragments = [], isLoading } = useQuery({ queryKey: ['fragments'], queryFn: getFragments })

  if (isLoading) return <div className="flex justify-center py-16"><Loader2 size={20} className="animate-spin text-[#8a7a60]" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Fragmentos</h1>
          <p className="text-[12px] text-[#6a5a40] mt-1">{fragments.length} fragmentos</p>
        </div>
        <Link to="nuevo" className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] transition-all">
          <Plus size={13} /> Nuevo fragmento
        </Link>
      </div>

      {fragments.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#3a2e1e] rounded-sm">
          <p className="text-[13px] text-[#6a5a40]">No hay fragmentos todavía.</p>
          <Link to="nuevo" className="text-[11px] text-[#c9a96e] mt-2 inline-block hover:underline">Crear el primero</Link>
        </div>
      ) : (
        <div className="border border-[#3a2e1e] rounded-sm overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#3a2e1e] bg-[#1a1510]">
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal">Título</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal hidden sm:table-cell">Capítulo</th>
                <th className="text-left px-4 py-3 text-[10px] tracking-widest text-[#6a5a40] uppercase font-normal hidden sm:table-cell">Proporción</th>
                <th className="px-4 py-3 w-12" />
              </tr>
            </thead>
            <tbody>
              {fragments.map((f) => (
                <tr key={f.id} className="border-b border-[#3a2e1e] last:border-0 hover:bg-[#1a1510] transition-colors">
                  <td className="px-4 py-3 text-[#d4c4a0]">{f.title}</td>
                  <td className="px-4 py-3 text-[#6a5a40] hidden sm:table-cell">Cap. {f.chapter_number}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-[9px] tracking-widest uppercase text-[#6a5a40] border border-[#6a5a40]/30 px-2 py-0.5">{f.aspect}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <button onClick={() => navigate(f.id)} className="p-1.5 text-[#8a7a60] hover:text-[#c9a96e] transition-colors" title="Editar">
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

export default function AdminFragmentsPage() {
  return (
    <Routes>
      <Route index element={<FragmentList />} />
      <Route path="nuevo" element={<AdminFragmentEditPage />} />
      <Route path=":id" element={<AdminFragmentEditPage />} />
    </Routes>
  )
}
