import { Routes, Route } from 'react-router-dom'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminChaptersPage from './AdminChaptersPage'
import AdminBlogPage from './AdminBlogPage'
import AdminCharactersPage from './AdminCharactersPage'
import AdminFragmentsPage from './AdminFragmentsPage'
import AdminExtrasPage from './AdminExtrasPage'
import AdminSettingsPage from './AdminSettingsPage'

export default function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="capitulos/*" element={<AdminChaptersPage />} />
        <Route path="blog/*" element={<AdminBlogPage />} />
        <Route path="personajes/*" element={<AdminCharactersPage />} />
        <Route path="fragmentos/*" element={<AdminFragmentsPage />} />
        <Route path="extras/*" element={<AdminExtrasPage />} />
        <Route path="configuracion" element={<AdminSettingsPage />} />
      </Routes>
    </AdminLayout>
  )
}
