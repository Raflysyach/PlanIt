import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'

const categories = ['Wedding', 'Concert', 'Birthday', 'Seminar', 'Photoshoot', 'Corporate']
const locations = ['Jakarta', 'Bogor', 'Tangerang', 'Bandung', 'Jawa Tengah', 'Bali']
const ratings = ['4.5+ stars', '4+ stars', '3.5+ stars']
const capacities = ['< 100 guests', '100 – 300', '300 – 500', '500+']

interface VenuesFilterProps {
  onCategoryChange: (cat: string) => void
  onLocationChange: (locs: string[]) => void
  onRatingChange: (ratings: string[]) => void
  onCapacityChange: (caps: string[]) => void
  onPriceChange: (price: number) => void
  onReset: () => void
}

function VenuesFilter({
  onCategoryChange,
  onLocationChange,
  onRatingChange,
  onCapacityChange,
  onPriceChange,
  onReset,
}: VenuesFilterProps) {
  const [selectedCat, setSelectedCat] = useState('All')
  const [selectedLocs, setSelectedLocs] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])
  const [selectedCaps, setSelectedCaps] = useState<string[]>([])
  const [price, setPrice] = useState(100)

  const toggleCheck = (
    val: string,
    list: string[],
    setList: (l: string[]) => void,
    onChange: (l: string[]) => void
  ) => {
    const updated = list.includes(val) ? list.filter((v) => v !== val) : [...list, val]
    setList(updated)
    onChange(updated)
  }

  const handleReset = () => {
    setSelectedCat('All')
    setSelectedLocs([])
    setSelectedRatings([])
    setSelectedCaps([])
    setPrice(100)
    onReset()
  }

  return (
    <div className="w-72 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <SlidersHorizontal size={16} className="text-[#6DB6E3]" />
            Filters
          </div>
          <button onClick={handleReset} className="text-xs text-blue-600 font-semibold hover:underline">
            Reset
          </button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Category</div>
          <div className="space-y-2">
            {['All', ...categories].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCat === cat}
                  onChange={() => { setSelectedCat(cat); onCategoryChange(cat) }}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6 border-t border-gray-100 pt-5">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Location</div>
          <div className="space-y-2">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedLocs.includes(loc)}
                  onChange={() => toggleCheck(loc, selectedLocs, setSelectedLocs, onLocationChange)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{loc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 border-t border-gray-100 pt-5">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price Range</div>
          <input
            type="range" min={5} max={100} value={price}
            onChange={(e) => { setPrice(Number(e.target.value)); onPriceChange(Number(e.target.value)) }}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Rp 5jt</span>
            <span>Rp {price}jt</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6 border-t border-gray-100 pt-5">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Rating</div>
          <div className="space-y-2">
            {ratings.map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(r)}
                  onChange={() => toggleCheck(r, selectedRatings, setSelectedRatings, onRatingChange)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Capacity */}
        <div className="border-t border-gray-100 pt-5">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Capacity</div>
          <div className="space-y-2">
            {capacities.map((cap) => (
              <label key={cap} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCaps.includes(cap)}
                  onChange={() => toggleCheck(cap, selectedCaps, setSelectedCaps, onCapacityChange)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{cap}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default VenuesFilter