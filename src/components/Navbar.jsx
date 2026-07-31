import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const path = useLocation().pathname
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-green-100/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-lg">
            🐄
          </div>
          <span className="text-xl font-extrabold text-green-700 tracking-tight">BoviPulse</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                path === l.to
                  ? 'text-green-700 bg-green-50'
                  : 'text-gray-600 hover:text-green-700 hover:bg-green-50/50'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-green-700 transition-colors rounded-md hover:bg-green-50/50">
            <span className="text-base">🌐</span>
            EN
            <ChevronDown size={14} />
          </button>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition-all hover:shadow-md active:scale-[0.97]"
          >
            Get Started
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-green-100/50 bg-white/95 backdrop-blur-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    path === l.to ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-green-700 hover:bg-green-50/50'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="mt-2 text-center bg-green-700 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
              >
                Get Started →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
