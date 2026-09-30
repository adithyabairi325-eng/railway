import React, { useState } from 'react'
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  FileText
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month')

  // Mock data
  const maintenanceTrends = [
    { month: 'Jan', completed: 24, pending: 8, cost: 85000 },
    { month: 'Feb', completed: 28, pending: 12, cost: 92000 },
    { month: 'Mar', completed: 32, pending: 10, cost: 98000 },
    { month: 'Apr', completed: 30, pending: 15, cost: 105000 },
    { month: 'May', completed: 35, pending: 18, cost: 112000 },
    { month: 'Jun', completed: 38, pending: 14, cost: 118000 },
  ]

  const departmentData = [
    { name: 'Engineering', value: 145, color: '#2563eb' },
    { name: 'Traction/OHE', value: 98, color: '#f59e0b' },
    { name: 'Signal & Telecom', value: 127, color: '#10b981' },
  ]

  const efficiencyData = [
    { week: 'Week 1', predicted: 8.5, actual: 8.2, variance: -0.3 },
    { week: 'Week 2', predicted: 9.0, actual: 9.5, variance: 0.5 },
    { week: 'Week 3', predicted: 7.5, actual: 7.8, variance: 0.3 },
    { week: 'Week 4', predicted: 8.0, actual: 7.5, variance: -0.5 },
  ]

  const riskReduction = [
    { month: 'Jan', risk: 285 },
    { month: 'Feb', risk: 268 },
    { month: 'Mar', risk: 245 },
    { month: 'Apr', risk: 230 },
    { month: 'May', risk: 218 },
    { month: 'Jun', risk: 205 },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
          <p className="text-slate-500 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:border-primary-500 outline-none"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Completed', value: '356', change: '+12%', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
          { label: 'Avg. Duration', value: '5.2hrs', change: '-8%', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
          { label: 'Total Cost', value: '$610K', change: '+5%', icon: DollarSign, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
          { label: 'Risk Reduction', value: '34%', change: '+15%', icon: TrendingDown, color: 'text-purple-600', bgColor: 'bg-purple-100' }
        ].map((kpi, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                kpi.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-sm text-slate-500">{kpi.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Trends */}
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-6">Maintenance Completion Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={maintenanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="Completed" />
                <Area type="monotone" dataKey="pending" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.6} name="Pending" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-6">Maintenance by Department</h3>
          <div className="h-80 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                      <span className="text-sm font-medium text-slate-700">{dept.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{dept.value}</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(dept.value / departmentData.reduce((a, b) => a + b.value, 0)) * 100}%`,
                        backgroundColor: dept.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-6">Cost Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Bar dataKey="cost" name="Cost" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Predicted vs Actual Duration */}
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-6">Predicted vs Actual Duration</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Reduction Trend */}
      <div className="card p-6">
        <h3 className="font-semibold text-lg mb-6">Risk Reduction Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskReduction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Area type="monotone" dataKey="risk" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Risk Score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h4 className="font-semibold text-lg mb-4">Model Accuracy</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Duration Prediction</span>
                <span className="text-sm font-bold text-slate-900">89%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '89%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Failure Prediction</span>
                <span className="text-sm font-bold text-slate-900">92%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Schedule Optimization</span>
                <span className="text-sm font-bold text-slate-900">85%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="font-semibold text-lg mb-4">Resource Utilization</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Workforce</span>
              <span className="text-sm font-bold text-slate-900">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Equipment</span>
              <span className="text-sm font-bold text-slate-900">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Vehicles</span>
              <span className="text-sm font-bold text-slate-900">82%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Tools</span>
              <span className="text-sm font-bold text-slate-900">71%</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="font-semibold text-lg mb-4">Key Insights</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
              <p className="text-sm text-slate-700">34% reduction in total maintenance risk</p>
            </div>
            <div className="flex items-start gap-2">
              <TrendingDown className="w-4 h-4 text-green-600 mt-0.5" />
              <p className="text-sm text-slate-700">8% decrease in average task duration</p>
            </div>
            <div className="flex items-start gap-2">
              <Activity className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-slate-700">92% schedule adherence rate</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <p className="text-sm text-slate-700">356 jobs completed successfully</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics