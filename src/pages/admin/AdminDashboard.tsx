import { BookOpen, FileText, Users, Image, Package, MessageSquare, Settings, GalleryHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const sections = [
  { to: '/admin/capitulos',  label: 'Capítulos',   icon: BookOpen,      description: 'Sube y gestiona los capítulos del webtoon.' },
  { to: '/admin/blog',       label: 'Blog',        icon: FileText,      description: 'Escribe y edita las entradas del blog.' },
  { to: '/admin/personajes', label: 'Personajes',  icon: Users,         description: 'Gestiona los personajes de la historia.' },
  { to: '/admin/fragmentos', label: 'Fragmentos',  icon: Image,         description: 'Añade escenas y momentos destacados.' },
  { to: '/admin/extras',         label: 'Extras',          icon: Package,            description: 'Arte conceptual, wallpapers y más.' },
  { to: '/admin/carrusel',       label: 'Carrusel',        icon: GalleryHorizontal,  description: 'Gestiona los slides del banner principal.' },
  { to: '/admin/configuracion', label: 'Configuración',   icon: Settings,           description: 'Imagen hero, tráiler y playlist de la home.' },
]

export default function AdminDashboard() {
  const profile = useAuthStore((s) => s.profile)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-[#f0e0c0] mb-1">
          Hola, {profile?.username ?? 'admin'} 👋
        </h1>
        <p className="text-[13px] text-[#8a7a60]">¿Qué quieres actualizar hoy?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ to, label, icon: Icon, description }) => (
          <Link
            key={to}
            to={to}
            className="group bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-5 hover:border-[#c9a96e]/50 transition-all"
          >
            <div className="w-9 h-9 rounded-sm bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-all">
              <Icon size={16} className="text-[#c9a96e]" />
            </div>
            <p className="text-[13px] font-medium text-[#d4c4a0] mb-1 group-hover:text-[#c9a96e] transition-colors">
              {label}
            </p>
            <p className="text-[11px] text-[#8a7a60] leading-relaxed">{description}</p>
          </Link>
        ))}

        <div className="bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-5 opacity-60">
          <div className="w-9 h-9 rounded-sm bg-[#3a2e1e] flex items-center justify-center mb-4">
            <MessageSquare size={16} className="text-[#6a5a40]" />
          </div>
          <p className="text-[13px] font-medium text-[#8a7a60] mb-1">Comentarios</p>
          <p className="text-[11px] text-[#6a5a40] leading-relaxed">Moderación de comentarios — próximamente.</p>
        </div>
      </div>
    </div>
  )
}
