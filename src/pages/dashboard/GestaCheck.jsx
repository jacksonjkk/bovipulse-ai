import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { Baby, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react'

const cows = [
  { id: 'A101', name: 'Daisy', stage: 'Pregnant', days: 'Day 145', due: 'Oct 12, 2026', status: 'Healthy', color: 'text-green-700 bg-green-50' },
  { id: 'A102', name: 'Molly', stage: 'Pregnant', days: 'Day 82', due: 'Nov 24, 2026', status: 'Healthy', color: 'text-green-700 bg-green-50' },
  { id: 'A103', name: 'Bella', stage: 'In Heat', days: 'Standing', due: 'Scan today', status: 'Action Needed', color: 'text-orange-600 bg-orange-50' },
  { id: 'A104', name: 'Luna', stage: 'Open', days: 'Day 21', due: 'Monitor', status: 'Normal', color: 'text-blue-600 bg-blue-50' },
  { id: 'A105', name: 'Stella', stage: 'Pregnant', days: 'Day 210', due: 'Aug 05, 2026', status: 'Healthy', color: 'text-green-700 bg-green-50' },
]

const pregnancyStats = [
  { label: 'Pregnant', value: '34', pct: 26.6, color: 'bg-green-500' },
  { label: 'In Heat', value: '4', pct: 3.1, color: 'bg-orange-400' },
  { label: 'Open', value: '12', pct: 9.4, color: 'bg-blue-400' },
  { label: 'Lactating', value: '78', pct: 60.9, color: 'bg-pink-500' },
]

export default function GestaCheck() {
  return (
    <DashboardLayout title="GestaCheck">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Overview */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Reproductive Overview</h2>
          <div className="w-36 h-36 mx-auto relative mb-5">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F3F4F6" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4CAF50" strokeWidth="3.5"
                strokeDasharray="26.6 100" strokeDashoffset="0" strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FB8C00" strokeWidth="3.5"
                strokeDasharray="3.1 100" strokeDashoffset="-26.6" strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4FC3F7" strokeWidth="3.5"
                strokeDasharray="9.4 100" strokeDashoffset="-29.7" strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EC407A" strokeWidth="3.5"
                strokeDasharray="60.9 100" strokeDashoffset="-39.1" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Baby size={20} className="text-green-600 mb-1" />
              <div className="text-xl font-black text-gray-900">128</div>
              <div className="text-[10px] text-gray-500">Total</div>
            </div>
          </div>
          <div className="space-y-2.5">
            {pregnancyStats.map(s => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-600">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                  {s.label}
                </span>
                <span className="font-bold text-gray-900">{s.value} ({s.pct}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Pregnancy Tracking</h2>
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-green-800 transition-all cursor-pointer">
              <Calendar size={14} /> Log New Scan
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-2.5 pr-4">ID</th>
                  <th className="py-2.5 pr-4">Name</th>
                  <th className="py-2.5 pr-4">Stage</th>
                  <th className="py-2.5 pr-4">Days</th>
                  <th className="py-2.5 pr-4">Due / Next</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {cows.map(c => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * cows.indexOf(c) }}
                    className="border-b border-gray-50 hover:bg-green-50/20 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-green-700">{c.id}</td>
                    <td className="py-3 pr-4 font-medium text-gray-900">{c.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{c.stage}</td>
                    <td className="py-3 pr-4 text-gray-500">{c.days}</td>
                    <td className="py-3 pr-4 text-gray-500">{c.due}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${c.color}`}>
                        {c.status === 'Healthy' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                        {c.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
