import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Bell, CheckCheck, CalendarDays, Star, MessageCircle, Tag } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

const notifications = [
  { id: 1, type: 'booking', icon: CalendarDays, color: 'bg-blue-100 text-blue-600', title: 'Booking Confirmed!', message: 'Your booking for Le Blanc Wedding Organizer has been confirmed.', time: '2 hours ago', read: false },
  { id: 2, type: 'review', icon: Star, color: 'bg-yellow-100 text-yellow-600', title: 'Leave a Review', message: 'How was your experience with Groovy Garden Venue? Share your review!', time: '1 day ago', read: false },
  { id: 3, type: 'chat', icon: MessageCircle, color: 'bg-green-100 text-green-600', title: 'New Message', message: 'Le Blanc Wedding Organizer sent you a message.', time: '2 days ago', read: true },
  { id: 4, type: 'promo', icon: Tag, color: 'bg-purple-100 text-purple-600', title: 'Special Promo!', message: 'Use code PLANIT26 to get up to 100% off selected packages this month!', time: '3 days ago', read: true },
  { id: 5, type: 'booking', icon: CalendarDays, color: 'bg-blue-100 text-blue-600', title: 'Booking Reminder', message: 'Your event with Party Planner Birthday Org. is coming up on 14 Jun 2026.', time: '4 days ago', read: true },
]

function Notifications() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [notifs, setNotifs] = useState(notifications)

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const unreadCount = notifs.filter(n => !n.read).length

  if (!isLoggedIn) {
    return (
      <div>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-[#EBF5FC] rounded-full flex items-center justify-center mx-auto mb-5">
              <Bell size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Sign in to view notifications
            </h2>
            <p className="text-gray-500 text-sm mb-6">Log in to see your notifications.</p>
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
        <div className="max-w-2xl mx-auto px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Notifications
              </h1>
              <p className="text-gray-500 text-sm">{unreadCount} unread notifications</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:underline"
              >
                <CheckCheck size={16} /> Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-3">
            {notifs.map((notif) => {
              const Icon = notif.icon
              return (
                <div
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`bg-white border rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md
                    ${notif.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50/30'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gray-900 text-sm">{notif.title}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{notif.time}</span>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Notifications