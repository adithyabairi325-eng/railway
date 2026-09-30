import React, { useState, useMemo } from 'react'
import {
  LayoutDashboard,
  FileText,
  Train,
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  ChevronRight,
  MoreVertical,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useAuth } from '../context/AuthContext'

// Mock data
const chartData = [
  { name: 'Jan', pending: 12, approved: 8, completed: 5 },
  { name: 'Feb', pending: 15, approved: 12, completed: 10 },
  { name: 'Mar', pending: 8, approved: 15, completed: 12 },
  { name: 'Apr', pending: 10, approved: 18, completed: 15 },
  { name: 'May', pending: 6, approved: 20, completed: 18 },
  { name: 'Jun', pending: 4, approved: 22, completed: 20 },
]

const priorityData = [
  { name: 'Critical', value: 5, color: '#ef4444' },
  { name: 'High', value: 12, color: '#f97316' },
  { name: 'Medium', value: 28, color: '#eab308' },
  { name: 'Low', value: 45, color: '#22c55e' },
]

const recentJobs = [
  { id: 'MR-001', asset: 'Track Circuit TC-045', type: 'Signal', priority: 'Critical', status: 'In Progress', location: 'Section A', scheduledDate: '2026-09-20' },
  { id: 'MR-002', asset: 'Overhead Wire OW-120', type: 'Traction', priority: 'High', status: 'Scheduled', location: 'Section B', scheduledDate: '2026-09-21' },
  { id: 'MR-003', asset: 'Signal Box SB-089', type: 'Signal', priority: 'Medium', status: 'Pending', location: 'Section C', scheduledDate: '2026-09-22' },
  { id: 'MR-004', asset: 'Track Beam TB-067', type: 'Engineering', priority: 'High', status: 'In Progress', location: 'Section A', scheduledDate: '2026-09-19' },
  { id: 'MR-005', asset: 'Communication Tower CT-034', type: 'Signal', priority: 'Low', status: 'Completed', location: 'Section D', scheduledDate: '2026-09-18' },
]

const assetHealthData = [
  { name: 'Track', health: 85 },
  { name: 'OHE', health: 72 },
  { name: 'Signals', health: 68 },
  { name: 'Signal Boxes', health: 91 },
  { name: 'Communication', health: 78 },
]

const Dashboard = () => {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('month')

  const stats = useMemo(() => ({
    pending: 45,
    approved: 128,
    inProgress: 23,
    completed: 356,
    criticalAlerts: 5,
    scheduledJobs: 18
  }), [])

  const statusColors = {
    'Pending': 'bg-slate-100 text-slate-700',
    'Scheduled': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-green-100 text-green-700',
    'Critical': 'bg-red-100 text-red-800',
    'High': 'bg-orange-100 text-orange-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-primary-100 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Activity className="w-5 h-5" />
              <span className="text-sm font-medium">System Status: All Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Pending Requests', value: stats.pending, icon: Clock, color: 'bg-blue-500', trend: '+12%' },
          { label: 'Approved Jobs', value: stats.approved, icon: CheckCircle, color: 'bg-green-500', trend: '+8%' },
          { label: 'In Progress', value: stats.inProgress, icon: Activity, color: 'bg-yellow-500', trend: '-3%' },
          { label: 'Critical Alerts', value: stats.criticalAlerts, icon: AlertTriangle, color: 'bg-red-500', trend: 'Active' }
        ].map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                <p className={`text-xs font-medium mt-2 ${stat.trend.includes('+') ? 'text-green-600' : stat.trend.includes('-') ? 'text-red-600' : 'text-slate-500'}`}>
                  {stat.trend} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Maintenance Trends */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Maintenance Trends</h3>
              <div className="flex gap-2">
                {['week', 'month', 'quarter'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      timeRange === range
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line type="monotone" dataKey="pending" name="Pending" stroke="#64748b" strokeWidth={2} />
                  <Line type="monotone" dataKey="approved" name="Approved" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="completed" name="Completed" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Health */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Asset Health Summary</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assetHealthData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis dataKey="name" type="category" width={100} stroke="#64748b" />
                  <Tooltip
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="health" name="Health %" radius={[0, 4, 4, 0]}>
                    {assetHealthData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.health >= 80 ? '#22c55e' : entry.health >= 60 ? '#eab308' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          {/* Priority Distribution */}
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Priority Distribution</h3>
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {priorityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'New Maintenance Request', icon: FileText, path: '/maintenance-requests' },
                { label: 'View Schedule', icon: Calendar, path: '/schedule-optimizer' },
                { label: 'Asset Management', icon: Train, path: '/asset-management' },
                { label: 'Simulation Tool', icon: LayoutDashboard, path: '/what-if-simulator' }
              ].map((action, index) => (
                <a
                  key={index}
                  href={action.path}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                    <action.icon className="w-5 h-5 text-slate-600 group-hover:text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Alerts</h3>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              {[
                { title: 'Track Circuit Failure', time: '2 hours ago', type: 'critical' },
                { title: 'OHE Wire Tension Alert', time: '4 hours ago', type: 'warning' },
                { title: 'Monthly Report Available', time: 'Yesterday', type: 'info' }
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                    alert.type === 'critical' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{alert.title}</p>
                    <p className="text-xs text-slate-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Jobs Table */}
      <div className="card">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Recent Maintenance Jobs</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Job ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{job.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{job.asset}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{job.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.priority]}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{job.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{job.scheduledDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard