import { Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function CTASection() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  return (
    <section className="px-20 py-16">
      <div className="bg-gray-50 border border-gray-200 rounded-3xl px-16 py-20 text-center">
        
        <div className="w-16 h-16 bg-[#EBF5FC] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles size={28} className="text-blue-600" />
        </div>

        <h2 className="font-black text-4xl text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Ready to plan your next event?
        </h2>
        <p className="text-gray-500 text-base mb-8 max-w-md mx-auto leading-relaxed">
          Join PlanIt today and book your perfect venue and organizer in minutes. No hidden fees. Cancel anytime.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(isLoggedIn ? '/venues' : '/auth/signup')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Sparkles size={16} />
            Get started — it's free
          </button>
          <button
            onClick={() => navigate('/venues')}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-7 py-3.5 rounded-xl transition-all hover:bg-gray-50"
          >
            Browse venues <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  )
}

export default CTASection