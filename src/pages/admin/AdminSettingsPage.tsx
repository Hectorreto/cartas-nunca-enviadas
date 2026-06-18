import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSettings, updateSettings } from '@/services/siteSettings'
import { toast } from '@/lib/toast'
import ImageUpload from '@/components/admin/ImageUpload'
import type { SiteSettings } from '@/types'

const inputClass =
  'w-full bg-[#1a1510] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

export default function AdminSettingsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['site_settings'], queryFn: getSettings })
  if (isLoading) return <div className="flex justify-center py-16"><Loader2 size={20} className="animate-spin text-[#8a7a60]" /></div>
  return <SettingsForm initial={data!} />
}

function SettingsForm({ initial }: { initial: SiteSettings }) {
  const queryClient = useQueryClient()
  const [heroUrl, setHeroUrl] = useState(initial.hero_image_url ?? '')
  const [trailerUrl, setTrailerUrl] = useState(initial.trailer_url ?? '')
  const [playlistUrl, setPlaylistUrl] = useState(initial.playlist_url ?? '')
  const [storyParagraphs, setStoryParagraphs] = useState(initial.story_paragraphs ?? '')
  const [storyClosing, setStoryClosing] = useState(initial.story_closing ?? '')
  const [storyQuote, setStoryQuote] = useState(initial.story_quote ?? '')

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateSettings({
      hero_image_url: heroUrl || null,
      trailer_url: trailerUrl || null,
      playlist_url: playlistUrl || null,
      story_paragraphs: storyParagraphs || null,
      story_closing: storyClosing || null,
      story_quote: storyQuote || null,
    }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['site_settings'] })
      toast.success('Configuración guardada')
    },
    onError: () => toast.error('Error al guardar la configuración'),
  })

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-[#f0e0c0]">Configuración general</h1>
        <p className="text-[12px] text-[#6a5a40] mt-1">Ajustes visuales de la pantalla de inicio</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); mutate() }}
        className="space-y-8"
      >
        {/* Hero */}
        <div>
          <h2 className="text-[10px] tracking-[0.2em] text-[#8a7a60] uppercase mb-4">Imagen principal (Hero)</h2>
          <ImageUpload
            value={heroUrl}
            storagePath="settings/hero.jpg"
            label="Imagen de fondo"
            onChange={setHeroUrl}
            onClear={() => setHeroUrl('')}
          />
        </div>

        {/* Tráiler */}
        <div className="border-t border-[#3a2e1e] pt-6">
          <h2 className="text-[10px] tracking-[0.2em] text-[#8a7a60] uppercase mb-4">Tráiler</h2>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">URL del video</label>
          <input
            type="url"
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className={inputClass}
          />
          <p className="text-[11px] text-[#6a5a40] mt-1.5">YouTube, Vimeo, o cualquier URL de video.</p>
        </div>

        {/* Playlist */}
        <div className="border-t border-[#3a2e1e] pt-6">
          <h2 className="text-[10px] tracking-[0.2em] text-[#8a7a60] uppercase mb-4">Playlist</h2>
          <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">URL de Spotify o YouTube Music</label>
          <input
            type="url"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder="https://open.spotify.com/..."
            className={inputClass}
          />
        </div>

        {/* Sobre la historia */}
        <div className="border-t border-[#3a2e1e] pt-6">
          <h2 className="text-[10px] tracking-[0.2em] text-[#8a7a60] uppercase mb-4">Sobre la historia</h2>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Párrafos principales</label>
              <textarea
                value={storyParagraphs}
                onChange={(e) => setStoryParagraphs(e.target.value)}
                rows={5}
                placeholder={"Él no creía en el amor.\nElla no creía en rendirse.\nDos almas tercas. Dos heridas profundas."}
                className={`${inputClass} resize-none`}
              />
              <p className="text-[11px] text-[#6a5a40] mt-1.5">Cada línea se muestra como un párrafo separado.</p>
            </div>

            <div>
              <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Párrafo final (oscurecido)</label>
              <input
                type="text"
                value={storyClosing}
                onChange={(e) => setStoryClosing(e.target.value)}
                placeholder="Aunque el destino ya tenga otros planes."
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">Frase entre comillas</label>
              <input
                type="text"
                value={storyQuote}
                onChange={(e) => setStoryQuote(e.target.value)}
                placeholder="No fue la muerte lo que nos separó..."
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#3a2e1e] pt-6">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-50 transition-all"
          >
            {isPending && <Loader2 size={13} className="animate-spin" />}
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  )
}
