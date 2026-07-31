import { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { Thermometer, AlertTriangle, CheckCircle2, ScanLine } from 'lucide-react'

const thermalData = [
  { id: 'A124', name: 'Daisy', temp: '38.6°C', status: 'Normal', risk: 'low' },
  { id: 'A125', name: 'Bella', temp: '38.2°C', status: 'Normal', risk: 'low' },
  { id: 'A126', name: 'Molly', temp: '40.4°C', status: 'Fever Detected', risk: 'high' },
  { id: 'A127', name: 'Luna', temp: '39.8°C', status: 'Elevated', risk: 'medium' },
  { id: 'A128', name: 'Stella', temp: '38.5°C', status: 'Normal', risk: 'low' },
]

export default function ThermaGuard() {
  const [scanning, setScanning] = useState(false)

  return (
    <DashboardLayout title="ThermaGuard">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scanner */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-52 h-52 mb-5">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/30 via-red-400/20 to-purple-400/30 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/13910867/pexels-photo-13910867.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
                alt="Thermal scan of cow"
                className="w-full h-full object-cover mix-blend-multiply"
              />
              {scanning && (
                <div className="absolute inset-0 border-2 border-orange-400 animate-pulse rounded-2xl" />
              )}
            </div>
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">Thermal Scanning</h3>
          <p className="text-xs text-gray-500 mb-4">Detect fever and early disease signs using thermal imaging</p>
          <button
            onClick={() => setScanning(!scanning)}
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all active:scale-[0.97] cursor-pointer"
          >
            <ScanLine size={16} /> {scanning ? 'Stop Scan' : 'Start Thermal Scan'}
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Thermal Readings</h2>
            <span className="text-xs text-gray-500">Normal range: 38.0°C – 39.3°C</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-2.5 pr-4">ID</th>
                  <th className="py-2.5 pr-4">Name</th>
                  <th className="py-2.5 pr-4">Temperature</th>
                  <th className="py-2.5 pr-4">Status</th>
                  <th className="py-2.5">Action</th>
                </tr>
              </thead>
              <tbody>
                {thermalData.map(c => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * thermalData.indexOf(c) }}
                    className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-green-700">{c.id}</td>
                    <td className="py-3 pr-4 font-medium text-gray-900">{c.name}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Thermometer size={16} className={c.risk === 'high' ? 'text-red-500' : c.risk === 'medium' ? 'text-orange-500' : 'text-green-600'} />
                        <span className="font-bold text-gray-900">{c.temp}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
                        c.risk === 'high' ? 'text-red-600 bg-red-50' : c.risk === 'medium' ? 'text-orange-600 bg-orange-50' : 'text-green-700 bg-green-50'
                      }`}>
                        {c.risk === 'high' || c.risk === 'medium' ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-xs font-semibold text-green-600 hover:text-green-700 cursor-pointer">View Details</button>
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
