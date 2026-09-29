import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { Search, Send, Paperclip, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react'

const contacts = [
  {
    id: 1,
    name: 'Le Blanc Wedding Organizer',
    initials: 'LB',
    color: 'from-blue-400 to-[#6DB6E3]',
    lastMessage: 'Baik, kami konfirmasi booking Anda...',
    time: '12:00',
    unread: 2,
    online: true,
    booking: 'Platinum Package · 12 Jun 2026',
  },
  {
    id: 2,
    name: 'Amanjiwo Grand Ballroom',
    initials: 'AM',
    color: 'from-green-400 to-green-600',
    lastMessage: 'Terima kasih atas kepercayaannya',
    time: '11:45',
    unread: 0,
    online: false,
    booking: 'Premium Package · 20 Jun 2026',
  },
  {
    id: 3,
    name: 'Party Planner Birthday Org.',
    initials: 'PP',
    color: 'from-purple-400 to-purple-600',
    lastMessage: 'Untuk tema dekorasi, kami sarankan...',
    time: '10:30',
    unread: 1,
    online: true,
    booking: 'Gold Package · 14 Jun 2026',
  },
  {
    id: 4,
    name: 'Groovy Garden Venue',
    initials: 'GG',
    color: 'from-yellow-400 to-orange-500',
    lastMessage: 'Dokumen kontrak sudah dikirim',
    time: 'Kemarin',
    unread: 0,
    online: false,
    booking: 'Full Day · 25 Jun 2026',
  },
  {
    id: 5,
    name: 'Stellar Concert Production',
    initials: 'SC',
    color: 'from-gray-600 to-gray-800',
    lastMessage: 'Venue sudah siap untuk survey',
    time: 'Senin',
    unread: 0,
    online: false,
    booking: 'Full Package · 30 Jun 2026',
  },
]

const messagesByContact: Record<number, { id: number; text: string; mine: boolean; time: string; type?: string }[]> = {
  1: [
    { id: 1, text: 'Selamat datang di Le Blanc Wedding Organizer! Ada yang bisa kami bantu? 😊', mine: false, time: '11:55' },
    { id: 2, text: 'Halo! Saya tertarik dengan paket Platinum untuk pernikahan bulan Juni. Apakah masih tersedia tanggal 12 Juni?', mine: true, time: '11:57' },
    { id: 3, text: 'Tanggal 12 Juni masih tersedia! Berikut konfirmasi booking Anda:', mine: false, time: '12:00', type: 'booking' },
    { id: 4, text: 'Terima kasih! Dokumen apa saja yang perlu saya siapkan?', mine: true, time: '12:02' },
    { id: 5, text: 'Kami memerlukan KTP kedua pihak dan bukti pembayaran DP. Kontrak digital akan kami kirimkan setelah DP dikonfirmasi ✅', mine: false, time: '12:05' },
  ],
  2: [
    { id: 1, text: 'Selamat datang di Amanjiwo Grand Ballroom!', mine: false, time: '10:00' },
    { id: 2, text: 'Halo, saya mau tanya soal ketersediaan ballroom untuk seminar 300 orang', mine: true, time: '10:05' },
    { id: 3, text: 'Terima kasih atas kepercayaannya! Ballroom kami tersedia. Kapasitas maksimal 500 orang.', mine: false, time: '10:10' },
  ],
  3: [
    { id: 1, text: 'Halo! Kami Party Planner siap bantu acara ulang tahun Anda!', mine: false, time: '09:00' },
    { id: 2, text: 'Saya mau tanya soal tema dekorasi untuk ulang tahun anak usia 7 tahun', mine: true, time: '09:15' },
    { id: 3, text: 'Untuk tema dekorasi, kami sarankan tema Superhero atau Princess yang sedang populer!', mine: false, time: '09:20' },
  ],
  4: [
    { id: 1, text: 'Dokumen kontrak sudah kami kirim ke email Anda', mine: false, time: 'Kemarin' },
    { id: 2, text: 'Sudah saya terima, terima kasih!', mine: true, time: 'Kemarin' },
  ],
  5: [
    { id: 1, text: 'Venue sudah siap untuk survey kapan saja', mine: false, time: 'Senin' },
    { id: 2, text: 'Oke, saya akan datang Rabu pagi', mine: true, time: 'Senin' },
  ],
}

function Chat() {
  const navigate = useNavigate()
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messages, setMessages] = useState(messagesByContact[1])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectContact = (contact: typeof contacts[0]) => {
    setActiveContact(contact)
    setMessages(messagesByContact[contact.id] || [])
  }

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = {
      id: messages.length + 1,
      text: input,
      mine: true,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}>

        {/* SIDEBAR */}
        <div className="w-80 flex-shrink-0 border-r border-gray-200 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Messages
            </h2>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-none border-none outline-none text-sm text-gray-700 flex-1 bg-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 transition-all
                  ${activeContact.id === contact.id ? 'bg-blue-50 border-r-2 border-r-[#6DB6E3]' : 'hover:bg-gray-50'}`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-sm font-black`}>
                    {contact.initials}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-gray-900 truncate">{contact.name}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{contact.time}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{contact.lastMessage}</div>
                </div>
                {contact.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{contact.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CHAT */}
        <div className="flex-1 flex flex-col bg-gray-50">

          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 mr-1">
                <ArrowLeft size={18} />
              </button>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeContact.color} flex items-center justify-center text-white text-sm font-black`}>
                {activeContact.initials}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{activeContact.name}</div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${activeContact.online ? 'bg-green-400' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-400">{activeContact.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-all">
                <Phone size={17} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-all">
                <Video size={17} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-all">
                <MoreVertical size={17} />
              </button>
            </div>
          </div>

          {/* Booking Info Bar */}
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-2 flex items-center gap-2">
            <span className="text-xs text-blue-600 font-semibold">📋 Booking:</span>
            <span className="text-xs text-blue-700">{activeContact.booking}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
            <div className="text-center">
              <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">Today</span>
            </div>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 max-w-[70%] ${msg.mine ? 'self-end flex-row-reverse' : 'self-start'}`}>
                {!msg.mine && (
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${activeContact.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 self-end`}>
                    {activeContact.initials.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {msg.type === 'booking' ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 max-w-xs">
                      <div className="text-xs font-bold text-blue-600 mb-1">📋 BOOKING CONFIRMED</div>
                      <div className="font-bold text-gray-900 text-sm">{activeContact.name}</div>
                      <div className="text-xs text-gray-500">{activeContact.booking}</div>
                    </div>
                  ) : (
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                      ${msg.mine
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                      }`}>
                      {msg.text}
                    </div>
                  )}
                  <span className={`text-xs text-gray-400 ${msg.mine ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 transition-all">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-gray-200 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl flex items-center justify-center text-white transition-all"
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Chat