import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { CalendarDays, MapPin, ChevronRight, Search, Star, MessageCircle, LogIn } from 'lucide-react'
import { bookingsService } from '../../services/bookings.service'
import { useAuth } from '../../context/AuthContext'

const statusColor: Record<string, string> = {
  Ongoing: 'bg-blue-100 text-blue-600',
  Completed: 'bg-green-100 text-green-600',
  Cancelled: 'bg-red-100 text-red-500',
}

const categoryImages: Record<string, string[]> = {
  Wedding: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200&q=80',
  ],
  Birthday: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&q=80',
  ],
  Seminar: [
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=200&q=80',
  ],
  Concert: [
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&q=80',
  ],
  Photoshoot: [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&q=80',
  ],
  Corporate: [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=200&q=80',
  ],
}

const getImage = (category: string, id: number) => {
  const images = categoryImages[category] || categoryImages['Wedding']
  return images[id % images.length]
}

type TabType = 'all' | 'ongoing' | 'completed' | 'cancelled'

interface Booking {
  id: number
  eventName: string
  eventDate: string
  eventLocation: string
  packageName: string
  totalPrice: number
  dpAmount: number
  status: string
  paymentMethod: string
  bookingCode: string
  venue?: { id: number; name: string; location: string; category: string }
  organizer?: { id: number; name: string; location: string; category: string }
}

function MyBookings() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('all')

  useEffect(() => {
    if (isLoggedIn) fetchBookings()
    else setLoading(false)
  }, [isLoggedIn])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const data = await bookingsService.getMyBookings()
      setBookings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = bookings.filter((b) => {
    if (activeTab === 'all') return true
    return b.status.toLowerCase() === activeTab
  })

  // Belum login
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
              Sign in to view your bookings
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Log in or create an account to see your booking history.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/auth/login')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Log in
              </button>
              <button onClick={() => navigate('/auth/signup')} className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all">
                Sign up
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Loading
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-gray-500 text-sm">Loading bookings...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Sudah login tapi belum ada booking
  if (bookings.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="text-6xl mb-5">📋</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              No bookings yet
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              You haven't made any bookings yet. Start exploring!
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/venues')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
                <Search size={15} /> Browse Venues
              </button>
              <button onClick={() => navigate('/event-organizers')} className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all">
                Find Organizers
              </button>
            </div>
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
        <div className="max-w-4xl mx-auto px-8 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              My Bookings
            </h1>
            <p className="text-gray-500 text-sm">Manage and track all your event bookings</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit">
            {(['all', 'ongoing', 'completed', 'cancelled'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all
                  ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Booking List */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📭</div>
                <div className="font-bold text-gray-600">No bookings in this category</div>
              </div>
            ) : (
              filtered.map((booking) => {
                const item = booking.venue || booking.organizer
                const itemType = booking.venue ? 'Venue' : 'Event Organizer'
                return (
                  <div key={booking.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="flex">
                      {/* Thumb */}
                      <div className="w-32 flex-shrink-0 overflow-hidden">
                        {item ? (
                          <img
                            src={getImage(item.category, item.id)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-3xl">📋</div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-gray-400">{itemType}</span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor[booking.status]}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="font-black text-gray-900 text-lg mb-0.5" style={{ fontFamily: 'Nunito, sans-serif' }}>
                              {item?.name || booking.eventName}
                            </div>
                            <div className="text-sm text-gray-500 mb-3">{booking.packageName}</div>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1"><CalendarDays size={12} /> {booking.eventDate}</span>
                              <span className="flex items-center gap-1"><MapPin size={12} /> {booking.eventLocation}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <div className="text-xs text-gray-400 mb-0.5">Total</div>
                            <div className="font-black text-gray-900">Rp {Number(booking.totalPrice).toLocaleString('id-ID')}</div>
                            <div className="text-xs text-blue-600 font-semibold">DP: Rp {Number(booking.dpAmount).toLocaleString('id-ID')}</div>
                            <div className="text-xs text-gray-400 mt-1">#{booking.bookingCode}</div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                          {booking.status === 'Ongoing' && (
                            <>
                              <button
                                onClick={() => navigate('/chat')}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                              >
                                <MessageCircle size={13} /> Chat
                              </button>
                              <button
                                onClick={() => navigate(`/booking/${booking.id}`)}
                                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                              >
                                View Details <ChevronRight size={13} />
                              </button>
                            </>
                          )}
                          {booking.status === 'Completed' && (
                            <>
                              <button className="flex items-center gap-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 text-xs font-bold px-4 py-2 rounded-lg transition-all border border-yellow-200">
                                <Star size={13} /> Leave a Review
                              </button>
                              <button
                                onClick={() => navigate(booking.venue ? `/detail/${booking.venue.id}?type=venue` : `/detail/${booking.organizer?.id}?type=organizer`)}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                              >
                                Book Again
                              </button>
                            </>
                          )}
                          {booking.status === 'Cancelled' && (
                            <button
                              onClick={() => navigate(`/booking/${booking.id}`)}
                              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                            >
                              View Details <ChevronRight size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyBookings