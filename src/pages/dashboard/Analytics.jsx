import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { TrendingUp, TrendingDown, Users, Activity } from 'lucide-react'

const healthData = [
  { month: 'Jan', healthy: 108, atRisk: 8, checks: 42 },
  { month: 'Feb', healthy: 112, atRisk: 6, checks: 48 },
  { month: 'Mar', healthy: 115, atRisk: 5, checks: 55 },
  { month: 'Apr', healthy: 118, atRisk: 4, checks: 62 },
  { month: 'May', healthy: 120, atRisk: 5, checks: 58 },
  { month: 'Jun', healthy: 117, atRisk: 5, checks: 71 },
  { month: 'Jul', healthy: 121, atRisk: 3, checks: 66 },
]

const productionData = [
  { month: 'Jan', milk: 4200, weight: 580 },
  { month: 'Feb', milk: 4500, weight: 590 },
  { month: 'Mar', milk: 4800, weight: 600 },
  { month: 'Apr', milk: 5100, weight: 615 },
  { month: 'May', milk: 4900, weight: 620 },
  { month: 'Jun', milk: 5400, weight: 635 },
  { month: 'Jul', milk: 5600, weight: 640 },
]

const kpis = [
  { icon: TrendingUp, label: 'Herd Growth', value: '+6.3%', sub: 'vs last month', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Activity, label: 'Avg. Health Score', value: '92.4', sub: '+1.8 vs last month', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: TrendingDown, label: 'Disease Incidents', value: '-12%', sub: 'vs last month', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Users, label: 'Active Farms', value: '487', sub: '+23 this month', color: 'text-blue-500', bg: 'bg-blue-50' },
]

export default function Analytics() {
  return (
    <DashboardLayout title="Analytics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${k.bg} flex items-center justify-center`}>
                  <Icon size={20} className={k.color} />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900">{k.value}</div>
              <div className="text-xs text-gray-500">{k.label}</div>
              <div className={`text-[11px] font-semibold mt-0.5 ${k.color}`}>{k.sub}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Herd Health Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id="healthy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="risk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F57C00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F57C00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Area type="monotone" dataKey="healthy" name="Healthy" stroke="#4CAF50" strokeWidth={2} fill="url(#healthy)" />
              <Area type="monotone" dataKey="atRisk" name="At Risk" stroke="#F57C00" strokeWidth={2} fill="url(#risk)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Production Performance</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="milk" name="Milk (L)" fill="#4CAF50" radius={[4, 4, 0, 0]} />
              <Bar dataKey="weight" name="Weight (kg)" fill="#81C784" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
