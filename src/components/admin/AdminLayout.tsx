import type { ReactNode } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BookOpen, FileText, Users, Image, Package, LayoutDashboard, ExternalLink, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const navItems = [
  { to: '/admin',            label: 'Dashboard',   icon: LayoutDashboard, end: true },
  { to: '/admin/capitulos',  label: 'Capítulos',   icon: BookOpen },
  { to: '/admin/blog',       label: 'Blog',        icon: FileText },
  { to: '/admin/personajes', label: 'Personajes',  icon: Users },
  { to: '/admin/fragmentos', label: 'Fragmentos',  icon: Image },
  { to: '/admin/extras',     label: 'Extras',      icon: Package },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0b08] flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-[#3a2e1e] flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#3a2e1e]">
          <p className="font-serif italic text-lg text-[#c9a96e] leading-none">Cartas</p>
          <p className="text-[9px] tracking-[0.15em] text-[#8a7a60] uppercase mt-0.5">Panel de admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[9px] tracking-[0.2em] text-[#6a5a40] uppercase px-2 mb-2">Contenido</p>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-sm text-[12px] transition-all ${
                  isActive
                    ? 'bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/20'
                    : 'text-[#8a7a60] hover:text-[#d4c4a0] hover:bg-[#1a1510]'
                }`
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-[#3a2e1e] space-y-0.5">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-[12px] text-[#8a7a60] hover:text-[#d4c4a0] hover:bg-[#1a1510] transition-all"
          >
            <ExternalLink size={14} /> Ver sitio
          </Link>
          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-[12px] text-[#8a7a60] hover:text-[#d4c4a0] hover:bg-[#1a1510] transition-all"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
