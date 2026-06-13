import { useAuthStore } from '@/store/authStore'

export function useIsAdmin() {
  return useAuthStore((s) => s.profile?.role === 'admin')
}
