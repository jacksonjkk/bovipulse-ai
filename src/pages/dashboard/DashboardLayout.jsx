import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Fingerprint, Thermometer, Baby, BarChart3, FileText, Bell, Syringe, Map, Package, Settings, LogOut, Menu, ChevronDown, Activity, X } from 'lucide-react'

const sidebarLinks = [
  { section: 'Main', items: [
    { label: 'Dashboard', icon: Home, to: '/dashboard' },
    { label: 'Herd Management', icon: Users, to: '/dashboard/herd' },
  ]},
  { section: 'Intelligence', items: [
    { label: 'MuzzleID', icon: Fingerprint, to: '/dashboard/muzzleid' },
    { label: 'ThermaGuard', icon: Thermometer, to: '/dashboard/thermaguard' },
    { label: 'GestaCheck', icon: Baby, to: '/dashboard/gestacheck' },
    { label: 'Analytics', icon: BarChart3, to: '/dashboard/analytics' },
    { label: 'Reports', icon: FileText, to: '/dashboard/reports' },
  ]},
  { section: 'Management', items: [
    { label: 'Alerts', icon: Bell, to: '/dashboard/alerts' },
    { label: 'Vaccinations', icon: Syringe, to: '/dashboard/vaccinations' },
    { label: 'Farm Map', icon: Map, to: '/dashboard/farm-map' },
    { label: 'Inventory', icon: Package, to: '/dashboard/inventory' },
  ]},
  { section: '', items: [
    { label: 'Settings', icon: Settings, to: '/dashboard/settings' },
  ]},
]

export default function DashboardLayout({ title, children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024)

  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth >= 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMobile = () => {
    if (window.innerWidth < 1024) setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[35] bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-16 lg:translate-x-0'
      } lg:sticky lg:top-0 lg:h-screen`}>
        <div className="flex items-center gap-2.5 p-4 border-b border-gray-100 min-h-16">
          <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Activity size={20} className="text-green-700" />
          </div>
          {sidebarOpen && <span className="text-lg font-extrabold text-green-700 tracking-tight whitespace-nowrap">BoviPulse</span>}
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {sidebarLinks.map(section => (
            <div key={section.section}>
              {section.section && sidebarOpen && (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">{section.section}</p>
              )}
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const Icon = item.icon
                  const active = location.pathname === item.to
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMobile}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        active ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:text-green-700 hover:bg-green-50/50'
                      }`}
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button onClick={closeMobile} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-600 hover:text-green-700 transition-colors rounded-lg hover:bg-green-50 cursor-pointer">
              <Menu size={20} />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate min-w-0 max-w-[140px] sm:max-w-none">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-600 hover:text-green-700 transition-colors rounded-lg hover:bg-green-50 cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">JD</div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-900">John Doe</div>
                <div className="text-[11px] text-gray-500">Farmer</div>
              </div>
              <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
