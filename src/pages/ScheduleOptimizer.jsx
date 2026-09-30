import React, { useState, useMemo } from 'react'
import {
  Play,
  Train,
  Clock,
  AlertTriangle,
  Zap,
  Users,
  Calendar,
  Activity,
  CheckCircle,
  Clock as ClockIcon,
  MapPin,
  History,
  Info,
  TrendingUp,
  Settings,
  ChevronRight
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ScheduleOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResult, setOptimizationResult] = useState(null)

  // Mock maintenance requests with AI analysis
  const requests = [
    { id: 'MR-001', asset: 'Track Circuit TC-045', type: 'Signal', priority: 'Critical', riskScore: 92, duration: 4, location: 'Section A', relatedTo: 'MR-003' },
    { id: 'MR-002', asset: 'Overhead Wire OW-120', type: 'Traction', priority: 'High', riskScore: 78, duration: 6, location: 'Section B', relatedTo: null },
    { id: 'MR-003', asset: 'Signal Box SB-089', type: 'Signal', priority: 'Medium', riskScore: 65, duration: 3, location: 'Central Junction', relatedTo: 'MR-001' },
    { id: 'MR-004', asset: 'Track Beam TB-067', type: 'Engineering', priority: 'High', riskScore: 85, duration: 8, location: 'Section A', relatedTo: null },
    { id: 'MR-006', asset: 'Switch Machine SM-012', type: 'Engineering', priority: 'Critical', riskScore: 88, duration: 5, location: 'Section C', relatedTo: null },
  ]

  const trainTraffic = [
    { time: '02:00', count: 12, type: 'freight' },
    { time: '04:00', count: 8, type: 'passenger' },
    { time: '06:00', count: 24, type: 'passenger' },
    { time: '08:00', count: 15, type: 'freight' },
    { time: '10:00', count: 18, type: 'passenger' },
    { time: '12:00', count: 20, type: 'freight' },
    { time: '14:00', count: 16, type: 'passenger' },
    { time: '16:00', count: 22, type: 'freight' },
    { time: '18:00', count: 14, type: 'passenger' },
  ]

  const aiAnalysis = {
    failureProbability: 0.12,
    maintenanceRisk: 'Medium',
    expectedDuration: '5.2 hours',
    confidenceScore: 89
  }

  const handleOptimize = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setOptimizationResult({
        blocks: [
          {
            id: 'MB-001',
            name: 'Morning Maintenance Block',
            time: '02:00-06:00',
            duration: 4,
            jobs: ['MR-001', 'MR-003'],
            riskScore: 72,
            impact: 'Minimal - Low traffic window',
            resources: ['2 Signal Technicians', '1 Maintenance Truck']
          },
          {
            id: 'MB-002',
            name: 'Section A Combined Block',
            time: '06:00-14:00',
            duration: 8,
            jobs: ['MR-004'],
            riskScore: 85,
            impact: 'Moderate - Track block required',
            resources: ['6 Engineering Workers', '2 Machines', '1 Crane']
          },
          {
            id: 'MB-003',
            name: 'Afternoon Signal Block',
            time: '14:00-19:00',
            duration: 5,
            jobs: ['MR-006'],
            riskScore: 68,
            impact: 'Low - Freight window',
            resources: ['4 Engineering Workers', '1 Truck']
          },
          {
            id: 'MB-004',
            name: 'OHE Maintenance Window',
            time: '04:00-10:00',
            duration: 6,
            jobs: ['MR-002'],
            riskScore: 55,
            impact: 'Low - Coordinated with freight',
            resources: ['4 OHE Technicians', '1 Crane', '2 Vans']
          }
        ],
        scheduledJobs: 4,
        totalDuration: 23,
        riskReduction: 34,
        resourcesOptimized: 18
      })
      setIsOptimizing(false)
    }, 2500)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Schedule Optimizer</h2>
          <p className="text-slate-500 mt-1">AI-powered maintenance scheduling with train traffic coordination</p>
        </div>
        {!optimizationResult ? (
          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOptimizing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Generate Schedule
              </>
            )}
          </button>
        ) : (
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-2">
              <History className="w-5 h-5" />
              History
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Export Schedule
            </button>
          </div>
        )}
      </div>

      {/* AI Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Failure Probability', value: aiAnalysis.failureProbability * 100 + '%', icon: AlertTriangle, trend: '-12%' },
          { label: 'Maintenance Risk', value: aiAnalysis.maintenanceRisk, icon: Zap, trend: 'Stable' },
          { label: 'Expected Duration', value: aiAnalysis.expectedDuration, icon: Clock, trend: 'Optimized' },
          { label: 'Confidence Score', value: aiAnalysis.confidenceScore + '%', icon: TrendingUp, trend: '+5%' }
        ].map((item, index) => (
          <div key={index} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <item.icon className="w-5 h-5 text-slate-600" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.trend.includes('+') ? 'bg-green-100 text-green-700' :
                item.trend.includes('-') ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.trend}
              </span>
            </div>
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Train Traffic & Conflict Check */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Train className="w-5 h-5 text-primary-600" />
              Train Traffic Analysis
            </h3>
            <span className="text-sm text-slate-500">Next 24 hours</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainTraffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value) => [`${value} trains`, 'Traffic Count']}
                />
                <Line type="monotone" dataKey="count" name="Train Count" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-600">Passenger Trains</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-sm text-slate-600">Freight Trains</span>
            </div>
          </div>
        </div>

        {/* Risk Score Distribution */}
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-4">Request Risk Scores</h3>
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-slate-900">{req.asset}</p>
                    <p className="text-xs text-slate-500">{req.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    req.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    req.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {req.priority}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Risk Score</span>
                      <span className="font-medium text-slate-700">{req.riskScore}/100</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          req.riskScore >= 80 ? 'bg-red-500' :
                          req.riskScore >= 60 ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${req.riskScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Schedule */}
      {optimizationResult && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Recommended Maintenance Schedule
            </h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-slate-600">{optimizationResult.scheduledJobs} jobs scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">{optimizationResult.totalDuration} hours total</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-slate-600">{optimizationResult.riskReduction}% risk reduction</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline View */}
            <div className="card p-6">
              <h4 className="font-semibold text-lg mb-6">Timeline View</h4>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
                <div className="space-y-8">
                  {optimizationResult.blocks.map((block, index) => (
                    <div key={block.id} className="relative pl-16">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-slate-200" />
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow" />
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-semibold text-slate-900">{block.name}</h5>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-slate-500">{block.time}</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-sm text-slate-500">{block.duration} hours</span>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Feasible
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Train className="w-4 h-4" />
                            <span>{block.jobs.length} jobs</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>Risk: {block.riskScore}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{block.impact}</p>
                        <div className="flex flex-wrap gap-2">
                          {block.resources.map((res, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-200 text-slate-600 text-xs rounded">
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resource Utilization */}
            <div className="card p-6">
              <h4 className="font-semibold text-lg mb-6">Resource Utilization</h4>
              <div className="space-y-6">
                {[
                  { label: 'Maintenance Technicians', total: 24, used: 18, color: 'bg-blue-500' },
                  { label: 'Maintenance Trucks', total: 8, used: 6, color: 'bg-green-500' },
                  { label: 'Cranes & Heavy Equipment', total: 4, used: 3, color: 'bg-yellow-500' },
                  { label: 'OHE Teams', total: 6, used: 4, color: 'bg-purple-500' }
                ].map((resource, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{resource.label}</span>
                      <span className="text-sm text-slate-500">{resource.used}/{resource.total} deployed</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${resource.color}`}
                        style={{ width: `${(resource.used / resource.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-primary-900 text-sm">Optimization Insights</h5>
                    <p className="text-sm text-primary-700 mt-2">
                      {optimizationResult.scheduledJobs} maintenance requests have been combined into {optimizationResult.blocks.length} efficient maintenance blocks, reducing total downtime by {optimizationResult.totalDuration} hours and lowering overall risk by {optimizationResult.riskReduction}%.
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Approve & Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScheduleOptimizer