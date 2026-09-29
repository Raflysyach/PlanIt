import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function PromoBanner() {
  const navigate = useNavigate()

  const handleClaim = () => {
    navigator.clipboard.writeText('PLANIT26').catch(() => {})
    navigate('/venues')
  }

  return (
    <section className="px-20 py-6">
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-[#6DB6E3] rounded-3xl px-14 py-12 flex items-center justify-between overflow-hidden">
        
        <div className="absolute top-[-60px] left-[40%] w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-80px] right-28 w-64 h-64 bg-white/5 rounded-full" />

        {/* Left */}
        <div className="relative z-10">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest mb-4 inline-block">
            LIMITED TIME
          </span>
          <h2 className="font-black text-white text-3xl mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
            PROMO Event Package — Up to 100% OFF
          </h2>
          <p className="text-white/80 text-sm mb-4 max-w-lg">
            Use code <strong className="text-white">PLANIT26</strong> at checkout. Valid for wedding & birthday packages this month.
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText('PLANIT26').catch(() => {})
              alert('Code PLANIT26 copied! Use it at checkout.')
            }}
            className="inline-block bg-white/15 border border-dashed border-white/50 text-white text-sm font-black px-4 py-1.5 rounded-lg tracking-widest hover:bg-white/25 transition-all cursor-pointer"
          >
            PLANIT26 — click to copy
          </button>
        </div>

        {/* Right */}
        <div className="relative z-10 flex flex-col items-end gap-4 flex-shrink-0">
          <div className="text-right">
            <div className="font-black text-white leading-none" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '64px' }}>
              100%
            </div>
            <div className="text-white/75 text-sm">OFF selected packages</div>
          </div>
          <button
            onClick={handleClaim}
            className="flex items-center gap-2 bg-white text-blue-600 font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Claim now <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  )
}

export default PromoBanner