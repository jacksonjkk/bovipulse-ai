import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Lock, MapPin, Send } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); alert('Message sent! We\'ll get back to you soon.') }

  const features = [
    { icon: '🎧', title: 'Expert Support', desc: 'Get help from our livestock tech experts' },
    { icon: '💬', title: 'Quick Response', desc: 'We typically respond within 24 hours' },
    { icon: '🔒', title: 'Your Data is Safe', desc: 'We prioritize the security and privacy of your data' },
  ]

  const infoCards = [
    { icon: '✉️', title: 'Email Us', desc: 'Send us an email anytime.', detail: 'support@bovipulse.com', link: true },
    { icon: '📞', title: 'Call Us', desc: 'Mon - Fri, 9:00 AM - 6:00 PM', detail: '+1 (555) 123-4567', link: true },
    { icon: '📍', title: 'Visit Us', desc: `123 Greenfield Way, Suite 100\nAmes, IA 50010, USA` },
    { icon: '🔗', title: 'Follow Us', desc: 'Stay updated with our latest news', social: true },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2 overflow-hidden">
        <div className="px-6 lg:pl-20 lg:pr-12 py-16 lg:py-20 flex flex-col gap-5 relative z-10 bg-white">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold tracking-[0.12em] text-green-600 uppercase flex items-center gap-2.5">
            <span>CONTACT US</span>
            <span className="w-8 h-0.5 rounded bg-green-600" />
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight">
            We're Here to Help<br /><span className="text-green-700">You and Your Herd</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm text-gray-600 leading-relaxed max-w-sm">
            Have questions about BoviPulse? Our team is ready to assist you.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-lg flex-shrink-0">{f.icon}</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{f.title}</div>
                  <div className="text-xs text-gray-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="bg-gray-50 flex items-center justify-center p-6 lg:pr-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-extrabold text-green-700 mb-1.5">Send Us a Message</h2>
            <p className="text-xs text-gray-500 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
            <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { name: 'name', placeholder: 'Full Name *', icon: '👤' },
                  { name: 'email', placeholder: 'Email Address *', type: 'email', icon: '✉️' },
                ].map(f => (
                  <div key={f.name} className="relative flex items-center">
                    <span className="absolute left-3.5 text-gray-400 pointer-events-none z-10">{f.icon}</span>
                    <input name={f.name} value={form[f.name]} onChange={handleChange} type={f.type || 'text'} placeholder={f.placeholder} required
                      className="w-full pl-9 pr-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/10 transition-all" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400 pointer-events-none z-10">📞</span>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number"
                    className="w-full pl-9 pr-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/10 transition-all" />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-400 pointer-events-none z-10">📌</span>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className="w-full pl-9 pr-8 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/10 transition-all appearance-none">
                    <option value="">Subject *</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </div>
              <div className="relative flex items-start">
                <span className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none z-10">✏️</span>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Type your message here..." rows={4} required
                  className="w-full pl-9 pr-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/10 transition-all resize-vertical" />
              </div>
              <button type="submit" className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-700 text-white text-sm font-bold rounded-lg hover:bg-green-800 transition-all hover:shadow-md active:scale-[0.97]">
                Send Message
                <Send size={16} />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <Lock size={12} /> Your information is secure and will never be shared.
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infoCards.map((c, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-7 flex flex-col gap-2 hover:shadow-md transition-all">
              <div className="w-13 h-13 rounded-full bg-green-50 flex items-center justify-center text-2xl mb-1">{c.icon}</div>
              <h3 className="text-sm font-bold text-green-700">{c.title}</h3>
              <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{c.desc}</p>
              {c.detail && !c.social && <span className="text-xs font-semibold text-green-600">{c.detail}</span>}
              {c.social && (
                <div className="flex gap-2 mt-1">
                  {['f', 'X', 'in', 'G'].map(s => (
                    <span key={s} className="w-8 h-8 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-xs font-bold text-green-700 hover:bg-green-700 hover:text-white transition-all cursor-pointer">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12 -mt-2">
        <div className="grid lg:grid-cols-[240px_1fr] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md h-72">
          <div className="bg-green-800 p-8 flex flex-col gap-4 text-white">
            <span className="text-2xl">📍</span>
            <div>
              <div className="text-sm font-bold">Our Location</div>
              <div className="text-xs font-semibold mt-1">BoviPulse HQ</div>
              <div className="text-[11px] text-white/75">123 Greenfield Way, Suite 100</div>
              <div className="text-[11px] text-white/75">Ames, IA 50010, USA</div>
              <button className="mt-3 bg-white text-green-700 border-none px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-green-50 transition-all cursor-pointer">
                Get Directions ↗
              </button>
            </div>
          </div>
          <div className="bg-gray-100">
            <iframe title="BoviPulse Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.0!2d-93.65!3d42.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDAxJzQ4LjAiTiA5M8KwMzknMDAuMCJX!5e0!3m2!1sen!2sus!4v1" width="100%" height="100%" style={{ border: 0, filter: 'saturate(0.7)' }} allowFullScreen="" loading="lazy" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
