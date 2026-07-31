import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { MapPin, Users, Thermometer, Navigation } from 'lucide-react'

const zones = [
  { name: 'Zone A — Grazing', count: 42, temp: '38.4°C avg', status: 'Healthy', color: 'bg-green-500', pos: 'top-[18%] left-[14%]' },
  { name: 'Zone B — Dairy Barn', count: 38, temp: '38.6°C avg', status: 'Healthy', color: 'bg-green-500', pos: 'top-[30%] left-[45%]' },
  { name: 'Zone C — Calving Area', count: 12, temp: '38.9°C avg', status: 'Monitor', color: 'bg-orange-400', pos: 'bottom-[30%] left-[30%]' },
  { name: 'Zone D — Quarantine', count: 4, temp: '39.5°C avg', status: 'At Risk', color: 'bg-red-500', pos: 'bottom-[18%] right-[22%]' },
]

export default function FarmMap() {
  return (
    <DashboardLayout title="Farm Map">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-5 h-[480px] relative overflow-hidden">
            <img
              src="https://images.pexels.com/photos/5633476/pexels-photo-5633476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Farm aerial view"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3.5 py-2 rounded-lg shadow-sm">
              <div className="text-xs font-bold text-gray-900 flex items-center gap-2">
                <MapPin size={14} className="text-green-600" /> Greenfield Farm
              </div>
              <div className="text-[11px] text-gray-500">42.03°N, 93.65°W</div>
            </div>

            {zones.map((z, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`absolute ${z.pos} bg-white/95 backdrop-blur rounded-xl p-3 shadow-md cursor-pointer hover:shadow-lg transition-all w-44`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2 h-2 rounded-full ${z.color}`} />
                  <span className="text-[11px] font-bold text-gray-900 truncate">{z.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1"><Users size={11} /> {z.count} cows</span>
                  <span className="flex items-center gap-1"><Thermometer size={11} /> {z.temp}</span>
                </div>
                <div className={`text-[10px] font-semibold mt-1 ${z.status === 'Healthy' ? 'text-green-600' : z.status === 'Monitor' ? 'text-orange-500' : 'text-red-500'}`}>
                  {z.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Navigation size={16} className="text-green-600" /> Zone Summary
            </h3>
            <div className="space-y-3">
              {zones.map((z, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${z.color}`} />
                    <div>
                      <div className="text-xs font-semibold text-gray-800">{z.name}</div>
                      <div className="text-[11px] text-gray-400">{z.count} cattle</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    z.status === 'Healthy' ? 'text-green-700 bg-green-50' : z.status === 'Monitor' ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50'
                  }`}>{z.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-700 rounded-xl p-5 text-white">
            <h3 className="text-sm font-bold mb-1">Total Herd on Map</h3>
            <div className="text-3xl font-black mb-1">96 / 128</div>
            <p className="text-[11px] text-white/70">Active cattle currently tracked in all zones</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
