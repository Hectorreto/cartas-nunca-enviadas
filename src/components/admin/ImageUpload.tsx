import { useRef, useState } from 'react'
import { ImageIcon, Loader2, ArrowDownToLine, X } from 'lucide-react'
import { uploadFile } from '@/lib/storage'

interface Props {
  value: string
  storagePath: string
  label?: string
  onChange: (url: string) => void
  onClear?: () => void
}

export default function ImageUpload({ value, storagePath, label = 'Imagen', onChange, onClear }: Props) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    try {
      const url = await uploadFile(storagePath, file)
      onChange(url)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="text-[11px] tracking-widest text-[#8a7a60] uppercase mb-2 block">{label}</label>
      <div
        className={`relative w-full aspect-video bg-[#1a1510] border rounded-sm overflow-hidden cursor-pointer transition-all group ${
          dragOver
            ? 'border-[#c9a96e] bg-[#c9a96e]/10 shadow-[0_0_12px_#c9a96e33]'
            : 'border-[#3a2e1e] hover:border-[#c9a96e]/50'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) void handleFile(f) }}
      >
        {value ? (
          <>
            <img src={value} alt="" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 transition-all flex items-center justify-center ${
              dragOver
                ? 'bg-[#0d0b08]/60 opacity-100'
                : 'bg-[#0d0b08]/0 opacity-0 group-hover:bg-[#0d0b08]/50 group-hover:opacity-100'
            }`}>
              {dragOver
                ? <ArrowDownToLine size={20} className="text-[#c9a96e]" />
                : <span className="text-[11px] tracking-widest text-white uppercase">Cambiar imagen</span>
              }
            </div>
            {onClear && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onClear() }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0d0b08]/80 text-[#d4c4a0] hover:text-red-400 p-0.5 rounded-sm"
              >
                <X size={11} />
              </button>
            )}
          </>
        ) : (
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-colors ${
            dragOver ? 'text-[#c9a96e]' : 'text-[#6a5a40] group-hover:text-[#8a7a60]'
          }`}>
            {dragOver ? <ArrowDownToLine size={24} /> : <ImageIcon size={24} />}
            <span className="text-[11px] tracking-widest uppercase">
              {dragOver ? 'Suelta aquí' : 'Arrastra o haz clic para subir'}
            </span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-[#0d0b08]/70 flex items-center justify-center">
            <Loader2 size={20} className="animate-spin text-[#c9a96e]" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f) }}
      />
    </div>
  )
}
