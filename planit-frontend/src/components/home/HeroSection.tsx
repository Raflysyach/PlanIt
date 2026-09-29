import { useState } from 'react'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate()
  const [what, setWhat] = useState('')
  const [where, setWhere] = useState('')
  const [when, setWhen] = useState('')
  const [guests, setGuests] = useState('')
  const [activeField, setActiveField] = useState<string | null>(null)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (what) params.set('q', what)
    if (where) params.set('location', where)

    // Tentukan halaman berdasarkan keyword
    const keyword = what.toLowerCase()
    if (keyword.includes('venue') || keyword.includes('hall') || keyword.includes('ballroom')) {
      navigate(`/venues?${params.toString()}`)
    } else if (keyword.includes('organizer') || keyword.includes('eo') || keyword.includes('wedding')) {
      navigate(`/event-organizers?${params.toString()}`)
    } else {
      // Default ke venues kalau tidak spesifik
      navigate(`/venues?${params.toString()}`)
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-16 pb-20 bg-gradient-to-b from-[#EBF5FC] via-[#F0F8FD] to-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(109,182,227,0.15)_0%,transparent_65%)] pointer-events-none" />

      {/* Badge */}
      <div className="flex items-center gap-2 bg-[#EBF5FC] border border-[#6DB6E3]/30 text-[#4A9DD4] text-xs font-bold px-4 py-1.5 rounded-full mb-7 tracking-wider">
        ✦ Platform Event Organizer #1 di Indonesia
      </div>

      {/* Title */}
      <h1 className="font-black text-6xl text-gray-900 text-center leading-tight mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Find your perfect event,
      </h1>
      <h1 className="font-black text-6xl text-[#6DB6E3] text-center leading-tight mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
        all in one place.
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-lg text-center max-w-md mb-12 leading-relaxed">
        Book venues & event organizers easily and securely — all in one platform.
      </p>

      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-xl max-w-4xl w-full">

        {/* What */}
        <div
          onClick={() => setActiveField('what')}
          className={`flex items-center gap-3 px-6 py-4 flex-1 border-r border-gray-200 rounded-l-2xl transition-all cursor-pointer
            ${activeField === 'what' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
          <Search size={18} className="text-[#6DB6E3] flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">What</div>
            {activeField === 'what' ? (
              <input
                autoFocus
                type="text"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Venue or Event Org."
                className="text-sm text-gray-700 outline-none bg-transparent w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="text-sm text-gray-400 whitespace-nowrap">
                {what || 'Venue or Event Org.'}
              </div>
            )}
          </div>
        </div>

        {/* Where */}
        <div
          onClick={() => setActiveField('where')}
          className={`flex items-center gap-3 px-6 py-4 flex-1 border-r border-gray-200 transition-all cursor-pointer
            ${activeField === 'where' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
          <MapPin size={18} className="text-[#6DB6E3] flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">Where</div>
            {activeField === 'where' ? (
              <input
                autoFocus
                type="text"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="City or location"
                className="text-sm text-gray-700 outline-none bg-transparent w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="text-sm text-gray-400 whitespace-nowrap">
                {where || 'City or location'}
              </div>
            )}
          </div>
        </div>

        {/* When */}
        <div
          onClick={() => setActiveField('when')}
          className={`flex items-center gap-3 px-6 py-4 flex-1 border-r border-gray-200 transition-all cursor-pointer
            ${activeField === 'when' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
          <Calendar size={18} className="text-[#6DB6E3] flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">When</div>
            {activeField === 'when' ? (
              <input
                autoFocus
                type="date"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                className="text-sm text-gray-700 outline-none bg-transparent w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="text-sm text-gray-400 whitespace-nowrap">
                {when || 'Add date'}
              </div>
            )}
          </div>
        </div>

        {/* Guests */}
        <div
          onClick={() => setActiveField('guests')}
          className={`flex items-center gap-3 px-6 py-4 flex-1 transition-all cursor-pointer
            ${activeField === 'guests' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
          <Users size={18} className="text-[#6DB6E3] flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">Guests</div>
            {activeField === 'guests' ? (
              <input
                autoFocus
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Add guests"
                className="text-sm text-gray-700 outline-none bg-transparent w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="text-sm text-gray-400 whitespace-nowrap">
                {guests ? `${guests} guests` : 'Add guests'}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="p-3">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all whitespace-nowrap hover:shadow-lg"
          >
            <Search size={16} />
            Search
          </button>
        </div>
      </div>

      {/* Close active field when clicking outside */}
      {activeField && (
        <div className="fixed inset-0 z-0" onClick={() => setActiveField(null)} />
      )}

      {/* Stats */}
      <div className="flex items-center mt-14 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden relative z-10">
        {[
          { num: '500+', label: 'Event Organizers' },
          { num: '12K+', label: 'Successful Events' },
          { num: '4.9★', label: 'Average Rating' },
          { num: '98%', label: 'Satisfaction Rate' },
        ].map((stat, i) => (
          <div key={i} className={`px-10 py-5 text-center ${i < 3 ? 'border-r border-gray-100' : ''}`}>
            <div className="font-black text-2xl text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>{stat.num}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default HeroSection