import { Sparkles, ShieldCheck, Star } from 'lucide-react'

const reasons = [
  {
    icon: Sparkles,
    title: 'All your needs prepared',
    desc: 'Search venues & EOs together — PlanIt lays out everything you need for the event in one place. Venue, organizer, catering, and more.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & secure payments',
    desc: 'Identity verification for both sides. Funds released to the venue only after the booking is confirmed, with digital contracts stored in-system.',
  },
  {
    icon: Star,
    title: 'Real reviews & ratings',
    desc: 'Transparent ratings from real customers help you choose trusted venues and avoid fraud. Every review is verified from actual bookings.',
  },
]

function WhySection() {
  return (
    <section className="px-20 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Why plan with PlanIt
        </h2>
        <p className="text-gray-500 text-sm">
          Built around three principles: discovery, trust, and transparency.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {reasons.map((reason, i) => {
          const Icon = reason.icon
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:border-[#6DB6E3] hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-5">
                <Icon size={22} className="text-white" />
              </div>
              <div className="font-black text-gray-900 text-lg mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {reason.title}
              </div>
              <div className="text-gray-500 text-sm leading-relaxed">
                {reason.desc}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default WhySection