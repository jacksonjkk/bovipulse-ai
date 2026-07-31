import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { Package, AlertTriangle, TrendingUp, Plus } from 'lucide-react'

const inventory = [
  { id: 'INV-01', name: 'Dairy Feed', category: 'Feed', stock: '2,400 kg', capacity: '5,000 kg', pct: 48, status: 'In Stock', color: 'text-green-700 bg-green-50' },
  { id: 'INV-02', name: 'Vaccines (FMD)', category: 'Medical', stock: '140 doses', capacity: '200 doses', pct: 70, status: 'In Stock', color: 'text-green-700 bg-green-50' },
  { id: 'INV-03', name: 'Antibiotics', category: 'Medical', stock: '45 doses', capacity: '100 doses', pct: 45, status: 'Low', color: 'text-orange-600 bg-orange-50' },
  { id: 'INV-04', name: 'Hay Bales', category: 'Feed', stock: '120 bales', capacity: '300 bales', pct: 40, status: 'Low', color: 'text-orange-600 bg-orange-50' },
  { id: 'INV-05', name: 'Mineral Supplements', category: 'Feed', stock: '28 bags', capacity: '80 bags', pct: 35, status: 'Critical', color: 'text-red-600 bg-red-50' },
  { id: 'INV-06', name: 'Ear Tags', category: 'Equipment', stock: '320 pcs', capacity: '400 pcs', pct: 80, status: 'In Stock', color: 'text-green-700 bg-green-50' },
]

const summary = [
  { icon: Package, label: 'Total Items', value: '48', sub: 'Across 6 categories', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: AlertTriangle, label: 'Low Stock', value: '3', sub: 'Need restocking', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: TrendingUp, label: 'Monthly Spend', value: '$4,280', sub: '+12% vs last month', color: 'text-blue-500', bg: 'bg-blue-50' },
]

export default function Inventory() {
  return (
    <DashboardLayout title="Inventory">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Farm Inventory</h2>
          <p className="text-xs text-gray-500">Manage feed, medical supplies, and equipment</p>
        </div>
        <button className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-green-700 px-4 py-2.5 rounded-lg hover:bg-green-800 transition-all cursor-pointer">
          <Plus size={14} /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              <div className={`text-[11px] font-semibold mt-0.5 ${s.color}`}>{s.sub}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Stock Levels</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-2.5 pr-4">Item</th>
                <th className="py-2.5 pr-4">Category</th>
                <th className="py-2.5 pr-4">Stock</th>
                <th className="py-2.5 pr-4">Level</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * inventory.indexOf(item) }}
                  className="border-b border-gray-50 hover:bg-green-50/20 transition-colors">
                  <td className="py-3 pr-4 font-medium text-gray-900">{item.name}</td>
                  <td className="py-3 pr-4 text-gray-600">{item.category}</td>
                  <td className="py-3 pr-4 text-gray-500">{item.stock}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-gray-100">
                        <div className={`h-full rounded-full ${item.pct < 40 ? 'bg-red-500' : item.pct < 60 ? 'bg-orange-400' : 'bg-green-500'}`} style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className="text-[11px] text-gray-500">{item.pct}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
