import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft } from 'lucide-react'

export default function FarmSetup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ farmName: '', farmType: '', herdSize: '', location: '', years: '' })
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); navigate('/preferences') }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 relative flex">
      <img src="https://images.pexels.com/photos/10829198/pexels-photo-10829198.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1" alt="" className="fixed inset-0 w-full h-full object-cover opacity-20" />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex items-center justify-center p-6 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full">
          <button onClick={() => navigate('/role')} className="flex items-center gap-1.5 text-white/70 hover:text-white mb-6 transition-colors text-sm cursor-pointer">
            <ArrowLeft size={16} /> Back
          </button>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-2 rounded-full flex-1 ${s <= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
              ))}
              <span className="text-[11px] text-gray-500 font-medium">Step 2 of 3</span>
            </div>

            <h1 className="text-2xl font-black text-gray-900 mb-1.5">Set Up Your Farm</h1>
            <p className="text-sm text-gray-600 mb-7">Tell us about your farm so we can tailor the experience.</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Farm Name</label>
                  <input name="farmName" value={form.farmName} onChange={handleChange} placeholder="e.g. Greenfield Farm" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Farm Type</label>
                  <select name="farmType" value={form.farmType} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all">
                    <option value="">Select type</option>
                    <option>Dairy Farm</option>
                    <option>Beef Farm</option>
                    <option>Mixed Farm</option>
                    <option>Feedlot</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Herd Size</label>
                  <input name="herdSize" value={form.herdSize} onChange={handleChange} type="number" placeholder="e.g. 50" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Location</label>
                  <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Iowa, USA"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Years of Farming Experience</label>
                <select name="years" value={form.years} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all">
                  <option value="">Select years</option>
                  <option>Less than 1 year</option>
                  <option>1-3 years</option>
                  <option>4-7 years</option>
                  <option>8-15 years</option>
                  <option>15+ years</option>
                </select>
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-700 text-white text-sm font-bold rounded-xl hover:bg-green-800 transition-all hover:shadow-md active:scale-[0.97] mt-2 cursor-pointer">
                Continue <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
