import { create } from 'zustand'

type AuthTab = 'login' | 'register'

interface UiStore {
  authModalOpen: boolean
  authModalTab: AuthTab
  openAuthModal: (tab?: AuthTab) => void
  closeAuthModal: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  authModalOpen: false,
  authModalTab: 'login',
  openAuthModal: (tab = 'login') => set({ authModalOpen: true, authModalTab: tab }),
  closeAuthModal: () => set({ authModalOpen: false }),
}))
