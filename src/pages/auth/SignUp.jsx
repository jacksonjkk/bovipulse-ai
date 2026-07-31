import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function SignUp() {
  const navigate = useNavigate()
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); navigate('/role') }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 to-green-800">
      <img src="https://images.pexels.com/photos/5633473/pexels-photo-5633473.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-800/80" />

      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 lg:px-12 py-4">
        <Link to="/" className="flex items-center gap-2.5 text-white">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-lg">🐄</div>
          <span className="text-lg font-extrabold tracking-tight">BoviPulse</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/80 hidden sm:inline">Already have an account?</span>
          <Link to="/" className="flex items-center gap-1.5 px-4 py-2 border border-white/60 rounded-lg text-sm font-semibold text-white hover:bg-white/15 transition-all">
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <div className="hidden lg:block fixed left-12 top-1/2 -translate-y-1/2 z-10 max-w-[260px] text-white">
        <h2 className="text-2xl font-black leading-tight mb-3">Smarter Farming<br /><span className="text-green-400">Starts Here</span></h2>
        <p className="text-sm text-white/80 mb-5">AI-powered insights to monitor health, boost productivity, and build a healthier future for your herd.</p>
        <div className="flex flex-col gap-3.5">
          {[
            { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and protected.' },
            { icon: '☁️', title: 'Cloud Sync', desc: 'Access your data anytime, anywhere.' },
            { icon: '📊', title: 'AI-Powered Insights', desc: 'Make smarter decisions with real-time analytics.' },
            { icon: '🎧', title: '24/7 Support', desc: 'We\'re here to help you succeed.' },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-sm flex-shrink-0 backdrop-blur-sm">{f.icon}</span>
              <div>
                <div className="text-xs font-bold text-white">{f.title}</div>
                <div className="text-[11px] text-white/70">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block fixed right-12 bottom-16 z-10 bg-green-900/80 backdrop-blur-lg rounded-xl p-5 border border-white/15 min-w-[200px]">
        {[
          { icon: '🐄', val: '50,000+', label: 'Cattle Monitored' },
          { icon: '👥', val: '500+', label: 'Farmers Supported' },
          { icon: '🛡️', val: '98%', label: 'Detection Accuracy' },
          { icon: '🌍', val: '10+', label: 'Regions Covered' },
        ].map((s, i) => (
          <div key={i} className={`flex items-center gap-3.5 ${i < 3 ? 'mb-4' : ''}`}>
            <span className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center text-xl">{s.icon}</span>
            <div>
              <div className="text-lg font-black text-white">{s.val}</div>
              <div className="text-[11px] text-white/75">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 pt-20 pb-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 w-[440px] shadow-2xl border border-white/50 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-2xl">🐄</div>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-1.5">Create Account</h1>
          <p className="text-sm text-gray-600 mb-6">Join <span className="text-green-700 font-bold">BoviPulse</span> and start managing your herd smarter.</p>

          <form className="flex flex-col gap-3 text-left" onSubmit={handleSubmit}>
            {[
              { name: 'name', placeholder: 'Full Name', icon: '👤' },
              { name: 'email', placeholder: 'Email Address', type: 'email', icon: '✉️' },
              { name: 'phone', placeholder: 'Phone Number', type: 'tel', icon: '📞' },
            ].map(f => (
              <div key={f.name} className="relative flex items-center">
                <span className="absolute left-3.5 text-green-600 pointer-events-none z-10">{f.icon}</span>
                <input name={f.name} value={form[f.name]} onChange={handleChange} type={f.type || 'text'} placeholder={f.placeholder} required
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-black/10 bg-white/70 text-sm text-gray-800 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
              </div>
            ))}
            {[
              { name: 'password', placeholder: 'Password', show: showPwd, toggle: () => setShowPwd(v => !v) },
              { name: 'confirm', placeholder: 'Confirm Password', show: showConfirm, toggle: () => setShowConfirm(v => !v) },
            ].map(f => (
              <div key={f.name} className="relative flex items-center">
                <span className="absolute left-3.5 text-green-600 pointer-events-none z-10">🔒</span>
                <input name={f.name} value={form[f.name]} onChange={handleChange} type={f.show ? 'text' : 'password'} placeholder={f.placeholder} required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-black/10 bg-white/70 text-sm text-gray-800 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                <button type="button" onClick={f.toggle} className="absolute right-3 text-gray-400 hover:text-green-600 transition-colors cursor-pointer">
                  {f.show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            ))}
            <button type="submit" className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-700 text-white text-sm font-bold rounded-xl hover:bg-green-800 transition-all hover:shadow-md active:scale-[0.97] mt-1.5">
              Create Account <ArrowRight size={18} />
            </button>
          </form>
          <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
            By creating an account, you agree to our{' '}
            <Link to="/" className="text-green-700 underline">Terms of Service</Link> and{' '}
            <Link to="/" className="text-green-700 underline">Privacy Policy</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
