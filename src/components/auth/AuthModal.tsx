import { useEffect, useRef, useState } from 'react'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useUiStore } from '@/store/uiStore'

export default function AuthModal() {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal } = useUiStore()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAuthModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeAuthModal])

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = authModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [authModalOpen])

  if (!authModalOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) closeAuthModal() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-[#1a1510] border border-[#3a2e1e] rounded-sm shadow-2xl">
        {/* Close */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-[#8a7a60] hover:text-[#d4c4a0] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#3a2e1e] text-center">
          <p className="font-serif italic text-xl text-[#c9a96e]">Cartas</p>
          <p className="text-[9px] tracking-[0.2em] text-[#8a7a60] uppercase mt-0.5">
            que nunca fueron enviadas
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#3a2e1e]">
          {(['login', 'register'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => openAuthModal(tab)}
              className={`flex-1 py-3 text-[11px] tracking-widest uppercase transition-all ${
                authModalTab === tab
                  ? 'text-[#c9a96e] border-b-2 border-[#c9a96e] -mb-px'
                  : 'text-[#8a7a60] hover:text-[#d4c4a0]'
              }`}
            >
              {tab === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* key resets error/success/showPassword on tab switch */}
        <ModalForms key={authModalTab} />
      </div>
    </div>
  )
}

function ModalForms() {
  const { authModalTab, closeAuthModal } = useUiStore()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(
        error.message.includes('Invalid login')
          ? 'Email o contraseña incorrectos.'
          : error.message
      )
    } else {
      closeAuthModal()
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const username = (form.elements.namedItem('username') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    setLoading(false)
    if (error) {
      setError(
        error.message.includes('already registered')
          ? 'Este email ya está en uso.'
          : error.message
      )
    } else {
      setSuccess('Revisa tu email para confirmar tu cuenta.')
    }
  }

  return (
    <div className="px-8 py-6">
      {/* Error / Success */}
      {error && (
        <p className="mb-4 text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="mb-4 text-[12px] text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-sm px-3 py-2">
          {success}
        </p>
      )}

      {/* Login form */}
      {authModalTab === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4">
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="tu@email.com"
            />
          </Field>
          <Field label="Contraseña">
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                className={`${inputClass} pr-10`}
                placeholder="••••••••"
              />
              <PasswordToggle show={showPassword} onToggle={() => setShowPassword((v) => !v)} />
            </div>
          </Field>
          <SubmitButton loading={loading}>Iniciar sesión</SubmitButton>
        </form>
      )}

      {/* Register form */}
      {authModalTab === 'register' && !success && (
        <form onSubmit={handleRegister} className="space-y-4">
          <Field label="Nombre de usuario">
            <input
              name="username"
              type="text"
              required
              minLength={3}
              autoComplete="username"
              className={inputClass}
              placeholder="LectoraNocturna"
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="tu@email.com"
            />
          </Field>
          <Field label="Contraseña">
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                autoComplete="new-password"
                className={`${inputClass} pr-10`}
                placeholder="Mínimo 6 caracteres"
              />
              <PasswordToggle show={showPassword} onToggle={() => setShowPassword((v) => !v)} />
            </div>
          </Field>
          <SubmitButton loading={loading}>Crear cuenta</SubmitButton>
        </form>
      )}
    </div>
  )
}

const inputClass =
  'w-full bg-[#0d0b08] border border-[#3a2e1e] text-[#d4c4a0] text-[13px] px-3 py-2.5 rounded-sm outline-none placeholder-[#6a5a40] focus:border-[#c9a96e] transition-colors'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest text-[#8a7a60] uppercase mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function PasswordToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7a60] hover:text-[#d4c4a0] transition-colors"
    >
      {show ? <EyeOff size={14} /> : <Eye size={14} />}
    </button>
  )
}

function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-2.5 bg-[#c9a96e] text-[#0d0b08] text-[11px] tracking-widest uppercase font-medium hover:bg-[#e8c98a] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
    >
      {loading && <Loader2 size={13} className="animate-spin" />}
      {children}
    </button>
  )
}
