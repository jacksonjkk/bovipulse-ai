import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Target, Layers, Star } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const techItems = [
  { label: 'AI & Machine Learning', sub: 'for smarter predictions' },
  { label: 'Computer Vision', sub: 'for accurate insights' },
  { label: 'Edge Computing', sub: 'for real-time processing' },
  { label: 'Cloud Sync', sub: 'for secure data access' },
]

const values = ['Innovation', 'Accuracy', 'Integrity', 'Sustainability', 'Farmer-Centric']

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2 overflow-hidden">
        <div className="px-6 lg:pl-20 lg:pr-12 py-16 lg:py-20 flex flex-col gap-4 z-10">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold tracking-[0.12em] text-green-600 uppercase flex items-center gap-2.5">
            <span>ABOUT US</span>
            <span className="w-8 h-0.5 rounded bg-green-600" />
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight">
            Empowering Farmers Through<br />
            <span className="text-green-700">Intelligent Livestock Technology</span>
          </motion.h1>
          {[
            'BoviPulse is an intelligent livestock health monitoring and predictive diagnostics platform designed to transform the future of livestock farming.',
            'Built on the principles of Precision Livestock Farming (PLF), BoviPulse combines Artificial Intelligence, Computer Vision, Machine Learning, and Hybrid Cloud-Edge Computing to help farmers make smarter decisions, detect diseases earlier, monitor reproductive health, and improve overall herd productivity.',
            'Our mission is to make advanced livestock intelligence accessible to every farmer, regardless of location, internet connectivity, or farm size.',
          ].map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="text-sm text-gray-600 leading-relaxed">{p}</motion.p>
          ))}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-green-700 font-bold italic">Smart Livestock. Healthier Futures.</motion.p>
        </div>

        <div className="relative overflow-hidden hidden lg:block" style={{ background: 'url(https://images.pexels.com/photos/10829198/pexels-photo-10829198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) center/cover' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
          <div className="absolute top-10 left-10 right-20 bg-white/90 backdrop-blur-lg rounded-2xl p-7 shadow-xl z-10">
            <h3 className="text-lg font-bold text-gray-900 mb-2">About BoviPulse</h3>
            <div className="w-10 h-0.5 rounded bg-green-600 mb-3.5" />
            <p className="text-xs text-gray-600 leading-relaxed mb-2">BoviPulse is an AI-powered platform that leverages advanced technologies to bring real-time insights and predictive intelligence to livestock management.</p>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">From biometric identification and thermal disease detection to reproductive monitoring and health analytics, BoviPulse empowers farmers and veterinarians.</p>
            <div className="grid grid-cols-2 gap-3">
              {techItems.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-green-50 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-semibold text-gray-800">{t.label}</div>
                    <div className="text-[10px] text-gray-500">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-16 right-8 bg-white rounded-xl p-4 shadow-lg z-20 w-44">
            {[
              { icon: '❤️', label: 'Health Score', value: '92', sub: 'Excellent', cls: 'text-green-600' },
              { icon: '🌡️', label: 'Body Temperature', value: '38.6°C', sub: 'Normal', cls: 'text-gray-900' },
              { icon: '💨', label: 'Respiration Rate', value: '28 /min', sub: 'Normal', cls: 'text-gray-900' },
            ].map((m, i) => (
              <div key={i} className={`flex gap-2.5 items-center ${i < 2 ? 'mb-3' : ''} ${i === 2 ? 'pt-2.5 border-t border-gray-100' : ''}`}>
                <span className="text-lg">{m.icon}</span>
                <div>
                  <div className="text-[10px] text-gray-500">{m.label}</div>
                  <div className={`text-lg font-extrabold ${m.cls}`}>{m.value}</div>
                  <div className="text-[10px] text-gray-400">{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3">
          {[
            { icon: Target, title: 'Our Vision', desc: 'A world where every farmer has the power to ensure healthier animals and a better future.' },
            { icon: Layers, title: 'Our Mission', desc: 'To revolutionize livestock health management through advanced AI technology and data-driven insights.' },
            { icon: Star, title: 'Our Values', desc: values },
          ].map((v, i) => (
            <div key={i} className={`p-8 ${i < 2 ? 'border-r border-gray-200' : ''} flex flex-col gap-3`}>
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <v.icon size={28} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-green-700">{v.title}</h3>
              {typeof v.desc === 'string' ? (
                <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {v.desc.map(d => (
                    <div key={d} className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                      <svg width="14" height="14" fill="#2E7D32" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                      {d}
                    </div>
                  ))}
                </div>
              )}
              {i === 1 && <div className="w-8 h-0.5 rounded bg-green-600" />}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
