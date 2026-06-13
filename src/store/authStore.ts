import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'

export interface UserProfile {
  role: 'reader' | 'admin'
  username: string
  avatar_url: string | null
}

interface AuthStore {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  setSession: (session: Session | null) => void
  setProfile: (profile: UserProfile | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  profile: null,
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setProfile: (profile) => set({ profile }),
}))
