import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useIsAdmin } from '@/hooks/useIsAdmin'

export function RequireAuth({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Navigate to="/" replace />
  return <>{children}</>
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const isAdmin = useIsAdmin()

  if (!user) return <Navigate to="/" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}
