import { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import HeroSection from '../../components/home/HeroSection'
import CategorySection from '../../components/home/CategorySection'
import ExploreSection from '../../components/home/ExploreSection'
import PackageSection from '../../components/home/PackageSection'
import PromoBanner from '../../components/home/PromoBanner'
import WhySection from '../../components/home/WhySection'
import CTASection from '../../components/home/CTASection'
import Footer from '../../components/footer/Footer'

function Home() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategorySection activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <ExploreSection activeCategory={activeCategory} />
      <PackageSection />
      <PromoBanner />
      <WhySection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home