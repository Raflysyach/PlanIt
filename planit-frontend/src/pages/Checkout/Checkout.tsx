import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Check, ChevronRight, Plus, X, Shield, Star, MapPin } from 'lucide-react'
import { bookingsService } from '../../services/bookings.service'
import { useAuth } from '../../context/AuthContext'
import { venuesService } from '../../services/venues.service'
import { organizersService } from '../../services/organizers.service'


const steps = ['Package', 'Details', 'Payment', 'Confirm']

const upsellVenues = [
    { id: 1, name: 'Le Blanc Wedding Hall', location: 'BSD, Tangerang', rating: 4.9, price: 18000000, emoji: '💍', bg: 'from-orange-100 to-orange-200' },
    { id: 2, name: 'Groovy Garden Venue', location: 'Bogor', rating: 4.7, price: 22000000, emoji: '🌿', bg: 'from-green-100 to-green-200' },
    { id: 3, name: 'Amanjiwo Ballroom', location: 'Jakarta Selatan', rating: 4.8, price: 25000000, emoji: '🏛️', bg: 'from-blue-100 to-blue-200' },
]

const upsellOrganizers = [
    { id: 1, name: 'Le Blanc Wedding Org.', location: 'BSD, Tangerang', rating: 4.9, price: 18000000, emoji: '💍', bg: 'from-orange-100 to-orange-200' },
    { id: 2, name: 'Elegant Wedding Org.', location: 'Jakarta Pusat', rating: 4.8, price: 30000000, emoji: '💒', bg: 'from-pink-100 to-pink-200' },
    { id: 3, name: 'ProEvent Corporate', location: 'Jakarta', rating: 4.7, price: 20000000, emoji: '🎯', bg: 'from-blue-100 to-blue-200' },
]

interface UpsellItem {
    id: number
    name: string
    location: string
    rating: number
    price: number
    emoji: string
    bg: string
}

