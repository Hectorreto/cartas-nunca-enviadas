import { useState } from 'react'
import { Download } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import { MOCK_EXTRAS } from '@/lib/mockData'
import type { ExtraCategory } from '@/types'

const CATEGORIES: ExtraCategory[] = ['Arte conceptual', 'Wallpapers', 'Bocetos', 'Fan art']

export default function ExtrasPage() {
  const [active, setActive] = useState<ExtraCategory | 'Todos'>('Todos')

  const filtered = active === 'Todos'
    ? MOCK_EXTRAS
    : MOCK_EXTRAS.filter((e) => e.category === active)

  return (
    <Layout>
      {/* Banner */}
      <div className="relative w-full h-36 rounded-sm overflow-hidden mb-10 bg-gradient-to-r from-[#2a1f10] via-[#1a1208] to-[#0d0b08] flex items-end p-6 border border-[#3a2e1e]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/80 to-transparent" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-1">Contenido adicional</p>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Extras</h1>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(['Todos', ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition-all rounded-sm border ${
              active === cat
                ? 'bg-[#c9a96e] text-[#0d0b08] border-[#c9a96e] font-medium'
                : 'border-[#3a2e1e] text-[#8a7a60] hover:border-[#c9a96e]/50 hover:text-[#d4c4a0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-[#1a1510] border border-[#3a2e1e] rounded-sm overflow-hidden hover:border-[#c9a96e]/50 transition-all"
          >
            {/* Image */}
            <div className="relative w-full aspect-square bg-gradient-to-b from-[#2a1f10] to-[#1a1208]">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              )}
              {/* Category badge */}
              <span className="absolute top-2 left-2 text-[9px] tracking-widest uppercase text-[#c9a96e] bg-[#0d0b08]/80 border border-[#c9a96e]/30 px-1.5 py-0.5">
                {item.category}
              </span>
              {/* Download button for wallpapers */}
              {item.download_url && (
                <a
                  href={item.download_url}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-[#c9a96e] text-[#0d0b08] rounded-sm hover:bg-[#e8c98a]"
                  title="Descargar"
                >
                  <Download size={13} />
                </a>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-[12px] text-[#d4c4a0] font-medium leading-tight line-clamp-1">
                {item.title}
              </p>
              {item.description && (
                <p className="text-[11px] text-[#8a7a60] mt-1 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#6a5a40] text-[13px] py-16">
          No hay contenido en esta categoría todavía.
        </p>
      )}
    </Layout>
  )
}
