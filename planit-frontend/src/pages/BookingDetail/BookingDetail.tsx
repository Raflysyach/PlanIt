import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { CalendarDays, MapPin, Users, CreditCard, MessageCircle, ArrowLeft, Star, Package, Hash } from 'lucide-react'
import { bookingsService } from '../../services/bookings.service'

const categoryImages: Record<string, string[]> = {
  Wedding: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80'],
  Birthday: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80'],
  Seminar: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80'],
  Concert: ['https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80'],
  Photoshoot: ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80'],
  Corporate: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80'],
}

const getImage = (category: string) => {
  return categoryImages[category]?.[0] || categoryImages['Wedding'][0]
}

const statusColor: Record<string, string> = {
  Ongoing: 'bg-blue-100 text-blue-600',
  Completed: 'bg-green-100 text-green-600',
  Cancelled: 'bg-red-100 text-red-500',
}

interface Booking {
  id: number
  eventName: string
  eventDate: string
  eventLocation: string
  guests: number
  notes: string
  packageName: string
  totalPrice: number
  dpAmount: number
  status: string
  paymentMethod: string
  bookingCode: string
  createdAt: string
  venue?: { id: number; name: string; location: string; category: string }
  organizer?: { id: number; name: string; location: string; category: string }
}

function BookingDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooking()
  }, [id])

  const fetchBooking = async () => {
    try {
      setLoading(true)
      const data = await bookingsService.getOne(Number(id))
      setBooking(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div>
        <Navbar />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <div className="font-bold text-gray-900 text-xl mb-2">Booking not found</div>
            <button onClick={() => navigate('/my-bookings')} className="text-blue-600 hover:underline">
              Back to My Bookings
            </button>
          </div>
        </div>
      </div>
    )
  }

  const item = booking.venue || booking.organizer
  const itemType = booking.venue ? 'Venue' : 'Event Organizer'
  const remaining = Number(booking.totalPrice) - Number(booking.dpAmount)

  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">

        {/* Hero */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {item && (
            <img
              src={getImage(item.category)}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end px-8 pb-6">
            <button
              onClick={() => navigate('/my-bookings')}
              className="absolute top-6 left-8 flex items-center gap-2 text-white hover:text-gray-200 transition-all"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block ${statusColor[booking.status]}`}>
                {booking.status}
              </span>
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {item?.name || booking.eventName}
              </h1>
              <div className="text-white/80 text-sm">{itemType} · {booking.packageName}</div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="grid grid-cols-3 gap-6">

            {/* LEFT — Booking Info */}
            <div className="col-span-2 space-y-5">

              {/* Event Details */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="font-black text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Event Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <CalendarDays size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Event Date</div>
                      <div className="font-semibold text-gray-900 text-sm">{booking.eventDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MapPin size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Location</div>
                      <div className="font-semibold text-gray-900 text-sm">{booking.eventLocation}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Users size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Guests</div>
                      <div className="font-semibold text-gray-900 text-sm">{booking.guests} guests</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Package size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Package</div>
                      <div className="font-semibold text-gray-900 text-sm">{booking.packageName}</div>
                    </div>
                  </div>
                </div>
                {booking.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">Notes</div>
                    <div className="text-sm text-gray-700">{booking.notes}</div>
                  </div>
                )}
              </div>

              {/* Payment Info */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="font-black text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Payment Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{booking.packageName}</span>
                    <span className="font-semibold">Rp {Number(booking.totalPrice).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">DP Paid (30%)</span>
                    <span className="font-semibold text-green-600">- Rp {Number(booking.dpAmount).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Remaining Payment</span>
                    <span className="font-black text-blue-600">Rp {remaining.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <CreditCard size={13} />
                    <span>Paid via {booking.paymentMethod}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT — Summary & Actions */}
            <div className="space-y-4">

              {/* Booking Code */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Hash size={16} className="text-blue-600" />
                  <span className="font-bold text-gray-900 text-sm">Booking Code</span>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                  <div className="font-black text-gray-900 tracking-wider text-sm">{booking.bookingCode}</div>
                </div>
              </div>

              {/* Vendor Info */}
              {item && (
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="font-bold text-gray-900 text-sm mb-3">{itemType}</div>
                  <div className="font-black text-gray-900 mb-1">{item.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                    <MapPin size={11} /> {item.location}
                  </div>
                  <button
                    onClick={() => navigate(`/detail/${item.id}?type=${booking.venue ? 'venue' : 'organizer'}`)}
                    className="w-full text-xs font-semibold text-blue-600 border border-blue-200 rounded-xl py-2 hover:bg-blue-50 transition-all"
                  >
                    View Profile →
                  </button>
                </div>
              )}

              {/* Actions */}
              {booking.status === 'Ongoing' && (
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/chat')}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                  >
                    <MessageCircle size={15} /> Chat with {itemType}
                  </button>
                </div>
              )}

              {booking.status === 'Completed' && (
                <button
                  onClick={() => navigate(`/detail/${item?.id}?type=${booking.venue ? 'venue' : 'organizer'}`)}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 font-bold py-3 rounded-xl transition-all text-sm border border-yellow-200"
                >
                  <Star size={15} /> Leave a Review
                </button>
              )}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BookingDetail