function Checkout() {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    const [step, setStep] = useState(0)
    const [addedVenue, setAddedVenue] = useState<UpsellItem | null>(null)
    const [addedOrg, setAddedOrg] = useState<UpsellItem | null>(null)
    const [showVenueUpsell, setShowVenueUpsell] = useState(true)
    const [showOrgUpsell, setShowOrgUpsell] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState('visa')
    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [guests, setGuests] = useState('')
    const [location, setLocation] = useState('')
    const [notes, setNotes] = useState('')
    const [searchParams] = useSearchParams()
    const bookingType = searchParams.get('type') || 'organizer'
    const itemId = searchParams.get('itemId')
    const packageName = searchParams.get('package') || 'Platinum'
    const packagePrice = Number(searchParams.get('price')) || 25000000
    const [itemName, setItemName] = useState('')

    const basePrice = packagePrice
    const platformFee = 15000
    const totalPrice = basePrice + (addedVenue?.price || 0) + (addedOrg?.price || 0) + platformFee
    const dp = totalPrice * 0.3



    useEffect(() => {
        const fetchItemName = async () => {
            if (!itemId) return
            try {
                if (bookingType === 'venue') {
                    const data = await venuesService.getOne(Number(itemId))
                    setItemName(data.name)
                } else {
                    const data = await organizersService.getOne(Number(itemId))
                    setItemName(data.name)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchItemName()
    }, [itemId, bookingType])

    return (
        <div>
            <Navbar />
            <div className="pt-16 min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-8 py-10">

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-10">
                        {steps.map((s, i) => (
                            <div key={s} className="flex items-center">
                                <div className="flex flex-col items-center gap-1 w-20">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                    ${i < step ? 'bg-[#6DB6E3] text-white' : i === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        {i < step ? <Check size={14} /> : i + 1}
                                    </div>
                                    <span className={`text-xs whitespace-nowrap ${i === step ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>{s}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-20 h-0.5 mb-4 ${i < step ? 'bg-[#6DB6E3]' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-8">

                        {/* LEFT */}
                        <div className="flex-1">

                            {/* STEP 0 - Package */}
                            {step === 0 && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                                    <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                        Your Selection
                                    </h2>

                                    {/* Selected item */}
                                    <div className="border border-blue-200 bg-blue-50 rounded-2xl p-5 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center text-3xl">
                                                {bookingType === 'venue' ? '🏛️' : '💍'}
                                            </div>
                                            <div className="flex-1">
                                                <div className={`text-xs font-bold mb-1 ${bookingType === 'organizer' ? 'text-blue-600' : 'text-purple-600'}`}>
                                                    {bookingType === 'organizer' ? 'EVENT ORGANIZER' : 'VENUE'}
                                                </div>
                                                <div className="font-black text-gray-900">{itemName || 'Loading...'}</div>
                                                <div className="text-sm text-gray-500">{packageName} Package</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-400">Price</div>
                                                <div className="font-black text-blue-600">Rp {packagePrice.toLocaleString('id-ID')}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upsell Venue - hanya muncul kalau booking dari EO */}
                                    {bookingType === 'organizer' && showVenueUpsell && !addedVenue && (
                                        <div className="border border-dashed border-gray-300 rounded-2xl p-5 mb-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <div className="font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                                        🏛️ Add a Venue?
                                                    </div>
                                                    <div className="text-sm text-gray-500">Complete your booking with a venue</div>
                                                </div>
                                                <button onClick={() => setShowVenueUpsell(false)} className="text-gray-400 hover:text-gray-600">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {upsellVenues.map((v) => (
                                                    <div key={v.id} onClick={() => setAddedVenue(v)} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all cursor-pointer">
                                                        <div className={`w-12 h-12 bg-gradient-to-br ${v.bg} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>{v.emoji}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-bold text-gray-900 text-sm">{v.name}</div>
                                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                                <span className="flex items-center gap-1"><MapPin size={10} />{v.location}</span>
                                                                <span className="flex items-center gap-1"><Star size={10} className="fill-yellow-400 text-yellow-400" />{v.rating}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <div className="text-xs font-bold text-blue-600">Rp {v.price.toLocaleString('id-ID')}</div>
                                                            <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold mt-1">
                                                                <Plus size={10} /> Add
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => navigate('/venues')} className="text-xs text-blue-600 font-semibold hover:underline mt-3 block">
                                                Browse all venues →
                                            </button>
                                        </div>
                                    )}

                                    {/* Added Venue */}
                                    {addedVenue && (
                                        <div className="border border-green-200 bg-green-50 rounded-2xl p-5 mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-16 h-16 bg-gradient-to-br ${addedVenue.bg} rounded-xl flex items-center justify-center text-3xl`}>{addedVenue.emoji}</div>
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-green-600 mb-1">VENUE ADDED ✓</div>
                                                    <div className="font-black text-gray-900">{addedVenue.name}</div>
                                                    <div className="text-sm text-gray-500">{addedVenue.location}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-black text-blue-600">Rp {addedVenue.price.toLocaleString('id-ID')}</div>
                                                    <button onClick={() => setAddedVenue(null)} className="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Upsell Organizer - hanya muncul kalau booking dari Venue */}
                                    {bookingType === 'venue' && showOrgUpsell && !addedOrg && (
                                        <div className="border border-dashed border-gray-300 rounded-2xl p-5 mb-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <div className="font-black text-gray-900 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                                        🎪 Add an Event Organizer?
                                                    </div>
                                                    <div className="text-sm text-gray-500">Let the pros handle your event</div>
                                                </div>
                                                <button onClick={() => setShowOrgUpsell(false)} className="text-gray-400 hover:text-gray-600">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {upsellOrganizers.map((o) => (
                                                    <div key={o.id} onClick={() => setAddedOrg(o)} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all cursor-pointer">
                                                        <div className={`w-12 h-12 bg-gradient-to-br ${o.bg} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>{o.emoji}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-bold text-gray-900 text-sm">{o.name}</div>
                                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                                <span className="flex items-center gap-1"><MapPin size={10} />{o.location}</span>
                                                                <span className="flex items-center gap-1"><Star size={10} className="fill-yellow-400 text-yellow-400" />{o.rating}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex-shrink-0">
                                                            <div className="text-xs font-bold text-blue-600">Rp {o.price.toLocaleString('id-ID')}</div>
                                                            <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold mt-1">
                                                                <Plus size={10} /> Add
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => navigate('/event-organizers')} className="text-xs text-blue-600 font-semibold hover:underline mt-3 block">
                                                Browse all organizers →
                                            </button>
                                        </div>
                                    )}

                                    {/* Added Organizer */}
                                    {addedOrg && (
                                        <div className="border border-green-200 bg-green-50 rounded-2xl p-5 mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-16 h-16 bg-gradient-to-br ${addedOrg.bg} rounded-xl flex items-center justify-center text-3xl`}>{addedOrg.emoji}</div>
                                                <div className="flex-1">
                                                    <div className="text-xs font-bold text-green-600 mb-1">ORGANIZER ADDED ✓</div>
                                                    <div className="font-black text-gray-900">{addedOrg.name}</div>
                                                    <div className="text-sm text-gray-500">{addedOrg.location}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-black text-blue-600">Rp {addedOrg.price.toLocaleString('id-ID')}</div>
                                                    <button onClick={() => setAddedOrg(null)} className="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button onClick={() => setStep(1)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all mt-4 flex items-center justify-center gap-2">
                                        Continue to Details <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}

                            {/* STEP 1 - Details */}
                            {step === 1 && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                                    <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>Event Details</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Event Name</label>
                                            <input value={eventName} onChange={(e) => setEventName(e.target.value)} type="text" placeholder="e.g. Wedding of Bimo and Jeje" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Event Date</label>
                                                <input value={eventDate} onChange={(e) => setEventDate(e.target.value)} type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Number of Guests</label>
                                                <input value={guests} onChange={(e) => setGuests(e.target.value)} type="number" placeholder="e.g. 300" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Event Location</label>
                                            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Venue name or full address" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Additional Notes</label>
                                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Theme, special requests, or other details..." rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all resize-none" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-6">
                                        <button onClick={() => setStep(0)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all">Back</button>
                                        <button onClick={() => setStep(2)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                                            Continue to Payment <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2 - Payment */}
                            {step === 2 && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                                    <h2 className="text-xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>Payment Method</h2>
                                    <div className="space-y-3 mb-6">
                                        {[
                                            { id: 'visa', label: 'Visa / Mastercard', sub: 'Credit or debit card', emoji: '💳' },
                                            { id: 'gopay', label: 'GoPay', sub: 'Balance: Rp 842.000', emoji: '💚' },
                                            { id: 'ovo', label: 'OVO', sub: 'Balance: Rp 250.000', emoji: '💜' },
                                            { id: 'bca', label: 'BCA Virtual Account', sub: 'Bank transfer', emoji: '🏦' },
                                        ].map((pm) => (
                                            <div key={pm.id} onClick={() => setPaymentMethod(pm.id)} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === pm.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                <span className="text-2xl">{pm.emoji}</span>
                                                <div className="flex-1">
                                                    <div className="font-bold text-gray-900 text-sm">{pm.label}</div>
                                                    <div className="text-xs text-gray-400">{pm.sub}</div>
                                                </div>
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === pm.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                                    {paymentMethod === pm.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {paymentMethod === 'visa' && (
                                        <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 block mb-1">CARD NUMBER</label>
                                                <input type="text" placeholder="1234 5678 9012 3456" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 block mb-1">EXPIRY DATE</label>
                                                    <input type="text" placeholder="MM/YY" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 block mb-1">CVV</label>
                                                    <input type="text" placeholder="123" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-3">
                                        <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all">Back</button>
                                        <button
                                            onClick={async () => {
                                                if (!isLoggedIn) {
                                                    navigate('/auth/login')
                                                    return
                                                }
                                                try {
                                                    const params = new URLSearchParams(window.location.search)
                                                    await bookingsService.create({
                                                        venueId: bookingType === 'venue' ? Number(params.get('itemId')) : undefined,
                                                        organizerId: bookingType === 'organizer' ? Number(params.get('itemId')) : undefined,
                                                        eventName,
                                                        eventDate,
                                                        guests: Number(guests),
                                                        eventLocation: location,
                                                        notes,
                                                        packageName: params.get('package') || 'Platinum',
                                                        totalPrice,
                                                        paymentMethod,
                                                    })
                                                    setStep(3)
                                                } catch (err) {
                                                    console.error(err)
                                                    alert('Booking failed, please try again')
                                                }
                                            }}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                        >
                                            Pay Now <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3 - Confirm */}
                            {step === 3 && (
                                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                        <Check size={36} className="text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>Booking Confirmed! 🎉</h2>
                                    <p className="text-gray-500 text-sm mb-6">Your booking has been successfully placed. We'll send you a confirmation email shortly.</p>
                                    <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6 space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-gray-500">Booking ID</span><span className="font-bold">#PLN-2026-001</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray-500">Status</span><span className="font-bold text-green-600">Confirmed</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray-500">DP Paid</span><span className="font-bold text-blue-600">Rp {Math.round(dp).toLocaleString('id-ID')}</span></div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => navigate('/my-bookings')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">View My Bookings</button>
                                        <button onClick={() => navigate('/')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all">Back to Home</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT - Order Summary */}
                        <div className="w-80 flex-shrink-0">
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                                <h3 className="font-black text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Order Summary</h3>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="text-gray-500 flex-1 mr-4">{itemName} · {packageName}</span>
                                        <span className="font-semibold whitespace-nowrap">Rp {packagePrice.toLocaleString('id-ID')}</span>
                                    </div>
                                    {addedVenue && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">{addedVenue.name}</span>
                                            <span className="font-semibold">Rp {addedVenue.price.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                    {addedOrg && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">{addedOrg.name}</span>
                                            <span className="font-semibold">Rp {addedOrg.price.toLocaleString('id-ID')}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Platform fee</span>
                                        <span className="font-semibold">Rp 15.000</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-3 mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-500">Total</span>
                                        <span className="font-black text-gray-900">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">DP 30%</span>
                                        <span className="font-black text-blue-600">Rp {Math.round(dp).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700 mb-4">
                                    💡 Remaining balance due 7 days before the event
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                                    <Shield size={12} />
                                    Secure payment · Money-back guarantee
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout