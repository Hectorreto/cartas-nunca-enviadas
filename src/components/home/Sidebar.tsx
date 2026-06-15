import { useMemo } from 'react'
import { ChevronRight, Music } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFragments } from '@/services/fragments'
import { getRecentComments } from '@/services/comments'
import { formatRelativeTime } from '@/lib/utils'

export default function Sidebar() {
  const { data: fragments = [] } = useQuery({ queryKey: ['fragments'], queryFn: getFragments })
  const preview = useMemo(() =>
    [...fragments].sort(() => Math.random() - 0.5).slice(0, 3)
  , [fragments])
  const { data: comments = [] } = useQuery({ queryKey: ['comments_recent'], queryFn: () => getRecentComments(3) })

  return (
    <aside className="flex flex-col gap-8">
      {/* Sobre la historia */}
      <div>
        <h3 className="text-[10px] tracking-[0.25em] text-[#d4c4a0] uppercase mb-3">
          Sobre la historia
        </h3>
        <div className="text-[13px] text-[#8a7a60] leading-relaxed space-y-0.5">
          <p>Él no creía en el amor.</p>
          <p>Ella no creía en rendirse.</p>
          <p>Dos almas tercas. Dos heridas profundas.</p>
          <p>Un encuentro que cambiará todo...</p>
          <p className="text-[#6a5a40]">Aunque el destino ya tenga otros planes.</p>
        </div>
        <blockquote className="mt-4 pl-3 border-l-2 border-[#c9a96e]/40 font-serif italic text-[13px] text-[#8a7a60] leading-relaxed">
          <span className="text-[#c9a96e] text-2xl leading-none font-serif">"</span>
          No fue la muerte lo que nos separó, fue el orgullo, el miedo y todas las cosas que no supimos decir a tiempo.
          <span className="text-[#c9a96e] text-2xl leading-none font-serif">"</span>
        </blockquote>
      </div>

      {/* Fragmentos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] tracking-[0.25em] text-[#d4c4a0] uppercase">Fragmentos</h3>
          <Link to="/fragmentos" className="text-[10px] text-[#8a7a60] hover:text-[#c9a96e] flex items-center gap-0.5 transition-colors">
            Ver todos <ChevronRight size={10} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {preview.map((f) => (
            <Link key={f.id} to="/fragmentos" className="group">
              {f.image_url ? (
                <img src={f.image_url} alt={f.title} className="aspect-square w-full object-cover rounded-sm border border-[#3a2e1e] group-hover:border-[#c9a96e]/40 transition-all" />
              ) : (
                <div className="aspect-square bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e] group-hover:border-[#c9a96e]/40 transition-all" />
              )}
              <p className="mt-1 text-[10px] text-[#8a7a60] text-center leading-tight">{f.title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Playlist */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] tracking-[0.25em] text-[#d4c4a0] uppercase">Playlist Oficial</h3>
          <a href="#" className="text-[10px] text-[#8a7a60] hover:text-[#c9a96e] transition-colors uppercase tracking-wider">
            Escuchar →
          </a>
        </div>
        <div className="flex items-center gap-3 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2a1f10] to-[#0d0b08] rounded-sm flex-shrink-0 flex items-center justify-center border border-[#3a2e1e]">
            <Music size={16} className="text-[#c9a96e]" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] text-[#d4c4a0] truncate">Cartas que nunca fueron enviadas</p>
            <p className="text-[10px] text-[#8a7a60] mt-0.5">Una playlist inspirada en cada capítulo.</p>
            <div className="flex gap-0.5 mt-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-[#1DB954] rounded-full"
                  style={{ height: `${4 + Math.sin(i * 1.5) * 4 + 4}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comentarios recientes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] tracking-[0.25em] text-[#d4c4a0] uppercase">Comentarios Recientes</h3>
          <Link to="/capitulos" className="text-[10px] text-[#8a7a60] hover:text-[#c9a96e] flex items-center gap-0.5 transition-colors">
            Ver todos <ChevronRight size={10} />
          </Link>
        </div>
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3a2e1e] to-[#2a1f10] flex-shrink-0 border border-[#3a2e1e]" />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-medium text-[#c9a96e]">{c.user.username}</span>
                  <span className="text-[10px] text-[#6a5a40]">{formatRelativeTime(c.created_at)}</span>
                </div>
                <p className="text-[12px] text-[#8a7a60] mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/capitulos" className="block w-full mt-4 py-2 border border-[#3a2e1e] text-[10px] tracking-widest text-[#8a7a60] hover:border-[#c9a96e] hover:text-[#c9a96e] uppercase transition-all text-center">
          Dejar mi comentario
        </Link>
      </div>
    </aside>
  )
}
