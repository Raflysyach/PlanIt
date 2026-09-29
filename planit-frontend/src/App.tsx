import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Venues from './pages/Venues/Venues'
import EventOrganizers from './pages/EventOrganizers/EventOrganizers'
import Detail from './pages/Detail/Detail'
import Checkout from './pages/Checkout/Checkout'
import MyBookings from './pages/MyBookings/MyBookings'
import Profile from './pages/Profile/Profile'
import Auth from './pages/Auth/Auth'
import Callback from './pages/Auth/Callback'
import Chat from './pages/Chat/Chat'
import Favorites from './pages/Favorites/Favorites'
import Notifications from './pages/Notifications/Notifications'
import BookingDetail from './pages/BookingDetail/BookingDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/venues" element={<Venues />} />
      <Route path="/event-organizers" element={<EventOrganizers />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth/login" element={<Auth />} />
      <Route path="/auth/signup" element={<Auth />} />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/booking/:id" element={<BookingDetail />} />
    </Routes>
  )
}

export default App