import { Link } from 'react-router-dom'

export default function ContinueReading() {
  return (
    <section>
      <h2 className="text-[11px] tracking-[0.25em] text-[#d4c4a0] uppercase mb-4">
        Continuar Leyendo
      </h2>
      <div className="flex gap-4 bg-[#1a1510] border border-[#3a2e1e] rounded-sm p-4">
        {/* Cover */}
        <div className="w-20 h-28 flex-shrink-0 bg-gradient-to-b from-[#2a1f10] to-[#1a1208] rounded-sm border border-[#3a2e1e]">
          <div className="w-full h-full flex items-end justify-start p-1.5">
            <span className="text-[9px] text-[#6a5a40] font-mono">CAP. 27</span>
          </div>
        </div>
        {/* Info */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <p className="text-[11px] text-[#8a7a60] mb-1">Leído por última vez</p>
            <p className="text-[14px] font-serif text-[#f0e0c0] leading-tight">
              La confesión que llegó tarde
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#8a7a60]">75%</span>
            </div>
            <div className="h-0.5 bg-[#3a2e1e] rounded-full overflow-hidden">
              <div className="h-full bg-[#c9a96e] w-3/4 rounded-full" />
            </div>
            <Link
              to="/leer/27"
              className="mt-3 inline-block px-5 py-1.5 border border-[#c9a96e] text-[10px] tracking-widest text-[#c9a96e] uppercase hover:bg-[#c9a96e] hover:text-[#0d0b08] transition-all"
            >
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
