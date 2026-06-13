import { useState } from 'react'
import { X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Layout from '@/components/layout/Layout'
import { getCharacters } from '@/services/characters'
import type { Character } from '@/types'

export default function CharactersPage() {
  const [selected, setSelected] = useState<Character | null>(null)
  const { data: characters = [] } = useQuery({ queryKey: ['characters'], queryFn: getCharacters })

  const main = characters.filter((c) => c.role === 'main')
  const secondary = characters.filter((c) => c.role === 'secondary')

  return (
    <Layout>
      {/* Banner */}
      <div className="relative w-full h-36 rounded-sm overflow-hidden mb-10 bg-gradient-to-r from-[#2a1f10] via-[#1a1208] to-[#0d0b08] flex items-end p-6 border border-[#3a2e1e]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/80 to-transparent" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-1">El elenco</p>
          <h1 className="font-serif text-2xl text-[#f0e0c0]">Personajes</h1>
        </div>
      </div>

      {/* Protagonistas */}
      <section className="mb-12">
        <h2 className="text-[10px] tracking-[0.25em] text-[#d4c4a0] uppercase mb-6">
          Protagonistas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {main.map((c) => (
            <MainCard key={c.id} character={c} onClick={() => setSelected(c)} />
          ))}
        </div>
      </section>

      {/* Secundarios */}
      <section>
        <h2 className="text-[10px] tracking-[0.25em] text-[#d4c4a0] uppercase mb-6">
          Personajes secundarios
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {secondary.map((c) => (
            <SecondaryCard key={c.id} character={c} onClick={() => setSelected(c)} />
          ))}
        </div>
      </section>

      {/* Detail modal */}
      {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
    </Layout>
  )
}

function MainCard({ character: c, onClick }: { character: Character; onClick: () => void }) {
  return (
    <div
      className="flex gap-5 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-5 cursor-pointer hover:border-[#c9a96e]/50 transition-all group"
      onClick={onClick}
    >
      {/* Portrait */}
      <div className="w-28 flex-shrink-0 aspect-[3/4] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e] group-hover:border-[#c9a96e]/30 transition-all" />

      {/* Info */}
      <div className="flex flex-col justify-between min-w-0">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-0.5">{c.label}</p>
          <p className="font-serif text-lg text-[#f0e0c0] leading-tight mb-1">{c.name}</p>
          <p className="text-[11px] text-[#8a7a60] italic mb-3">{c.tagline}</p>
          <p className="text-[12px] text-[#8a7a60] leading-relaxed line-clamp-3">{c.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {c.traits.map((t) => (
            <span
              key={t}
              className="text-[9px] tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/30 px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SecondaryCard({ character: c, onClick }: { character: Character; onClick: () => void }) {
  return (
    <div
      className="bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-4 cursor-pointer hover:border-[#c9a96e]/50 transition-all group"
      onClick={onClick}
    >
      <div className="w-full aspect-[3/4] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e] group-hover:border-[#c9a96e]/30 transition-all mb-3" />
      <p className="text-[9px] tracking-[0.2em] text-[#c9a96e] uppercase mb-0.5">{c.label}</p>
      <p className="font-serif text-[14px] text-[#f0e0c0] leading-tight mb-1">{c.name}</p>
      <p className="text-[11px] text-[#8a7a60] italic line-clamp-2">{c.tagline}</p>
    </div>
  )
}

function CharacterModal({ character: c, onClose }: { character: Character; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg bg-[#1a1510] border border-[#3a2e1e] rounded-sm shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#8a7a60] hover:text-[#d4c4a0] transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex gap-6 p-6">
          {/* Portrait */}
          <div className="w-36 flex-shrink-0 aspect-[3/4] bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e]" />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-[0.25em] text-[#c9a96e] uppercase mb-0.5">{c.label}</p>
            <h2 className="font-serif text-xl text-[#f0e0c0] mb-1">{c.name}</h2>
            <p className="text-[11px] text-[#8a7a60] italic mb-4">{c.tagline}</p>

            <p className="text-[13px] text-[#8a7a60] leading-relaxed mb-5">{c.description}</p>

            <div className="space-y-2 text-[12px]">
              <div className="flex gap-2">
                <span className="text-[#6a5a40] w-32 flex-shrink-0">Primera aparición</span>
                <span className="text-[#d4c4a0]">{c.first_appearance}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {c.traits.map((t) => (
                <span
                  key={t}
                  className="text-[9px] tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/30 px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
