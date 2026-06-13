import { useRef, useState } from 'react'
import { ImageIcon, Loader2 } from 'lucide-react'
import { uploadFile } from '@/lib/storage'

interface Props {
  value: string
  storagePath: string
  label?: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, storagePath, label = 'Imagen', onChange }: Props) {
  const [uploading, setUploading] = useState(false)
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
        className="relative w-full aspect-video bg-[#1a1510] border border-[#3a2e1e] rounded-sm overflow-hidden cursor-pointer hover:border-[#c9a96e]/50 transition-all group"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
      >
        {value ? (
          <>
            <img src={value} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0d0b08]/0 group-hover:bg-[#0d0b08]/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-[11px] tracking-widest text-white uppercase">Cambiar imagen</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#6a5a40] group-hover:text-[#8a7a60] transition-colors">
            <ImageIcon size={24} />
            <span className="text-[11px] tracking-widest uppercase">Arrastra o haz clic para subir</span>
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
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}
