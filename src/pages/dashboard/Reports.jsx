import DashboardLayout from './DashboardLayout'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, Plus, Filter } from 'lucide-react'

const reports = [
  { id: 'RPT-001', title: 'Monthly Herd Health Report', type: 'Health', date: 'Jul 30, 2026', size: '2.4 MB', author: 'System' },
  { id: 'RPT-002', title: 'Reproductive Performance Summary', type: 'Reproductive', date: 'Jul 28, 2026', size: '1.8 MB', author: 'Dr. Smith' },
  { id: 'RPT-003', title: 'Vaccination Compliance Report', type: 'Vaccinations', date: 'Jul 25, 2026', size: '1.2 MB', author: 'System' },
  { id: 'RPT-004', title: 'Feed Inventory & Usage Analysis', type: 'Inventory', date: 'Jul 22, 2026', size: '3.1 MB', author: 'Farm Manager' },
  { id: 'RPT-005', title: 'Disease Outbreak Risk Assessment', type: 'AI Prediction', date: 'Jul 20, 2026', size: '2.9 MB', author: 'AI Engine' },
  { id: 'RPT-006', title: 'Quarterly Productivity Report', type: 'Productivity', date: 'Jul 15, 2026', size: '4.2 MB', author: 'System' },
]

export default function Reports() {
  return (
    <DashboardLayout title="Reports">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 bg-white px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
            <Filter size={14} /> Filter
          </button>
          <button className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-green-700 px-4 py-2.5 rounded-lg hover:bg-green-800 transition-all cursor-pointer">
            <Plus size={14} /> Generate Report
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <FileText size={20} className="text-green-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{r.id}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">{r.title}</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{r.type}</span>
              <span className="text-[11px] text-gray-400">{r.date}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <div className="text-[10px] text-gray-400">Author</div>
                <div className="text-[11px] font-semibold text-gray-700">{r.author}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400 mr-2">{r.size}</span>
                <button className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-all cursor-pointer" title="View">
                  <Eye size={16} />
                </button>
                <button className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-all cursor-pointer" title="Download">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  )
}
