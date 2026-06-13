import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/home/HeroSection'
import ChaptersSection from '@/components/home/ChaptersSection'
import ContinueReading from '@/components/home/ContinueReading'
import CharactersSection from '@/components/home/CharactersSection'
import Sidebar from '@/components/home/Sidebar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0b08]">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8">
          {/* Columna principal */}
          <main className="min-w-0">
            <HeroSection />
            <ChaptersSection />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContinueReading />
              <CharactersSection />
            </div>
          </main>

          {/* Sidebar */}
          <div className="lg:border-l lg:border-[#3a2e1e] lg:pl-8">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
