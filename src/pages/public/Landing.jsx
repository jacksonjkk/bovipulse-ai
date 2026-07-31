import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Activity, Thermometer, Baby, Cloud, BarChart3 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const features = [
  {
    icon: Activity,
    title: 'MuzzleID',
    desc: 'Biometric cattle identification using muzzle pattern recognition.',
  },
  {
    icon: Thermometer,
    title: 'ThermaGuard',
    desc: 'AI-powered disease surveillance using thermal and visual analysis.',
  },
  {
    icon: Baby,
    title: 'GestaCheck',
    desc: 'Predictive reproductive health monitoring and pregnancy diagnostics.',
  },
  {
    icon: Cloud,
    title: 'Hybrid Cloud-Edge',
    desc: 'Seamless operation online and offline with real-time data sync.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Actionable insights and reports for better livestock management.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl pt-24 pb-16">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold tracking-wide mb-5 border border-green-200/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AI-Powered Livestock Intelligence
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-5"
            >
              Smart Livestock.<br />
              <span className="text-green-700">Healthier Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-500 leading-relaxed max-w-lg mb-8"
            >
              AI-Powered livestock health monitoring, disease detection, and predictive diagnostics in the palm of your hand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                to="/signup"
                className="inline-flex items-center gap-2.5 bg-green-700 text-white px-7 py-3.5 rounded-xl text-sm font-bold hover:bg-green-800 transition-all hover:shadow-lg hover:shadow-green-700/20 active:scale-[0.97]"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <button className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold text-green-700 border-2 border-green-700 hover:bg-green-50 transition-all active:scale-[0.97]">
                <span className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center">
                  <Play size={12} className="text-white fill-white" />
                </span>
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-bold text-green-700"
                  >
                    {['JD', 'MK', 'AL', 'SR'][i - 1]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                Trusted by 500+ Farmers &amp; Veterinarians Worldwide
              </span>
            </motion.div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute right-0 top-0 bottom-0 w-[55%] lg:w-[60%] z-0 hidden lg:block"
        >
          <img
            src="https://images.pexels.com/photos/5633476/pexels-photo-5633476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Holstein Friesian cows grazing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </motion.div>
      </section>

      {/* FEATURES BAR */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 -mt-6"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-[0_-4px_32px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={i}
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="p-6 md:p-8 text-center hover:bg-green-50/50 transition-colors group"
                  >
                    <div className="flex justify-center mb-3.5">
                      <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                        <Icon size={24} />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5">{f.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* BOTTOM BANNER */}
      <section className="mt-12 mb-0 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Secure. Reliable. Designed for Farmers.</p>
              <p className="text-xs text-gray-500">Your data is safe with us. Built with advanced security and offline capabilities.</p>
            </div>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:gap-3 transition-all flex-shrink-0"
          >
            Learn More
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
