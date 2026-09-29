import { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import OrganizersFilter from '../../components/organizers/OrganizersFilter'
import OrganizersGrid from '../../components/organizers/OrganizersGrid'

function EventOrganizers() {
  const [category, setCategory] = useState('All')
  const [locations, setLocations] = useState<string[]>([])
  const [ratings, setRatings] = useState<string[]>([])
  const [packageTypes, setPackageTypes] = useState<string[]>([])
  const [price, setPrice] = useState(100)

  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-10 flex gap-8">
          <OrganizersFilter
            onCategoryChange={setCategory}
            onLocationChange={setLocations}
            onRatingChange={setRatings}
            onPackageTypeChange={setPackageTypes}
            onPriceChange={setPrice}
            onReset={() => {
              setCategory('All')
              setLocations([])
              setRatings([])
              setPackageTypes([])
              setPrice(100)
            }}
          />
          <OrganizersGrid
            category={category}
            locations={locations}
            ratings={ratings}
            packageTypes={packageTypes}
            price={price}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EventOrganizers