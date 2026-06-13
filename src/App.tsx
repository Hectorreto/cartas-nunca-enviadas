import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { RequireAdmin } from '@/components/ProtectedRoute'
import AuthModal from '@/components/auth/AuthModal'
import HomePage from '@/pages/HomePage'
import ChaptersPage from '@/pages/ChaptersPage'
import CharactersPage from '@/pages/CharactersPage'
import FragmentsPage from '@/pages/FragmentsPage'
import BlogPage from '@/pages/BlogPage'
import BlogPostPage from '@/pages/BlogPostPage'
import ExtrasPage from '@/pages/ExtrasPage'
import ReaderPage from '@/pages/ReaderPage'
import AdminPage from '@/pages/admin/AdminPage'
import Toaster from '@/components/ui/Toaster'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
})

export default function App() {
  const { setSession, setProfile, setAuthReady } = useAuthStore()

  useEffect(() => {
    async function fetchProfile(userId: string) {
      const { data } = await supabase
        .from('profiles')
        .select('role, username, avatar_url')
        .eq('id', userId)
        .single()
      if (data) setProfile({ role: data.role ?? 'reader', username: data.username, avatar_url: data.avatar_url })
    }

    async function initAuth() {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      if (data.session?.user) await fetchProfile(data.session.user.id)
      setAuthReady()
    }

    initAuth()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [setSession, setProfile, setAuthReady])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/capitulos" element={<ChaptersPage />} />
          <Route path="/personajes" element={<CharactersPage />} />
          <Route path="/fragmentos" element={<FragmentsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/extras" element={<ExtrasPage />} />
          <Route path="/leer/:chapterId" element={<ReaderPage />} />
          <Route path="/admin/*" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
        </Routes>
        <AuthModal />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
