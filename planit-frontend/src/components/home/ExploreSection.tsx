import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Heart, MapPin, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { venuesService } from '../../services/venues.service'
import { organizersService } from '../../services/organizers.service'

const categoryImages: Record<string, string[]> = {
  Wedding: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80',
  ],
  Birthday: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  ],
  Seminar: [
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80',
  ],
  Concert: [
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80',
  ],
  Photoshoot: [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&q=80',
  ],
  Corporate: [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80',
  ],
}

const getImage = (category: string, id: number) => {
  const images = categoryImages[category] || categoryImages['Wedding']
  return images[id % images.length]
}

const badgeColor: Record<string, string> = {
  Popular: 'bg-blue-600',
  Premium: 'bg-yellow-600',
  New: 'bg-green-600',
}

interface Item {
  id: number
  name: string
  location: string
  category: string
  price: number
  badge: string
  rating: number
  reviewCount: number
}

interface ExploreSectionProps {
  activeCategory: string
}

function Carousel({ items, type }: { items: Item[], type: 'venue' | 'organizer' }) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const [wished, setWished] = useState<number[]>([])

  const scroll = (dir: 'left' | 'right') => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  const toggleWish = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setWished(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-3">🔍</div>
          <div className="font-bold text-gray-500">No {type === 'venue' ? 'venues' : 'organizers'} found for this category</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={ref} className="flex gap-5 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/detail/${item.id}?type=${type}`)}
            className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={getImage(item.category, item.id)}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.badge && (
                <span className={`absolute top-3 left-3 ${badgeColor[item.badge]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {item.badge}
                </span>
              )}
              <span className="absolute top-3 right-10 text-xs font-semibold bg-white/90 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                {type === 'venue' ? 'Venue' : 'Event Organizer'}
              </span>
              <button
                onClick={(e) => toggleWish(e, item.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
              >
                <Heart size={14} className={wished.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-1">
                <Star size={13} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                <span className="text-xs text-gray-400">· {item.reviewCount} reviews</span>
              </div>
              <div className="font-bold text-gray-900 mb-1 leading-tight">{item.name}</div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <MapPin size={11} /> {item.location}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Start from</div>
                  <div className="text-base font-black text-blue-600">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </div>
                </div>
                <span className="text-xs font-semibold bg-[#EBF5FC] text-[#4A9DD4] px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all z-10"
      >
        <ChevronLeft size={18} className="text-gray-600" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all z-10"
      >
        <ChevronRight size={18} className="text-gray-600" />
      </button>
    </div>
  )
}

function ExploreSection({ activeCategory }: ExploreSectionProps) {
  const navigate = useNavigate()
  const [venues, setVenues] = useState<Item[]>([])
  const [organizers, setOrganizers] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      const [v, o] = await Promise.all([
        venuesService.getAll(),
        organizersService.getAll(),
      ])
      setVenues(v)
      setOrganizers(o)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredVenues = activeCategory === 'All'
    ? venues
    : venues.filter(v => v.category === activeCategory)

  const filteredOrganizers = activeCategory === 'All'
    ? organizers
    : organizers.filter(o => o.category === activeCategory)

  if (loading) {
    return (
      <section className="px-20 py-16 bg-gray-50">
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section className="px-20 py-16 bg-gray-50">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Explore deals for you
          </h2>
          <p className="text-gray-500 text-sm">Hand-picked venues & organizers, rated by real users.</p>
        </div>
      </div>

      {/* Venues */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
            🏛️ Venues
          </h3>
          <a onClick={() => navigate('/venues')} className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">
            See all →
          </a>
        </div>
        <Carousel items={filteredVenues} type="venue" />
      </div>

      {/* Event Organizers */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
            🎪 Event Organizers
          </h3>
          <a onClick={() => navigate('/event-organizers')} className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">
            See all →
          </a>
        </div>
        <Carousel items={filteredOrganizers} type="organizer" />
      </div>
    </section>
  )
}

export default ExploreSection