import type { ReactNode } from 'react'
import Navbar from './Navbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0b08]">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {children}
      </div>
    </div>
  )
}
