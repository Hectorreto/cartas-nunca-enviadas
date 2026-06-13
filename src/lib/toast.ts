import { useToastStore } from '@/store/toastStore'

export const toast = {
  success: (message: string) => useToastStore.getState().add(message, 'success'),
  error: (message: string) => useToastStore.getState().add(message, 'error'),
}
