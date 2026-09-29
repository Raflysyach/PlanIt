import { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import VenuesFilter from '../../components/venues/VenuesFilter'
import VenuesGrid from '../../components/venues/VenuesGrid'

function Venues() {
  const [category, setCategory] = useState('All')
  const [locations, setLocations] = useState<string[]>([])
  const [ratings, setRatings] = useState<string[]>([])
  const [capacities, setCapacities] = useState<string[]>([])
  const [price, setPrice] = useState(100)

  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-10 flex gap-8">
          <VenuesFilter
            onCategoryChange={setCategory}
            onLocationChange={setLocations}
            onRatingChange={setRatings}
            onCapacityChange={setCapacities}
            onPriceChange={setPrice}
            onReset={() => {
              setCategory('All')
              setLocations([])
              setRatings([])
              setCapacities([])
              setPrice(100)
            }}
          />
          <VenuesGrid
            category={category}
            locations={locations}
            ratings={ratings}
            capacities={capacities}
            price={price}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Venues