import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { MapPin, Star, Heart, ChevronRight, Check, Users, Calendar, Shield } from 'lucide-react'
import { venuesService } from '../../services/venues.service'
import { organizersService } from '../../services/organizers.service'
import { reviewsService } from '../../services/reviews.service'
import { useAuth } from '../../context/AuthContext'

const defaultPackages = [
    {
        id: 1,
        name: 'Platinum',
        desc: 'Best for large events',
        price: 0,
        features: ['Full decoration & lighting', 'MC + Entertainment', 'Photography + Video', 'Catering included', 'Day-of Coordinator'],
    },
    {
        id: 2,
        name: 'Gold',
        desc: 'Popular package',
        price: 0,
        features: ['Premium decoration', 'MC + Entertainment', 'Photographer', 'Catering included'],
    },
    {
        id: 3,
        name: 'Silver',
        desc: 'Great for intimate events',
        price: 0,
        features: ['Basic decoration', 'MC only', 'Photographer'],
    },
]

const categoryImages: Record<string, string[]> = {
    Wedding: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    ],
    Birthday: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    Seminar: [
        'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    ],
    Concert: [
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    ],
    Photoshoot: [
        'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80',
        'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80',
        'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&q=80',
    ],
    Corporate: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    ],
}

const getImage = (category: string, id: number) => {
    const images = categoryImages[category] || categoryImages['Wedding']
    return images[id % images.length]
}

interface Item {
    id: number
    name: string
    location: string
    category: string
    description: string
    price: number
    badge: string
    emoji: string
    rating: number
    reviewCount: number
    capacity? : string
}

interface Review {
    id: number
    rating: number
    comment: string
    createdAt: string
    user: {
        fullName: string
        username: string
    }
}

