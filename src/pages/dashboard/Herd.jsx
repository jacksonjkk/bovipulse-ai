import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Heart, AlertTriangle, Baby, Thermometer } from 'lucide-react'

const herd = [
  { id: 'A124', name: 'Daisy', breed: 'Holstein Friesian', age: '4 yr', weight: '620 kg', temp: '38.6°C', status: 'Healthy', health: 92, color: 'text-green-700 bg-green-50' },
  { id: 'A125', name: 'Bella', breed: 'Holstein Friesian', age: '3 yr', weight: '580 kg', temp: '38.2°C', status: 'Healthy', health: 95, color: 'text-green-700 bg-green-50' },
  { id: 'A126', name: 'Molly', breed: 'Jersey', age: '5 yr', weight: '490 kg', temp: '40.4°C', status: 'At Risk', health: 58, color: 'text-red-600 bg-red-50' },
  { id: 'A127', name: 'Luna', breed: 'Holstein Friesian', age: '2 yr', weight: '540 kg', temp: '39.8°C', status: 'Monitor', health: 71, color: 'text-orange-600 bg-orange-50' },
  { id: 'A128', name: 'Stella', breed: 'Ayrshire', age: '6 yr', weight: '610 kg', temp: '38.5°C', status: 'Healthy', health: 88, color: 'text-green-700 bg-green-50' },
  { id: 'A129', name: 'Bessie', breed: 'Holstein Friesian', age: '4 yr', weight: '600 kg', temp: '38.7°C', status: 'Pregnant', health: 90, color: 'text-pink-600 bg-pink-50' },
  { id: 'A130', name: 'Clover', breed: 'Holstein Friesian', age: '3 yr', weight: '565 kg', temp: '38.4°C', status: 'Healthy', health: 93, color: 'text-green-700 bg-green-50' },
  { id: 'A131', name: 'Rosie', breed: 'Brown Swiss', age: '5 yr', weight: '640 kg', temp: '39.1°C', status: 'Monitor', health: 74, color: 'text-orange-600 bg-orange-50' },
]

const summary = [
  { icon: Heart, label: 'Healthy', value: '117', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: AlertTriangle, label: 'At Risk', value: '5', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: Baby, label: 'Pregnant', value: '34', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: Thermometer, label: 'Temp Alerts', value: '3', color: 'text-orange-500', bg: 'bg-orange-50' },
]

export default function Herd() {
  return (
    <DashboardLayout title="Herd Management">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summary.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon size={20} className={s.color} />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
          <h3 className="text-sm font-bold text-gray-900">Your Herd</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search cattle..." className="pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm w-52 focus:border-green-500 focus:bg-white focus:ring-3 focus:ring-green-500/15 transition-all" />
            </div>
            <button className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 px-3.5 py-2.5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
              <Filter size={14} /> Filter
            </button>
            <button className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-green-700 px-4 py-2.5 rounded-lg hover:bg-green-800 transition-all cursor-pointer">
              <Plus size={14} /> Add Cattle
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {herd.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl">🐄</div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${c.color}`}>{c.status}</span>
              </div>
              <div className="text-sm font-bold text-gray-900">{c.name}</div>
              <div className="text-[11px] text-gray-500">{c.id} • {c.breed}</div>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-center">
                <div>
                  <div className="text-[10px] text-gray-400">Age</div>
                  <div className="text-xs font-bold text-gray-800">{c.age}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Weight</div>
                  <div className="text-xs font-bold text-gray-800">{c.weight}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Temp</div>
                  <div className="text-xs font-bold text-gray-800">{c.temp}</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-gray-400">Health Score</span>
                  <span className={`font-bold ${c.health > 85 ? 'text-green-600' : c.health > 70 ? 'text-orange-500' : 'text-red-500'}`}>{c.health}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${c.health > 85 ? 'bg-green-500' : c.health > 70 ? 'bg-orange-400' : 'bg-red-500'}`} style={{ width: `${c.health}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
