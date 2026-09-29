import { Link } from 'react-router-dom'

const exploreLinks = [
  { label: 'Venues', to: '/venues' },
  { label: 'Event Organizers', to: '/event-organizers' },
  { label: 'Package Deals', to: '/packages' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Press', to: '/press' },
]

const supportLinks = [
  { label: 'Help Center', to: '/help' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Safety & Trust', to: '/safety' },
  { label: 'Cancellation Policy', to: '/cancellation' },
  { label: 'Contact Us', to: '/contact' },
]

const legalLinks = [
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Cookie Policy', to: '/cookies' },
]

const socials = ['IG', 'FB', 'TW', 'TT']

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-20 pt-16 pb-8">
      <div className="grid grid-cols-4 gap-12 mb-12">

        <div>
          <div className="flex items-center mb-3">
            <span className="font-black text-xl text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Plan<span className="text-blue-600">It</span>
            </span>
            <span className="w-2 h-2 bg-[#6DB6E3] rounded-full mb-3 ml-0.5"></span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs">
            Book venues & event organizers easily and securely — all in one platform.
          </p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold hover:border-[#6DB6E3] hover:text-[#4A9DD4] transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-bold text-gray-900 text-sm mb-4">Explore</div>
          <ul className="space-y-3">
            {exploreLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-gray-500 hover:text-[#4A9DD4] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-bold text-gray-900 text-sm mb-4">Company</div>
          <ul className="space-y-3">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-gray-500 hover:text-[#4A9DD4] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-bold text-gray-900 text-sm mb-4">Support</div>
          <ul className="space-y-3">
            {supportLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-gray-500 hover:text-[#4A9DD4] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <p className="text-xs text-gray-400">© 2026 PlanIt. All rights reserved.</p>
        <div className="flex gap-5">
          {legalLinks.map((item) => (
            <Link key={item.label} to={item.to} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer