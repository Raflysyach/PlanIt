import { Check, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const packages = [
  {
    id: 1,
    tag: '🔥 Hot Deal',
    tagColor: 'bg-orange-100 text-orange-600',
    name: 'Intimate Wedding Package',
    org: 'Le Blanc Hall + Elegant WO',
    discount: '-20%',
    price: 'Rp 35.000.000',
    priceNum: 35000000,
    original: 'Rp 44.000.000',
    features: ['Venue for 150 guests', 'Full decoration & lighting', 'MC + Photography', 'Catering included'],
    venueId: 1,
    organizerId: 1,
  },
  {
    id: 2,
    tag: '✨ New',
    tagColor: 'bg-green-100 text-green-600',
    name: 'Birthday Blast Package',
    org: 'Groovy Venue + Party Planner',
    discount: '-15%',
    price: 'Rp 18.500.000',
    priceNum: 18500000,
    original: 'Rp 21.800.000',
    features: ['Venue for 80 guests', 'Balloon & theme decoration', 'Entertainment + DJ', 'Birthday cake included'],
    venueId: 3,
    organizerId: 2,
  },
  {
    id: 3,
    tag: '🏷️ Promo',
    tagColor: 'bg-purple-100 text-purple-600',
    name: 'Corporate Seminar Package',
    org: 'Pullman Hotel + ProEvent',
    discount: '-25%',
    price: 'Rp 28.000.000',
    priceNum: 28000000,
    original: 'Rp 37.500.000',
    features: ['Ballroom for 300 pax', 'AV & presentation setup', 'Professional MC', 'Coffee break & lunch'],
    venueId: 2,
    organizerId: 6,
  },
]

const packageImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80',
]

function PackageSection() {
  const navigate = useNavigate()

  return (
    <section className="px-20 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Package deals
          </h2>
          <p className="text-gray-500 text-sm">Bundled venue + organizer packages at special prices.</p>
        </div>
        <a
          onClick={() => navigate('/venues')}
          className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
        >
          See all →
        </a>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
          >
            {/* Thumb */}
            <div className="relative h-40 overflow-hidden rounded-t-2xl">
              <img
                src={packageImages[pkg.id - 1]}
                alt={pkg.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {pkg.discount}
              </span>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
              <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 ${pkg.tagColor}`}>
                {pkg.tag}
              </span>
              <div className="font-black text-gray-900 text-lg mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {pkg.name}
              </div>
              <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                🏢 {pkg.org}
              </div>

              <ul className="space-y-2 mb-5 flex-1">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={14} className="text-[#6DB6E3] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-400">Start from</div>
                  <div className="text-xl font-black text-blue-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {pkg.price}
                  </div>
                  <div className="text-xs text-gray-400 line-through">{pkg.original}</div>
                </div>
                <button
                  onClick={() => navigate(`/checkout?type=venue&itemId=${pkg.venueId}&package=${encodeURIComponent(pkg.name)}&price=${pkg.priceNum}`)}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all"
                >
                  Book Now <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PackageSection