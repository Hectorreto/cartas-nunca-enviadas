import { CheckCircle, XCircle, X } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'

export default function Toaster() {
  const toasts = useToastStore((s) => s.toasts)
  const remove = useToastStore((s) => s.remove)

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-[300] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-sm border shadow-lg pointer-events-auto min-w-[280px] max-w-sm bg-[#1a1510] ${
            t.type === 'success'
              ? 'border-l-2 border-l-emerald-500 border-[#3a2e1e]'
              : 'border-l-2 border-l-red-500 border-[#3a2e1e]'
          }`}
        >
          {t.type === 'success' ? (
            <CheckCircle size={15} className="text-emerald-500 flex-shrink-0" />
          ) : (
            <XCircle size={15} className="text-red-500 flex-shrink-0" />
          )}
          <span className="text-[13px] text-[#d4c4a0] flex-1">{t.message}</span>
          <button onClick={() => remove(t.id)} className="text-[#6a5a40] hover:text-[#8a7a60] transition-colors">
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  )
}
