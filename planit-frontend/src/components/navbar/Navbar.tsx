import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Heart, Bell, ChevronDown, User, CalendarDays, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Venues', path: '/venues' },
    { name: 'Event Organizers', path: '/event-organizers' },
    { name: 'My Bookings', path: '/my-bookings' },
  ]

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate('/')
  }

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300
  ${scrolled ? 'shadow-md' : 'shadow-none'}`}>
      <div className="max-w-7xl mx-auto px-8 h-20 grid grid-cols-3 items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src="/src/assets/logo.svg" alt="PlanIt" className="h-10" />
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center justify-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-medium pb-1 transition-all duration-200 whitespace-nowrap
                  ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {link.name}
                {/* Underline indicator */}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-[#6DB6E3] transition-all duration-200
                  ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                />
              </Link>
            )
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-end gap-2">
          <button 
          onClick={() => navigate('/favorites')}
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-all">
            <Heart size={18} />
          </button>

          <button 
          onClick={() => navigate('/notifications')}
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-all">
            <Bell size={18} />
          </button>

          {isLoggedIn ? (
            <div className="relative ml-1">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-xl px-3 py-2 transition-all"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-[#6DB6E3] rounded-full flex items-center justify-center text-white text-xs font-black">
                  {initials}
                </div>
                <span className="text-sm font-semibold text-gray-800 max-w-[80px] truncate">
                  {user?.fullName}
                </span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden w-48">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-bold text-gray-900 text-sm">{user?.fullName}</div>
                      <div className="text-xs text-gray-400 truncate">{user?.email}</div>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { navigate('/profile'); setShowDropdown(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <User size={15} className="text-gray-400" /> Profile
                      </button>
                      <button
                        onClick={() => { navigate('/my-bookings'); setShowDropdown(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <CalendarDays size={15} className="text-gray-400" /> My Bookings
                      </button>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all"
                        >
                          <LogOut size={15} className="text-red-400" /> Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/auth/login')}
                className="px-4 py-2 text-base font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/auth/signup')}
                className="px-5 py-2 text-base font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all hover:shadow-md"
              >
                Sign up
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar