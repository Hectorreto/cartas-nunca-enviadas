import { useRef, useState } from 'react'
import { X, GripVertical, Plus } from 'lucide-react'

export interface PanelSlot {
  id: string
  file?: File
  previewUrl: string
  url?: string
  width: number
  height: number
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    const blobUrl = URL.createObjectURL(file)
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(blobUrl)
    }
    img.src = blobUrl
  })
}

interface Props {
  panels: PanelSlot[]
  onChange: (panels: PanelSlot[]) => void
}

export default function PanelUploader({ panels, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragIndexRef = useRef<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)

  async function handleFiles(files: FileList) {
    const newSlots: PanelSlot[] = await Promise.all(
      Array.from(files).map(async (file) => {
        const { width, height } = await getImageDimensions(file)
        return { id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file), width, height }
      })
    )
    onChange([...panels, ...newSlots])
  }

  function remove(id: string) {
    onChange(panels.filter((p) => p.id !== id))
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault()
    setDragOver(i)
  }

  function handleDrop(i: number) {
    const from = dragIndexRef.current
    if (from === null || from === i) { setDragOver(null); return }
    const reordered = [...panels]
    const [moved] = reordered.splice(from, 1)
    reordered.splice(i, 0, moved)
    onChange(reordered)
    dragIndexRef.current = null
    setDragOver(null)
  }

  return (
    <div>
      <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-3 block">
        Paneles {panels.length > 0 && `(${panels.length})`}
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-3">
        {panels.map((panel, i) => (
          <div
            key={panel.id}
            draggable
            onDragStart={() => { dragIndexRef.current = i }}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={() => handleDrop(i)}
            onDragLeave={() => setDragOver(null)}
            className={`relative group aspect-[2/3] bg-[#1a1510] border rounded-sm overflow-hidden cursor-grab active:cursor-grabbing transition-all ${
              dragOver === i ? 'border-[#c9a96e] scale-105' : 'border-[#3a2e1e]'
            }`}
          >
            <img src={panel.previewUrl} alt="" className="w-full h-full object-cover" />

            <span className="absolute top-1 left-1 text-[9px] font-mono text-[#c9a96e] bg-[#0d0b08]/80 px-1 leading-tight">
              {String(i + 1).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => remove(panel.id)}
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0d0b08]/80 text-[#d4c4a0] hover:text-red-400 p-0.5 rounded-sm"
            >
              <X size={11} />
            </button>

            <div className="absolute bottom-1 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#6a5a40]">
              <GripVertical size={12} />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="aspect-[2/3] border border-dashed border-[#3a2e1e] rounded-sm flex flex-col items-center justify-center gap-1 text-[#6a5a40] hover:border-[#c9a96e]/50 hover:text-[#8a7a60] transition-all"
        >
          <Plus size={16} />
          <span className="text-[9px] tracking-widest uppercase">Agregar</span>
        </button>
      </div>

      {panels.length === 0 && (
        <p className="text-[11px] text-[#6a5a40] mb-3">
          Agrega las imágenes del capítulo en orden. Puedes arrastrarlas para reordenar.
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files) }}
      />
    </div>
  )
}
