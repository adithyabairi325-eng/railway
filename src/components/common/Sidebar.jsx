import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  FlaskConical,
  Train,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrainFront,
  User
} from 'lucide-react'

const Sidebar = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'engineering', 'traction', 'signal'] },
    { path: '/maintenance-requests', icon: FileText, label: 'Maintenance Requests', roles: ['admin', 'engineering', 'traction', 'signal'] },
    { path: '/schedule-optimizer', icon: Calendar, label: 'Schedule Optimizer', roles: ['admin', 'engineering', 'traction', 'signal'] },
    { path: '/what-if-simulator', icon: FlaskConical, label: 'What-If Simulator', roles: ['admin', 'engineering', 'traction', 'signal'] },
    { path: '/asset-management', icon: Train, label: 'Asset Management', roles: ['admin', 'engineering', 'traction', 'signal'] },
    { path: '/analytics', icon: BarChart3, label: 'Reports & Analytics', roles: ['admin', 'engineering', 'traction', 'signal'] },
    { path: '/notifications', icon: Bell, label: 'Notifications', roles: ['admin', 'engineering', 'traction', 'signal'] },
    { path: '/settings', icon: Settings, label: 'Settings', roles: ['admin', 'engineering', 'traction', 'signal'] }
  ]

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role)
  )

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 shadow-xl`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrainFront className="w-6 h-6" />
          </div>
          {!isCollapsed && (
            <div className="animate-fadeIn">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                RailMaint AI
              </h1>
              <p className="text-xs text-slate-400">Maintenance Optimization</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 mx-4 mt-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 border-t border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar