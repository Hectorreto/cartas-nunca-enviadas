import { Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'INICIO' },
  { to: '/capitulos', label: 'CAPÍTULOS' },
  { to: '/personajes', label: 'PERSONAJES' },
  { to: '/fragmentos', label: 'FRAGMENTOS' },
  { to: '/extras', label: 'EXTRAS' },
  { to: '/blog', label: 'BLOG' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0d0b08]/95 backdrop-blur border-b border-[#3a2e1e]">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-8 h-16">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <p className="font-serif italic text-2xl text-[#c9a96e] leading-none">Cartas</p>
          <p className="text-[9px] tracking-[0.2em] text-[#8a7a60] uppercase leading-none mt-0.5">
            que nunca fueron enviadas
          </p>
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-[11px] tracking-[0.15em] font-medium transition-colors ${
                  isActive
                    ? 'text-[#c9a96e] border-b border-[#c9a96e] pb-0.5'
                    : 'text-[#8a7a60] hover:text-[#d4c4a0]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Search + Auth */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden md:flex items-center gap-2 bg-[#1a1510] border border-[#3a2e1e] rounded px-3 py-1.5">
            <Search size={14} className="text-[#8a7a60]" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent text-[13px] text-[#d4c4a0] placeholder-[#8a7a60] outline-none w-32"
            />
          </div>
          <button className="text-[11px] tracking-widest text-[#8a7a60] hover:text-[#d4c4a0] transition-colors uppercase">
            Iniciar Sesión
          </button>
          <button className="text-[11px] tracking-widest bg-transparent border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0d0b08] transition-all px-4 py-1.5 uppercase">
            Regístrate
          </button>
        </div>
      </div>
    </header>
  )
}
