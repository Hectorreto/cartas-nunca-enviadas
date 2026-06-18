import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Layout from '@/components/layout/Layout'
import { getChapters } from '@/services/chapters'
import { formatChapterDate } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

type Filter = 'all' | 'free' | 'premium'

export default function ChaptersPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const { data: chapters = [] } = useQuery({ queryKey: ['chapters'], queryFn: getChapters })
  const user = useAuthStore((s) => s.user)

  const filtered = chapters.filter((ch) => {
    if (filter === 'free') return ch.is_free
    if (filter === 'premium') return !ch.is_free
    return true
  })

  return (
    <Layout>
      {/* Banner */}
      <div className="relative w-full h-36 rounded-sm overflow-hidden mb-8 bg-gradient-to-r from-[#2a1f10] via-[#1a1208] to-[#0d0b08] flex items-end p-6 border border-[#3a2e1e]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/80 to-transparent" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-1">
            Romance • Drama • Segundas Oportunidades
          </p>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">
            Cartas que nunca fueron enviadas
          </h1>
        </div>
      </div>

      {/* Header + filtros */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[11px] tracking-[0.25em] text-[#d4c4a0] uppercase">Capítulos</h2>
          <p className="text-[12px] text-[#8a7a60] mt-0.5">{chapters.length} capítulos publicados</p>
        </div>
        <div className="flex gap-1 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-1">
          {(['all', 'free', 'premium'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-all rounded-sm ${
                filter === f
                  ? 'bg-[#c9a96e] text-[#0d0b08] font-medium'
                  : 'text-[#8a7a60] hover:text-[#d4c4a0]'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'free' ? 'Gratis' : 'Premium'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#3a2e1e] rounded-sm">
          <p className="text-[13px] text-[#6a5a40]">
            No hay capítulos {filter === 'free' ? 'gratuitos' : 'premium'} todavía.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((ch) => {
            const accessible = ch.is_free || !!user
            return (
              <Link
                key={ch.id}
                to={accessible ? `/leer/${ch.id}` : '#'}
                className="group"
              >
                {/* Cover */}
                <div className="relative w-full aspect-[2/3] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm overflow-hidden border border-[#3a2e1e] group-hover:border-[#c9a96e]/50 transition-all">
                  {ch.cover_url && (
                    <img src={ch.cover_url} alt={ch.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}

                  {/* Number badge */}
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-[#c9a96e] bg-[#0d0b08]/80 px-1.5 py-0.5">
                    {String(ch.number).padStart(2, '0')}
                  </span>

                  {/* Premium lock — solo para no logueados */}
                  {!ch.is_free && !user && (
                    <div className="absolute inset-0 bg-[#0d0b08]/60 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-1">
                        <Lock size={18} className="text-[#c9a96e]" />
                        <span className="text-[9px] tracking-widest text-[#c9a96e] uppercase">Premium</span>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  {accessible && (
                    <div className="absolute inset-0 bg-[#c9a96e]/0 group-hover:bg-[#c9a96e]/10 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-widest text-[#f0e0c0] uppercase border border-[#f0e0c0]/50 px-2 py-1">
                        Leer
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <p className="mt-2 text-[12px] text-[#d4c4a0] leading-tight line-clamp-2 group-hover:text-[#c9a96e] transition-colors">
                  {ch.title}
                </p>
                <p className="mt-1 text-[10px] text-[#8a7a60]">
                  {formatChapterDate(ch.published_at)}
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </Layout>
  )
}
