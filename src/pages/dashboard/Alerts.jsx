import { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { Bell, AlertTriangle, Info, CheckCircle2, CheckCheck } from 'lucide-react'

const alerts = [
  { type: 'warning', icon: AlertTriangle, title: 'High Temperature Detected', msg: 'Cow #A126 (Molly) has a body temperature of 40.4°C, above the normal range.', time: '10 min ago', urgent: true },
  { type: 'info', icon: Info, title: 'Vaccination Due Today', msg: '12 cows are scheduled for their bi-annual vaccination.', time: '1 hour ago', urgent: false },
  { type: 'success', icon: CheckCircle2, title: 'GestaCheck Complete', msg: 'Pregnancy confirmation scans completed for 3 cows. All healthy.', time: '3 hours ago', urgent: false },
  { type: 'warning', icon: AlertTriangle, title: 'Low Feed Inventory', msg: 'Dairy feed is below 15% of target. Consider restocking.', time: '5 hours ago', urgent: true },
  { type: 'info', icon: Info, title: 'MuzzleID Model Update', msg: 'A new AI model version is available. Update recommended.', time: 'Yesterday', urgent: false },
  { type: 'success', icon: CheckCircle2, title: 'Report Generated', msg: 'Monthly herd health report is ready to download.', time: 'Yesterday', urgent: false },
]

export default function Alerts() {
  const [read, setRead] = useState({})

  return (
    <DashboardLayout title="Alerts">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
            <Bell size={22} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <p className="text-xs text-gray-500">{alerts.filter(a => a.urgent).length} urgent alerts need attention</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-4 py-2.5 rounded-lg hover:bg-green-100 transition-all cursor-pointer">
          <CheckCheck size={14} /> Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((a, i) => {
          const Icon = a.icon
          const isRead = read[a.title]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setRead(r => ({ ...r, [a.title]: true }))}
              className={`flex items-start gap-4 p-4 rounded-xl border bg-white transition-all hover:shadow-md cursor-pointer ${
                a.urgent && !isRead ? 'border-orange-200 bg-orange-50/40' : 'border-gray-200'
              } ${isRead ? 'opacity-60' : ''}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                a.type === 'warning' ? 'bg-orange-100 text-orange-500' :
                a.type === 'info' ? 'bg-blue-100 text-blue-500' : 'bg-green-100 text-green-600'
              }`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{a.title}</h3>
                  <span className="text-[11px] text-gray-400 flex-shrink-0">{a.time}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{a.msg}</p>
              </div>
              {a.urgent && !isRead && (
                <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-1 rounded-full flex-shrink-0">URGENT</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
