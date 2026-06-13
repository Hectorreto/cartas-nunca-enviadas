import { create } from 'zustand'

interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error'
}

interface ToastStore {
  toasts: ToastItem[]
  add: (message: string, type: 'success' | 'error') => void
  remove: (id: string) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  add: (message, type) => {
    const id = crypto.randomUUID()
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
    setTimeout(() => get().remove(id), 3500)
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