function Detail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type') || 'venue'

    const [item, setItem] = useState<Item | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedPkg, setSelectedPkg] = useState(0)
    const [wished, setWished] = useState(false)

    const { isLoggedIn } = useAuth()
    const [reviews, setReviews] = useState<Review[]>([])
    const [reviewRating, setReviewRating] = useState(5)
    const [reviewComment, setReviewComment] = useState('')
    const [submittingReview, setSubmittingReview] = useState(false)
    const [reviewSubmitted, setReviewSubmitted] = useState(false)


    useEffect(() => {
        fetchDetail()
    }, [id, type])

    const fetchDetail = async () => {
        try {
            setLoading(true)
            let data
            if (type === 'venue') {
                data = await venuesService.getOne(Number(id))
                const rev = await reviewsService.getByVenue(Number(id))
                setReviews(rev)
            } else {
                data = await organizersService.getOne(Number(id))
                const rev = await reviewsService.getByOrganizer(Number(id))
                setReviews(rev)
            }
            setItem(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const packages = item ? defaultPackages.map((pkg, i) => ({
        ...pkg,
        price: Math.round(item.price * (i === 0 ? 1 : i === 1 ? 0.7 : 0.4)),
    })) : defaultPackages

    const handleSubmitReview = async () => {
        if (!isLoggedIn) {
            navigate('/auth/login')
            return
        }
        try {
            setSubmittingReview(true)
            await reviewsService.create({
                venueId: type === 'venue' ? Number(id) : undefined,
                organizerId: type === 'organizer' ? Number(id) : undefined,
                rating: reviewRating,
                comment: reviewComment,
            })
            setReviewSubmitted(true)
            setReviewComment('')
            setReviewRating(5)

            // Refresh reviews — pastikan bagian ini ada
            const rev = type === 'venue'
                ? await reviewsService.getByVenue(Number(id))
                : await reviewsService.getByOrganizer(Number(id))

            console.log('Reviews after submit:', rev)
            setReviews(rev)

        } catch (err) {
            console.error(err)
        } finally {
            setSubmittingReview(false)
        }
    }

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="pt-16 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <div className="text-gray-500 text-sm">Loading...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (!item) {
        return (
            <div>
                <Navbar />
                <div className="pt-16 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl mb-4">😕</div>
                        <div className="font-bold text-gray-900 text-xl mb-2">Not found</div>
                        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Go back</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <div className="pt-16 min-h-screen">
                {/* Hero */}
                <div className="h-80 relative overflow-hidden bg-gray-100">
                    <img
                        src={getImage(item.category, item.id)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <button
                        onClick={() => setWished(!wished)}
                        className="absolute top-6 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
                    >
                        <Heart size={18} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                    </button>
                </div>

                <div className="max-w-7xl mx-auto px-8 py-10">
                    <div className="flex gap-10">
                        {/* LEFT */}
                        <div className="flex-1">
                            {/* Title */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <span className="text-xs font-bold bg-[#EBF5FC] text-[#4A9DD4] px-3 py-1 rounded-full mb-3 inline-block">
                                    {item.category}
                                </span>
                                <h1 className="text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                    {item.name}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold text-gray-900">{item.rating}</span>
                                        <span>· {item.reviewCount} reviews</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} /> {item.location}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <h2 className="text-lg font-black text-gray-900 mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>About</h2>
                                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                            </div>

                            {/* Highlights */}
                            <div className="grid grid-cols-3 gap-4">
                                {(type === 'venue' ? [
                                    { icon: Users, label: item.capacity ? `Up to ${item.capacity} guests` : 'Flexible capacity' },
                                    { icon: Calendar, label: 'Available year-round' },
                                    { icon: Shield, label: 'Verified & trusted' },
                                ] : [
                                    { icon: Users, label: 'Professional team' },
                                    { icon: Calendar, label: '10+ years experience' },
                                    { icon: Shield, label: 'Verified & trusted' },
                                ]).map((h, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                                        <div className="w-9 h-9 bg-[#EBF5FC] rounded-lg flex items-center justify-center">
                                            <h.icon size={16} className="text-blue-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{h.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Packages */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <h2 className="text-lg font-black text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Packages</h2>
                                <div className="space-y-3">
                                    {packages.map((pkg, i) => (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPkg(i)}
                                            className={`border rounded-2xl p-5 cursor-pointer transition-all
                        ${selectedPkg === i ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>{pkg.name}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{pkg.desc}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-400">Start from</div>
                                                    <div className="font-black text-blue-600 text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                                        Rp {pkg.price.toLocaleString('id-ID')}
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="grid grid-cols-2 gap-1.5">
                                                {pkg.features.map((f, fi) => (
                                                    <li key={fi} className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Check size={12} className="text-[#6DB6E3] flex-shrink-0" /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                        Reviews
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                        <span className="font-black text-gray-900">{item.rating}</span>
                                        <span className="text-gray-500 text-sm">· {reviews.length} reviews</span>
                                    </div>
                                </div>

                                {/* Rating bars */}
                                <div className="bg-gray-50 rounded-2xl p-5 mb-5">
                                    {[5, 4, 3, 2, 1].map((star) => {
                                        const count = reviews.filter(r => r.rating === star).length
                                        const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
                                        return (
                                            <div key={star} className="flex items-center gap-3 mb-2">
                                                <span className="text-xs text-gray-500 w-8">{star}★</span>
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                                    <div className="h-2 bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                                </div>
                                                <span className="text-xs text-gray-400 w-8">{pct}%</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Write Review */}
                                {isLoggedIn && !reviewSubmitted && (
                                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-5">
                                        <div className="font-bold text-gray-900 mb-3">Write a Review</div>
                                        <div className="flex items-center gap-2 mb-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setReviewRating(star)}
                                                    className="transition-all"
                                                >
                                                    <Star
                                                        size={24}
                                                        className={star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                    />
                                                </button>
                                            ))}
                                            <span className="text-sm text-gray-500 ml-2">{reviewRating}/5</span>
                                        </div>
                                        <textarea
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            placeholder="Share your experience..."
                                            rows={3}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-all resize-none mb-3"
                                        />
                                        <button
                                            onClick={handleSubmitReview}
                                            disabled={submittingReview || !reviewComment.trim()}
                                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm"
                                        >
                                            {submittingReview ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </div>
                                )}

                                {reviewSubmitted && (
                                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-5 text-green-700 text-sm font-semibold">
                                        ✅ Review submitted! Thank you for your feedback.
                                    </div>
                                )}

                                {/* Review List */}
                                {reviews.length === 0 ? (
                                    <div className="text-center py-10 text-gray-400">
                                        <div className="text-4xl mb-3">💬</div>
                                        <div className="font-bold text-gray-500">No reviews yet</div>
                                        <div className="text-sm mt-1">Be the first to review!</div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {reviews.map((rev) => (
                                            <div key={rev.id} className="bg-white border border-gray-200 rounded-2xl p-5">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-[#6DB6E3] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        {rev.user?.fullName?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-sm">{rev.user?.fullName}</div>
                                                        <div className="text-xs text-gray-400">
                                                            {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto flex gap-0.5">
                                                        {Array.from({ length: rev.rating }).map((_, i) => (
                                                            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed">{rev.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT - Booking Card */}
                        <div className="w-80 flex-shrink-0">
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg sticky top-24">
                                <div className="text-xs text-gray-400 mb-1">Start from</div>
                                <div className="text-2xl font-black text-blue-600 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                                    Rp {packages[selectedPkg].price.toLocaleString('id-ID')}
                                </div>
                                <div className="text-xs text-gray-500 mb-5">
                                    Package: <span className="font-semibold text-gray-700">{packages[selectedPkg].name}</span>
                                </div>
                                <div className="space-y-3 mb-5">
                                    <div className="border border-gray-200 rounded-xl p-3">
                                        <div className="text-xs font-bold text-gray-500 mb-1">EVENT DATE</div>
                                        <input type="date" className="w-full text-sm text-gray-700 outline-none" />
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-3">
                                        <div className="text-xs font-bold text-gray-500 mb-1">GUESTS</div>
                                        <input type="number" placeholder="Number of guests" className="w-full text-sm text-gray-700 outline-none" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/checkout?type=${type}&itemId=${item.id}&package=${packages[selectedPkg].name}&price=${packages[selectedPkg].price}`)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 mb-3"
                                >
                                    Book Now <ChevronRight size={16} />
                                </button>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400 justify-center">
                                    <Shield size={12} /> Secure booking · Free cancellation
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

export default Detail