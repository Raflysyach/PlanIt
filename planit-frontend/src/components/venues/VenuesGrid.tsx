import { useState, useEffect } from 'react'
import { MapPin, Star, Heart, ChevronDown } from 'lucide-react'
import { venuesService } from '../../services/venues.service'
import { useNavigate } from 'react-router-dom'

const badgeColor: Record<string, string> = {
  Popular: 'bg-blue-600',
  Premium: 'bg-yellow-600',
  New: 'bg-green-600',
}

const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Most Reviewed']

const categoryImages: Record<string, string[]> = {
  Wedding: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  ],
  Birthday: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  ],
  Seminar: [
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
  ],
  Concert: [
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
  ],
  Photoshoot: [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80',
    'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&q=80',
  ],
  Corporate: [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  ],
}

const getImage = (category: string, id: number) => {
  const images = categoryImages[category] || categoryImages['Wedding']
  return images[id % images.length]
}
interface Venue {
  id: number
  name: string
  location: string
  category: string
  price: number
  badge: string
  emoji: string
  capacity: string
  rating: number
  reviewCount: number
}

interface Props {
  category: string
  locations: string[]
  ratings: string[]
  capacities: string[]
  price: number
}

function VenuesGrid({ category, locations, ratings, capacities, price }: Props) {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('Recommended')
  const [showSort, setShowSort] = useState(false)
  const [wished, setWished] = useState<number[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchVenues()
  }, [category])

  const fetchVenues = async () => {
    try {
      setLoading(true)
      const data = await venuesService.getAll({
        category: category !== 'All' ? category : undefined,
      })
      setVenues(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = venues.filter((v) => {
    if (locations.length > 0 && !locations.some((l) => v.location.includes(l))) return false
    if (v.price > price * 1000000) return false
    if (capacities.length > 0 && !capacities.includes(v.capacity)) return false
    if (ratings.length > 0) {
      const minRating = ratings.includes('4.5+ stars') ? 4.5 : ratings.includes('4+ stars') ? 4 : 3.5
      if (v.rating < minRating) return false
    }
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Price: Low to High') return a.price - b.price
    if (sort === 'Price: High to Low') return b.price - a.price
    if (sort === 'Top Rated') return b.rating - a.rating
    if (sort === 'Most Reviewed') return b.reviewCount - a.reviewCount
    return 0
  })

  const toggleWish = (id: number) => {
    setWished((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id])
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <div className="text-gray-500 text-sm">Loading venues...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-bold text-gray-900 text-lg">{sorted.length} results</span>
          <span className="text-gray-500 text-sm ml-2">Showing all venues</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 transition-all"
          >
            Sort: {sort} <ChevronDown size={14} />
          </button>
          {showSort && (
            <div className="absolute right-0 top-11 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden min-w-[200px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSort(opt); setShowSort(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-all
                    ${sort === opt ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <div className="font-bold text-lg text-gray-600 mb-1">No venues found</div>
          <div className="text-sm">Try adjusting your filters</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {sorted.map((venue) => (
            <div
              key={venue.id}
              onClick={() => navigate(`/detail/${venue.id}?type=venue`)}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={getImage(venue.category, venue.id)}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {venue.badge && (
                  <span className={`absolute top-3 left-3 ${badgeColor[venue.badge]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {venue.badge}
                  </span>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWish(venue.id) }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
                >
                  <Heart size={14} className={wished.includes(venue.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Star size={13} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-gray-900">{venue.rating}</span>
                  <span className="text-xs text-gray-400">· {venue.reviewCount} reviews</span>
                </div>
                <div className="font-bold text-gray-900 mb-1 leading-tight">{venue.name}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                  <MapPin size={11} /> {venue.location}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Start from</div>
                    <div className="text-base font-black text-blue-600">
                      Rp {Number(venue.price).toLocaleString('id-ID')}
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-[#EBF5FC] text-[#4A9DD4] px-3 py-1 rounded-full">
                    {venue.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VenuesGrid