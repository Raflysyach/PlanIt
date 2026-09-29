import { Heart, Music, Cake, GraduationCap, Camera, Briefcase } from 'lucide-react'

const categories = [
  { name: 'All', icon: Heart },
  { name: 'Wedding', icon: Heart },
  { name: 'Concert', icon: Music },
  { name: 'Birthday', icon: Cake },
  { name: 'Seminar', icon: GraduationCap },
  { name: 'Photoshoot', icon: Camera },
  { name: 'Corporate', icon: Briefcase },
]

interface Props {
  activeCategory: string
  onCategoryChange: (cat: string) => void
}

function CategorySection({ activeCategory, onCategoryChange }: Props) {
  return (
    <section className="px-20 py-20">
      <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
        Explore by category
      </h2>
      <p className="text-gray-500 text-sm mb-8">Pick the type of event you're planning.</p>

      <div className="grid grid-cols-7 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.name
          return (
            <div
              key={cat.name}
              onClick={() => onCategoryChange(cat.name)}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border cursor-pointer transition-all duration-200
                ${isActive
                  ? 'border-[#6DB6E3] bg-[#EBF5FC]'
                  : 'border-gray-200 bg-white hover:border-[#6DB6E3] hover:shadow-md hover:-translate-y-1'
                }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
                ${isActive ? 'bg-[#D6EDF9]' : 'bg-[#EBF5FC]'}`}>
                <Icon size={20} className="text-[#4A9DD4]" />
              </div>
              <span className="text-xs font-bold text-gray-700 text-center">{cat.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CategorySection