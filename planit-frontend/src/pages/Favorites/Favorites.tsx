import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Heart, MapPin, Star, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const categoryImages: Record<string, string[]> = {
  Wedding: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
  ],
  Birthday: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80'],
  Seminar: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80'],
  Concert: ['https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80'],
  Photoshoot: ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80'],
  Corporate: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80'],
}

const getImage = (category: string, id: number) => {
  const images = categoryImages[category] || categoryImages['Wedding']
  return images[id % images.length]
}

const dummyFavorites = [
  { id: 1, name: 'Le Blanc Wedding Hall', type: 'Venue', category: 'Wedding', location: 'BSD, Tangerang', price: 18000000, rating: 4.9, reviewCount: 97 },
  { id: 2, name: 'Groovy Garden Venue', type: 'Venue', category: 'Wedding', location: 'Bogor', price: 22000000, rating: 4.7, reviewCount: 84 },
  { id: 3, name: 'Lumière Photo Studio', type: 'Event Organizer', category: 'Photoshoot', location: 'Bandung', price: 5000000, rating: 4.9, reviewCount: 312 },
  { id: 4, name: 'Stellar Concert Production', type: 'Event Organizer', category: 'Concert', location: 'Jakarta', price: 45000000, rating: 4.6, reviewCount: 156 },
]

function Favorites() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [favorites, setFavorites] = useState(dummyFavorites)
  const [activeTab, setActiveTab] = useState<'all' | 'venue' | 'organizer'>('all')

  const filtered = favorites.filter(f => {
    if (activeTab === 'all') return true
    if (activeTab === 'venue') return f.type === 'Venue'
    return f.type === 'Event Organizer'
  })

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-[#EBF5FC] rounded-full flex items-center justify-center mx-auto mb-5">
              <LogIn size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Sign in to view favorites
            </h2>
            <p className="text-gray-500 text-sm mb-6">Log in to see your saved venues & organizers.</p>
            <button onClick={() => navigate('/auth/login')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
              Log in
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              My Favorites
            </h1>
            <p className="text-gray-500 text-sm">Venues & organizers you've saved</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit">
            {(['all', 'venue', 'organizer'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all
                  ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab === 'all' ? 'All' : tab === 'venue' ? 'Venues' : 'Organizers'}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">❤️</div>
              <div className="font-bold text-gray-600 text-lg mb-1">No favorites yet</div>
              <div className="text-gray-400 text-sm mb-6">Start saving venues & organizers you like!</div>
              <button onClick={() => navigate('/venues')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Browse Venues
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={getImage(item.category, item.id)}
                      alt={item.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => navigate(`/detail/${item.id}?type=${item.type === 'Venue' ? 'venue' : 'organizer'}`)}
                    />
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
                    >
                      <Heart size={14} className="fill-red-500 text-red-500" />
                    </button>
                    <span className="absolute top-3 left-3 text-xs font-semibold bg-white/90 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                      {item.type}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={13} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                      <span className="text-xs text-gray-400">· {item.reviewCount} reviews</span>
                    </div>
                    <div className="font-bold text-gray-900 mb-1">{item.name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                      <MapPin size={11} /> {item.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-400">Start from</div>
                        <div className="font-black text-blue-600">Rp {item.price.toLocaleString('id-ID')}</div>
                      </div>
                      <button
                        onClick={() => navigate(`/detail/${item.id}?type=${item.type === 'Venue' ? 'venue' : 'organizer'}`)}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Favorites