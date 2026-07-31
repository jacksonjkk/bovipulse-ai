import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Heart, AlertTriangle, Baby, Fingerprint, Thermometer, Syringe, Bell } from 'lucide-react'
import DashboardLayout from './DashboardLayout'

const stats = [
  { icon: Activity, label: 'Total Cattle', value: '128', change: '+3 this week', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Heart, label: 'Healthy', value: '117', change: '91.4%', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: AlertTriangle, label: 'At Risk', value: '5', change: '3.9%', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Baby, label: 'Pregnant', value: '34', change: '26.6%', color: 'text-pink-500', bg: 'bg-pink-50' },
]

const recentAlerts = [
  { type: 'warning', msg: 'Cow #A124 showing abnormal temperature', time: '10 min ago' },
  { type: 'info', msg: 'Vaccination schedule for 12 cows today', time: '1 hour ago' },
  { type: 'success', msg: 'GestaCheck complete for 3 cows', time: '3 hours ago' },
  { type: 'warning', msg: 'Low feed inventory alert', time: '5 hours ago' },
]

const quickActions = [
  { icon: Fingerprint, label: 'Scan MuzzleID', to: '/dashboard/muzzleid', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Thermometer, label: 'Thermal Scan', to: '/dashboard/thermaguard', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Baby, label: 'GestaCheck', to: '/dashboard/gestacheck', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: Syringe, label: 'Log Vaccination', to: '/dashboard/vaccinations', color: 'text-blue-500', bg: 'bg-blue-50' },
]

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-xl border border-gray-200 p-4 lg:p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon size={20} className={s.color} />
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
                <div className={`text-[11px] font-semibold mt-0.5 ${s.color}`}>{s.change}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Two column */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Recent Alerts</h2>
              <Link to="/dashboard/alerts" className="text-xs font-semibold text-green-600 hover:text-green-700">View All</Link>
            </div>
            <div className="space-y-2">
              {recentAlerts.map((a, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${
                  a.type === 'warning' ? 'border-orange-100 bg-orange-50/50' :
                  a.type === 'info' ? 'border-blue-100 bg-blue-50/50' : 'border-green-100 bg-green-50/50'
                }`}>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    a.type === 'warning' ? 'bg-orange-500' : a.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{a.msg}</p>
                    <p className="text-[10px] text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Herd Health Overview</h2>
            <div className="space-y-4">
              {[
                { label: 'Healthy', pct: 91.4, color: 'bg-green-500' },
                { label: 'At Risk', pct: 3.9, color: 'bg-orange-500' },
                { label: 'Needs Check', pct: 4.7, color: 'bg-red-500' },
              ].map((h, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{h.label}</span>
                    <span className="font-bold text-gray-900">{h.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${h.color}`} style={{ width: `${h.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Total Cattle</span>
                <span className="text-lg font-black text-gray-900">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Active Today</span>
                <span className="text-lg font-black text-gray-900">94</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell size={16} className="text-green-600" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((a, i) => {
              const Icon = a.icon
              return (
                <Link
                  key={i}
                  to={a.to}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 ${a.bg} hover:shadow-md transition-all text-left`}
                >
                  <Icon size={20} className={a.color} />
                  <span className="text-xs font-semibold text-gray-800">{a.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
