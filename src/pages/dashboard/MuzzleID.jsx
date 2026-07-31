import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { ScanLine, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react'

const cattle = [
  { id: 'A124', name: 'Daisy', breed: 'Holstein Friesian', status: 'Identified', match: '98.7%', confidence: 'High', last: 'Today, 08:30 AM' },
  { id: 'A125', name: 'Bella', breed: 'Holstein Friesian', status: 'Identified', match: '96.2%', confidence: 'High', last: 'Today, 07:45 AM' },
  { id: 'A126', name: 'Molly', breed: 'Jersey', status: 'Identified', match: '94.1%', confidence: 'Medium', last: 'Yesterday, 04:20 PM' },
  { id: 'A127', name: 'Luna', breed: 'Holstein Friesian', status: 'Pending', match: '72.4%', confidence: 'Low', last: 'Yesterday, 02:10 PM' },
  { id: 'A128', name: 'Stella', breed: 'Ayrshire', status: 'Identified', match: '99.1%', confidence: 'High', last: 'Mon, 10:30 AM' },
]

export default function MuzzleID() {
  return (
    <DashboardLayout title="MuzzleID">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scan Panel */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-52 h-52 mb-5">
            <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-green-400 animate-pulse" />
            <div className="absolute inset-3 rounded-xl bg-green-50 flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/4909805/pexels-photo-4909805.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
                alt="Cow muzzle scan"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <ScanLine size={16} className="text-white" />
            </div>
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">Muzzle Pattern Scan</h3>
          <p className="text-xs text-gray-500 mb-4">Capture a muzzle photo to identify the animal</p>
          <button className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-green-800 transition-all active:scale-[0.97] cursor-pointer">
            <ScanLine size={16} /> Start Scan
          </button>
          <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1.5">
            <RefreshCw size={12} /> AI Model v2.1 • 98% accuracy
          </p>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Recent Identifications</h2>
            <button className="text-xs font-semibold text-green-600 hover:text-green-700 cursor-pointer">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-2.5 pr-4">ID</th>
                  <th className="py-2.5 pr-4">Name</th>
                  <th className="py-2.5 pr-4">Breed</th>
                  <th className="py-2.5 pr-4">Match</th>
                  <th className="py-2.5 pr-4">Status</th>
                  <th className="py-2.5">Last Scan</th>
                </tr>
              </thead>
              <tbody>
                {cattle.map(c => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * cattle.indexOf(c) }}
                    className="border-b border-gray-50 hover:bg-green-50/30 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-green-700">{c.id}</td>
                    <td className="py-3 pr-4 font-medium text-gray-900">{c.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{c.breed}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-gray-100">
                          <div className={`h-full rounded-full ${c.confidence === 'High' ? 'bg-green-500' : c.confidence === 'Medium' ? 'bg-orange-400' : 'bg-red-500'}`} style={{ width: c.match }} />
                        </div>
                        <span className="text-xs font-bold text-gray-800">{c.match}%</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
                        c.status === 'Identified' ? 'text-green-700 bg-green-50' : 'text-orange-600 bg-orange-50'
                      }`}>
                        {c.status === 'Identified' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 text-xs">{c.last}</td>
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
