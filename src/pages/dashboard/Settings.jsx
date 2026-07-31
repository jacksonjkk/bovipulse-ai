import { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { User, Building2, Bell, Shield, Globe, Save, Upload } from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'farm', label: 'Farm', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'language', label: 'Language', icon: Globe },
]

export default function Settings() {
  const [tab, setTab] = useState('profile')
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@farm.com', phone: '+1 (555) 123-4567', role: 'Farmer' })
  const [farm, setFarm] = useState({ name: 'Greenfield Farm', type: 'Dairy Farm', location: 'Ames, Iowa, USA', size: '128' })
  const [notif, setNotif] = useState({ health: true, repro: true, thermal: false, reports: true })
  const handleChange = (setter, field) => e => setter(v => ({ ...v, [field]: e.target.value }))

  return (
    <DashboardLayout title="Settings">
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 h-fit">
          {tabs.map(t => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors mb-0.5 cursor-pointer ${
                  active ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-green-50/50 hover:text-green-700'
                }`}>
                <Icon size={18} /> {t.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {tab === 'profile' && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-700">JD</div>
                  <div>
                    <button className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-all cursor-pointer">
                      <Upload size={14} /> Change Photo
                    </button>
                    <p className="text-[11px] text-gray-400 mt-1.5">JPG or PNG, max 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', field: 'name', value: profile.name },
                    { label: 'Email Address', field: 'email', value: profile.email },
                    { label: 'Phone Number', field: 'phone', value: profile.phone },
                    { label: 'Role', field: 'role', value: profile.role },
                  ].map(f => (
                    <div key={f.field} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">{f.label}</label>
                      <input value={f.value} onChange={handleChange(setProfile, f.field)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'farm' && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-6">Farm Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Farm Name', field: 'name', value: farm.name },
                    { label: 'Farm Type', field: 'type', value: farm.type },
                    { label: 'Location', field: 'location', value: farm.location },
                    { label: 'Herd Size', field: 'size', value: farm.size },
                  ].map(f => (
                    <div key={f.field} className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">{f.label}</label>
                      <input value={f.value} onChange={handleChange(setFarm, f.field)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'health', label: 'Health Alerts', desc: 'Real-time health notifications for your herd' },
                    { id: 'repro', label: 'Reproductive Updates', desc: 'Breeding cycles and pregnancy status changes' },
                    { id: 'thermal', label: 'Thermal Surveillance', desc: 'Fever detection and temperature warnings' },
                    { id: 'reports', label: 'Report Ready', desc: 'When new reports are generated' },
                  ].map(n => (
                    <div key={n.id} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{n.label}</div>
                        <div className="text-[11px] text-gray-500">{n.desc}</div>
                      </div>
                      <button onClick={() => setNotif(v => ({ ...v, [n.id]: !v[n.id] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer ${notif[n.id] ? 'bg-green-600' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notif[n.id] ? 'translate-x-5' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'security' && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-6">Security</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">New Password</label>
                      <input type="password" placeholder="New password" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-700">Confirm Password</label>
                      <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
                    <Shield size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-green-800">Two-Factor Authentication</div>
                      <div className="text-[11px] text-green-700/70">Recommended for account security. Add an extra layer of protection to your account.</div>
                      <button className="mt-2 text-xs font-semibold text-green-700 bg-white border border-green-200 px-4 py-2 rounded-lg hover:bg-green-100 transition-all cursor-pointer">Enable 2FA</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'language' && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-6">Language & Units</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">Language</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all">
                      <option>English</option>
                      <option>Swahili</option>
                      <option>French</option>
                      <option>Portuguese</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">Units</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all">
                      <option>Metric (°C, kg)</option>
                      <option>Imperial (°F, lbs)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button className="inline-flex items-center gap-2 text-sm font-bold text-white bg-green-700 px-6 py-3 rounded-xl hover:bg-green-800 transition-all active:scale-[0.97] cursor-pointer">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
