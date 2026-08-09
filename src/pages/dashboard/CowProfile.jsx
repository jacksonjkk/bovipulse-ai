import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Weight, Thermometer, Heart, Activity, Baby, Syringe, Edit, Stethoscope, Scale, Fingerprint, PawPrint } from 'lucide-react'

export default function CowProfile() {
  const vitals = [
    { icon: Thermometer, label: 'Temperature', value: '38.6°C', status: 'Normal', ok: true },
    { icon: Heart, label: 'Heart Rate', value: '64 bpm', status: 'Normal', ok: true },
    { icon: Activity, label: 'Respiration', value: '28 /min', status: 'Normal', ok: true },
    { icon: Weight, label: 'Weight', value: '620 kg', status: 'Gain +4kg', ok: true },
  ]

  const history = [
    { date: 'Jul 30', type: 'Health Check', desc: 'Routine checkup - all vitals normal', icon: Stethoscope },
    { date: 'Jul 22', type: 'Vaccination', desc: 'FMD booster administered', icon: Syringe },
    { date: 'Jul 15', type: 'GestaCheck', desc: 'Pregnancy confirmed - Day 145', icon: Baby },
    { date: 'Jul 08', type: 'Weight', desc: 'Gained 4kg since last check', icon: Scale },
    { date: 'Jul 01', type: 'MuzzleID', desc: 'Biometric ID updated', icon: Fingerprint },
  ]

  return (
    <DashboardLayout title="Cow Profile">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-24 h-24 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <PawPrint size={48} className="text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-xl font-black text-gray-900">Daisy</h2>
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">A124</span>
              <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">Healthy</span>
              <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">Pregnant - Day 145</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1.5"><MapPin size={13} /> Holstein Friesian</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> 4 years old</span>
              <span className="flex items-center gap-1.5"><Weight size={13} /> 620 kg</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} /> Zone A - Grazing</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <button className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-green-700 px-4 py-2.5 rounded-lg hover:bg-green-800 transition-all cursor-pointer">
                <Edit size={14} /> Edit Profile
              </button>
              <button className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 border border-green-700 px-4 py-2.5 rounded-lg hover:bg-green-50 transition-all cursor-pointer">
                <Syringe size={14} /> Medical Record
              </button>
            </div>
          </div>
          <div className="w-full sm:w-44 p-4 rounded-xl bg-green-50 border border-green-100">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-green-700 font-medium">Health Score</span>
              <span className="font-black text-green-700">92</span>
            </div>
            <div className="h-2 rounded-full bg-green-100 mb-1.5">
              <div className="h-full rounded-full bg-green-600" style={{ width: '92%' }} />
            </div>
            <div className="text-[10px] text-green-700/70">Excellent - Top 10% of herd</div>
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {vitals.map((v, i) => {
          const Icon = v.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${v.ok ? 'bg-green-50' : 'bg-red-50'}`}>
                  <Icon size={18} className={v.ok ? 'text-green-600' : 'text-red-500'} />
                </div>
                <span className="text-xs text-gray-500">{v.label}</span>
              </div>
              <div className="text-xl font-black text-gray-900">{v.value}</div>
              <div className={`text-[11px] font-semibold ${v.ok ? 'text-green-600' : 'text-red-500'}`}>{v.status}</div>
            </motion.div>
          )
        })}
      </div>

      {/* History + Baby info */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Activity History</h3>
          <div className="space-y-3">
            {history.map((h, i) => {
              const Icon = h.icon
              return (
              <div key={i} className="flex items-start gap-3.5 p-3 rounded-xl border border-gray-100 hover:bg-green-50/20 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-green-600" /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-gray-900">{h.type}</span>
                    <span className="text-[10px] text-gray-400">{h.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{h.desc}</p>
                </div>
              </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Baby size={16} className="text-pink-500" /> Pregnancy Info
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Stage</span>
                <span className="font-bold text-gray-900">Pregnant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Days in Calf</span>
                <span className="font-bold text-gray-900">145 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Expected Calving</span>
                <span className="font-bold text-green-700">Oct 12, 2026</span>
              </div>
              <div className="h-2 rounded-full bg-pink-50 mt-2">
                <div className="h-full rounded-full bg-pink-500" style={{ width: '40%' }} />
              </div>
              <div className="text-[10px] text-gray-400 text-right">40% complete</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-xl p-5 text-white">
            <h3 className="text-sm font-bold mb-1">AI Health Summary</h3>
            <p className="text-[11px] text-white/80 leading-relaxed mb-3">
              Daisy is in excellent health. All vitals are within normal range. Continue regular monitoring and maintain current feed plan.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-semibold bg-white/15 px-3 py-2 rounded-lg w-fit">
              <Activity size={12} /> Last AI assessment: Today
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
