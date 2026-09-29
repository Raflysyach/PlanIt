import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useAuth } from '../../context/AuthContext'
import {
  User, CalendarDays, Heart, Bell,
  HelpCircle, Settings, LogOut, ChevronRight,
  Camera, Eye, EyeOff, Check
} from 'lucide-react'
import { bookingsService } from '../../services/bookings.service'
import { reviewsService } from '../../services/reviews.service'

type MenuType = 'personal' | 'bookings' | 'favorite' | 'reminders' | 'help' | 'settings'

function Profile() {
  const navigate = useNavigate()
  const { user, updateUser, logout, refreshUser } = useAuth()

  const [activeMenu, setActiveMenu] = useState<MenuType>('personal')
  const [showPass, setShowPass] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activityCount, setActivityCount] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)

  // Form state
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  useEffect(() => {
    refreshUser()
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [bookings, reviewCount] = await Promise.all([
        bookingsService.getMyBookings(),
        reviewsService.getMyReviewCount(),
      ])
      setActivityCount(bookings.length)
      setReviewCount(reviewCount)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '')
      setUsername(user.username || '')
      setPhone(user.phone || '')
      setLocation(user.location || '')
      setGender(user.gender || '')
      setDateOfBirth(user.dateOfBirth || '')
    }
  }, [user])

  const handleSave = async () => {
    try {
      setSaving(true)
      await updateUser({ fullName, username, phone, location, gender, dateOfBirth })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'bookings', label: 'My Booking', icon: CalendarDays },
    { id: 'favorite', label: 'Favorite', icon: Heart },
    { id: 'reminders', label: 'Event Reminders', icon: Bell },
  ]

  const generalItems = [
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <div className="flex gap-6">

            {/* LEFT SIDEBAR */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-[#6DB6E3]" />
                <div className="px-5 pb-5">
                  <div className="relative w-fit -mt-8 mb-3">
                    <div className="w-16 h-16 rounded-full border-3 border-white bg-gradient-to-br from-blue-400 to-[#6DB6E3] flex items-center justify-center text-white text-xl font-black shadow">
                      {initials}
                    </div>
                    <button className="absolute bottom-0 right-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                      <Camera size={9} className="text-white" />
                    </button>
                  </div>
                  <div className="font-black text-gray-900 text-lg">{user?.fullName}</div>
                  <div className="text-sm text-gray-400 mb-4">@{user?.username}</div>
                  <div className="flex border-t border-gray-100 pt-4 mb-2">
                    <div className="flex-1 text-center">
                      <div className="font-black text-gray-900 text-lg">{activityCount}</div>
                      <div className="text-xs text-gray-400">Activity</div>
                    </div>
                    <div className="flex-1 text-center border-x border-gray-100">
                      <div className="font-black text-gray-900 text-lg">0</div>
                      <div className="text-xs text-gray-400">Favorite</div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="font-black text-gray-900 text-lg">{reviewCount}</div>
                      <div className="text-xs text-gray-400">Reviews</div>
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Account</div>
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'bookings') navigate('/my-bookings')
                          else setActiveMenu(item.id as MenuType)
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5
                          ${activeMenu === item.id ? 'bg-[#EBF5FC] text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <Icon size={16} className={activeMenu === item.id ? 'text-blue-500' : 'text-gray-400'} />
                        {item.label}
                        <ChevronRight size={13} className="ml-auto text-gray-300" />
                      </button>
                    )
                  })}

                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2 mt-4">General</div>
                  {generalItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id as MenuType)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5
                          ${activeMenu === item.id ? 'bg-[#EBF5FC] text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <Icon size={16} className={activeMenu === item.id ? 'text-blue-500' : 'text-gray-400'} />
                        {item.label}
                        <ChevronRight size={13} className="ml-auto text-gray-300" />
                      </button>
                    )
                  })}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-1"
                  >
                    <LogOut size={16} className="text-red-400" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                {/* Personal Info */}
                {activeMenu === 'personal' && (
                  <div>
                    <div className="mb-6 pb-5 border-b border-gray-100">
                      <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>Personal Info</h2>
                      <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
                    </div>

                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Basic Information</div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">FULL NAME</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">USERNAME</label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-xs font-bold text-gray-500 block mb-2">EMAIL</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">PHONE NUMBER</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+62 812 3456 7890"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">LOCATION</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Jakarta, Indonesia"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">GENDER</label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">DATE OF BIRTH</label>
                        <input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>

                    {/* Security */}
                    <div className="border-t border-gray-100 pt-6 mb-4">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Security</div>
                      <div className="mb-4">
                        <label className="text-xs font-bold text-gray-500 block mb-2">CURRENT PASSWORD</label>
                        <div className="relative">
                          <input type={showPass ? 'text' : 'password'} placeholder="Enter current password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all pr-10" />
                          <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-2">NEW PASSWORD</label>
                          <div className="relative">
                            <input type={showNew ? 'text' : 'password'} placeholder="Min. 8 characters" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all pr-10" />
                            <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-2">CONFIRM PASSWORD</label>
                          <div className="relative">
                            <input type={showConfirm ? 'text' : 'password'} placeholder="Repeat new password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all pr-10" />
                            <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-all"
                      >
                        {saved ? <><Check size={16} /> Saved!</> : saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Favorite */}
                {activeMenu === 'favorite' && (
                  <div>
                    <div className="mb-6 pb-5 border-b border-gray-100">
                      <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>Favorite</h2>
                      <p className="text-gray-500 text-sm mt-1">Venues & organizers you've saved</p>
                    </div>
                    <div className="text-center py-16 text-gray-400">
                      <div className="text-4xl mb-3">❤️</div>
                      <div className="font-bold text-gray-600">No favorites yet</div>
                      <div className="text-sm mt-1">Save venues & organizers you like!</div>
                    </div>
                  </div>
                )}

                {/* Reminders */}
                {activeMenu === 'reminders' && (
                  <div>
                    <div className="mb-6 pb-5 border-b border-gray-100">
                      <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>Event Reminders</h2>
                      <p className="text-gray-500 text-sm mt-1">Manage your notification preferences</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'Booking confirmation', desc: 'Get notified when your booking is confirmed', enabled: true },
                        { label: 'Payment reminder', desc: 'Reminder for upcoming payment deadlines', enabled: true },
                        { label: 'Event reminder', desc: '7 days before your event date', enabled: true },
                        { label: 'New deals & promos', desc: 'Be the first to know about special offers', enabled: false },
                        { label: 'Review reminder', desc: 'Reminder to review after your event', enabled: true },
                      ].map((notif, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{notif.label}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{notif.desc}</div>
                          </div>
                          <div className={`w-11 h-6 rounded-full transition-all cursor-pointer flex items-center px-1 ${notif.enabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${notif.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Help */}
                {activeMenu === 'help' && (
                  <div>
                    <div className="mb-6 pb-5 border-b border-gray-100">
                      <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>Help Center</h2>
                      <p className="text-gray-500 text-sm mt-1">Find answers to common questions</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { q: 'How do I cancel my booking?', a: 'You can cancel your booking up to 7 days before the event for a full refund.' },
                        { q: 'When will my payment be released to the venue?', a: 'Your payment will be released to the venue only after the booking is confirmed.' },
                        { q: 'How do I contact the event organizer?', a: 'You can chat directly with the organizer through the Chat feature in your booking details.' },
                        { q: 'Is my payment secure?', a: 'Yes! We use industry-standard encryption and your funds are held securely until the event is completed.' },
                      ].map((faq, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-5">
                          <div className="font-bold text-gray-900 text-sm mb-2">{faq.q}</div>
                          <div className="text-sm text-gray-500 leading-relaxed">{faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings */}
                {activeMenu === 'settings' && (
                  <div>
                    <div className="mb-6 pb-5 border-b border-gray-100">
                      <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>Settings</h2>
                      <p className="text-gray-500 text-sm mt-1">Manage your app preferences</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 block mb-2">LANGUAGE</label>
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all">
                          <option>English</option>
                          <option>Bahasa Indonesia</option>
                        </select>
                      </div>
                      {[
                        { label: 'Email notifications', desc: 'Receive updates via email' },
                        { label: 'Push notifications', desc: 'Receive push notifications' },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{s.label}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
                          </div>
                          <div className="w-11 h-6 rounded-full bg-blue-600 flex items-center px-1 cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full shadow translate-x-5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile