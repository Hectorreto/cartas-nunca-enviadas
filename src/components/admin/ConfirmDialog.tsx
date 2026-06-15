import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface Props {
  open: boolean
  title: string
  description?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, title, description, loading, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0b08]/80 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm mx-4 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-serif text-[#f0e0c0] text-lg leading-snug">{title}</p>
        {description && (
          <p className="text-[12px] text-[#6a5a40] mt-2">{description}</p>
        )}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-[11px] tracking-widest uppercase text-[#8a7a60] border border-[#3a2e1e] hover:border-[#6a5a40] hover:text-[#d4c4a0] transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-widest uppercase bg-red-900/40 text-red-400 border border-red-900/60 hover:bg-red-900/60 hover:text-red-300 transition-all disabled:opacity-50"
          >
            {loading && <Loader2 size={12} className="animate-spin" />}
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
