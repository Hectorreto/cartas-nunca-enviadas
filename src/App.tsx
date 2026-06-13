import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import AuthModal from '@/components/auth/AuthModal'
import HomePage from '@/pages/HomePage'
import ChaptersPage from '@/pages/ChaptersPage'
import CharactersPage from '@/pages/CharactersPage'
import FragmentsPage from '@/pages/FragmentsPage'
import ReaderPage from '@/pages/ReaderPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

export default function App() {
  const setSession = useAuthStore((s) => s.setSession)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    )
    return () => listener.subscription.unsubscribe()
  }, [setSession])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/capitulos" element={<ChaptersPage />} />
          <Route path="/personajes" element={<CharactersPage />} />
          <Route path="/fragmentos" element={<FragmentsPage />} />
          <Route path="/leer/:chapterId" element={<ReaderPage />} />
        </Routes>
        <AuthModal />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
