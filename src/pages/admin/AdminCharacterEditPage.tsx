import { useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCharacter, createCharacter, updateCharacter } from '@/services/characters'
import { toast } from '@/lib/toast'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Character } from '@/types'

const inputClass =
  'w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

export default function AdminCharacterEditPage() {
  const { id } = useParams<{ id: string }>()
  const { data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id!),
    enabled: !!id,
  })

  return <CharacterForm key={character?.id ?? 'new'} id={id} character={character} />
}

function CharacterForm({ id, character }: { id?: string; character?: Character }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = !id
  const [newId] = useState(() => `new-${Date.now()}`)
  const traitInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(character?.name ?? '')
  const [label, setLabel] = useState(character?.label ?? '')
  const [tagline, setTagline] = useState(character?.tagline ?? '')
  const [description, setDescription] = useState(character?.description ?? '')
  const [portraitUrl, setPortraitUrl] = useState(character?.portrait_url ?? '')
  const [role, setRole] = useState<'main' | 'secondary'>((character?.role as 'main' | 'secondary') ?? 'secondary')
  const [traits, setTraits] = useState<string[]>(character?.traits ?? [])
  const [firstAppearance, setFirstAppearance] = useState(character?.first_appearance ?? '')

  function addTrait(value: string) {
    const trimmed = value.trim()
    if (trimmed && !traits.includes(trimmed)) setTraits([...traits, trimmed])
    if (traitInputRef.current) traitInputRef.current.value = ''
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = { name, label, tagline, description, portrait_url: portraitUrl, role, traits, first_appearance: firstAppearance }
      if (isNew) await createCharacter(data)
      else await updateCharacter(id!, data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['characters'] })
      if (!isNew) await queryClient.invalidateQueries({ queryKey: ['character', id] })
      toast.success(isNew ? 'Personaje creado' : 'Personaje actualizado')
      await navigate('/admin/personajes')
    },
    onError: () => toast.error('Error al guardar. Inténtalo de nuevo.'),
  })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/personajes" className="text-[#8a7a60] hover:text-[#c9a96e] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-serif text-2xl text-[#f0e0c0]">
          {isNew ? 'Nuevo personaje' : 'Editar personaje'}
        </h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate() }} className="space-y-6">
        {/* Nombre + Label */}
        <div className="grid grid-cols-[1fr_140px] gap-4">
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Nikolai Voronov" required className={inputClass} />
          </div>
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Etiqueta</label>
            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)}
              placeholder="ÉL" required className={inputClass} />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Tagline</label>
          <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
            placeholder="Empresario. Frío. Brillante." required className={inputClass} />
        </div>

        {/* Rol + Primera aparición */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Rol</label>
            <div className="flex rounded-sm border border-[#3a2e1e] overflow-hidden h-[42px]">
              {(['main', 'secondary'] as const).map((val) => (
                <button key={val} type="button" onClick={() => setRole(val)}
                  className={`flex-1 text-[11px] tracking-widest uppercase transition-all ${
                    role === val ? 'bg-[#c9a96e] text-[#0d0b08] font-medium' : 'text-[#8a7a60] hover:text-[#d4c4a0]'
                  }`}>
                  {val === 'main' ? 'Principal' : 'Secundario'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Primera aparición</label>
            <input type="text" value={firstAppearance} onChange={(e) => setFirstAppearance(e.target.value)}
              placeholder="Capítulo 1" className={inputClass} />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del personaje…" rows={4} required
            className={`${inputClass} resize-none`} />
        </div>

        {/* Rasgos */}
        <div>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Rasgos</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {traits.map((t) => (
              <span key={t} className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e]/30 px-2 py-0.5">
                {t}
                <button type="button" onClick={() => setTraits(traits.filter((x) => x !== t))} className="hover:text-red-400 transition-colors">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
          <input ref={traitInputRef} type="text" placeholder="Escribir rasgo y presionar Enter"
            className={inputClass}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTrait((e.target as HTMLInputElement).value) } }} />
        </div>

        {/* Retrato */}
        <ImageUpload value={portraitUrl} storagePath={`characters/${id ?? newId}/portrait.jpg`}
          label="Retrato del personaje" onChange={setPortraitUrl} onClear={() => setPortraitUrl('')} />

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saveMutation.isPending || !name || !label}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {saveMutation.isPending && <Loader2 size={13} className="animate-spin" />}
            {saveMutation.isPending ? 'Guardando...' : 'Guardar personaje'}
          </button>
          <Link to="/admin/personajes"
            className="px-6 py-2.5 border border-[#3a2e1e] text-[#8a7a60] text-[11px] tracking-widest uppercase hover:border-[#c9a96e]/50 hover:text-[#d4c4a0] transition-all">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
