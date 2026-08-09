import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { Syringe, CheckCircle2, Clock, Plus } from 'lucide-react'

const vaccines = [
  { id: 'VX-001', name: 'Foot and Mouth Disease', dose: 'Booster', schedule: 'Bi-annual', next: 'Aug 15, 2026', coverage: '95%', status: 'On Track' },
  { id: 'VX-002', name: 'Brucellosis', dose: 'Primary', schedule: 'Annual', next: 'Sep 02, 2026', coverage: '88%', status: 'On Track' },
  { id: 'VX-003', name: 'Blackleg', dose: 'Booster', schedule: 'Annual', next: 'Aug 05, 2026', coverage: '72%', status: 'Due Soon' },
  { id: 'VX-004', name: 'Anthrax', dose: 'Primary', schedule: 'Annual', next: 'Oct 20, 2026', coverage: '91%', status: 'On Track' },
  { id: 'VX-005', name: 'Bovine Viral Diarrhea', dose: 'Booster', schedule: 'Bi-annual', next: 'Sep 18, 2026', coverage: '65%', status: 'Overdue' },
]

const upcoming = [
  { name: 'Foot and Mouth Disease', count: '12 cows', date: 'Today', color: 'bg-orange-50 text-orange-600' },
  { name: 'Blackleg Booster', count: '8 cows', date: 'Aug 05', color: 'bg-green-50 text-green-700' },
  { name: 'Brucellosis', count: '15 cows', date: 'Sep 02', color: 'bg-blue-50 text-blue-600' },
]

export default function Vaccinations() {
  return (
    <DashboardLayout title="Vaccinations">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
            <Syringe size={22} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Vaccination Programs</h2>
            <p className="text-xs text-gray-500">Track and manage herd vaccinations</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-green-700 px-4 py-2.5 rounded-lg hover:bg-green-800 transition-all cursor-pointer">
          <Plus size={14} /> Log Vaccination
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Program Status</h3>
          <div className="overflow-x-auto">
            <table className="r-table w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-2.5 pr-4">Vaccine</th>
                  <th className="py-2.5 pr-4">Dose</th>
                  <th className="py-2.5 pr-4">Schedule</th>
                  <th className="py-2.5 pr-4">Next Due</th>
                  <th className="py-2.5 pr-4">Coverage</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map(v => (
                  <motion.tr key={v.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(0.05 * vaccines.indexOf(v), 0.25) }}
                    className="border-b border-gray-50 hover:bg-green-50/20 transition-colors">
                    <td data-label="Vaccine" className="py-3 pr-4 font-medium text-gray-900">{v.name}</td>
                    <td data-label="Dose" className="py-3 pr-4 text-gray-600">{v.dose}</td>
                    <td data-label="Schedule" className="py-3 pr-4 text-gray-500">{v.schedule}</td>
                    <td data-label="Next Due" className="py-3 pr-4 text-gray-500">{v.next}</td>
                    <td data-label="Coverage" className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 rounded-full bg-gray-100">
                          <div className="h-full rounded-full bg-green-500" style={{ width: `${v.coverage}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-800">{v.coverage}</span>
                      </div>
                    </td>
                    <td data-label="Status" className="py-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
                        v.status === 'On Track' ? 'text-green-700 bg-green-50' : v.status === 'Due Soon' ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50'
                      }`}>
                        {v.status === 'On Track' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {v.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Upcoming</h3>
          <div className="space-y-3">
            {upcoming.map((u, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-gray-100 hover:border-green-200 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-800">{u.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.color}`}>{u.date}</span>
                </div>
                <div className="text-[11px] text-gray-500">{u.count}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-green-800">Herd Coverage</span>
              <span className="text-lg font-black text-green-700">85%</span>
            </div>
            <div className="h-2 rounded-full bg-green-100">
              <div className="h-full rounded-full bg-green-600" style={{ width: '85%' }} />
            </div>
            <p className="text-[11px] text-green-700/70 mt-2">Overall vaccination coverage across all programs</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
