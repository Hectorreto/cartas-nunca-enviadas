import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useIsAdmin } from '@/hooks/useIsAdmin'

export function RequireAuth({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const authReady = useAuthStore((s) => s.authReady)

  if (!authReady) return null
  if (!user) return <Navigate to="/" replace />
  return <>{children}</>
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const authReady = useAuthStore((s) => s.authReady)
  const isAdmin = useIsAdmin()

  if (!authReady) return null
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}
