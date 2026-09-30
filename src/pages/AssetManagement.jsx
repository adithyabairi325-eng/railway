import React, { useState } from 'react'
import {
  Train,
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  History,
  FileText,
  BarChart2,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const AssetManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedAsset, setSelectedAsset] = useState(null)

  const assets = [
    {
      id: 'TC-045',
      name: 'Track Circuit TC-045',
      category: 'Signal Equipment',
      location: 'Section A - Mile 45',
      health: 65,
      status: 'At Risk',
      lastMaintenance: '2026-07-15',
      nextMaintenance: '2026-09-20',
      failureProbability: 0.23,
      maintenanceHistory: 12,
      estimatedLife: '2 years',
      condition: 'Fair'
    },
    {
      id: 'OW-120',
      name: 'Overhead Wire OW-120',
      category: 'OHE Equipment',
      location: 'Section B - Mile 67',
      health: 78,
      status: 'Good',
      lastMaintenance: '2026-08-10',
      nextMaintenance: '2026-11-10',
      failureProbability: 0.12,
      maintenanceHistory: 8,
      estimatedLife: '5 years',
      condition: 'Good'
    },
    {
      id: 'SB-089',
      name: 'Signal Box SB-089',
      category: 'Signal Equipment',
      location: 'Central Junction',
      health: 92,
      status: 'Excellent',
      lastMaintenance: '2026-06-01',
      nextMaintenance: '2026-12-01',
      failureProbability: 0.05,
      maintenanceHistory: 15,
      estimatedLife: '8 years',
      condition: 'Excellent'
    },
    {
      id: 'TB-067',
      name: 'Track Beam TB-067',
      category: 'Track Infrastructure',
      location: 'Section A - Mile 32',
      health: 58,
      status: 'Critical',
      lastMaintenance: '2026-05-20',
      nextMaintenance: '2026-09-19',
      failureProbability: 0.35,
      maintenanceHistory: 18,
      estimatedLife: '1 year',
      condition: 'Poor'
    },
    {
      id: 'CT-034',
      name: 'Communication Tower CT-034',
      category: 'Telecom Equipment',
      location: 'Section D - Mile 89',
      health: 88,
      status: 'Good',
      lastMaintenance: '2026-08-18',
      nextMaintenance: '2027-02-18',
      failureProbability: 0.08,
      maintenanceHistory: 6,
      estimatedLife: '7 years',
      condition: 'Very Good'
    },
    {
      id: 'SM-012',
      name: 'Switch Machine SM-012',
      category: 'Track Infrastructure',
      location: 'Section C - Mile 55',
      health: 62,
      status: 'At Risk',
      lastMaintenance: '2026-07-01',
      nextMaintenance: '2026-09-23',
      failureProbability: 0.28,
      maintenanceHistory: 14,
      estimatedLife: '3 years',
      condition: 'Fair'
    }
  ]

  const healthData = [
    { month: 'Apr', health: 75 },
    { month: 'May', health: 72 },
    { month: 'Jun', health: 70 },
    { month: 'Jul', health: 68 },
    { month: 'Aug', health: 65 },
    { month: 'Sep', health: 65 }
  ]

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getHealthColor = (health) => {
    if (health >= 80) return 'text-green-600 bg-green-100'
    if (health >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getStatusColor = (status) => {
    const colors = {
      'Excellent': 'bg-green-100 text-green-700 border-green-200',
      'Good': 'bg-blue-100 text-blue-700 border-blue-200',
      'At Risk': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Critical': 'bg-red-100 text-red-700 border-red-200'
    }
    return colors[status] || 'bg-slate-100 text-slate-700'
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Asset Management</h2>
          <p className="text-slate-500 mt-1">Monitor and track all railway assets with predictive maintenance insights</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <FileText className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Assets', value: assets.length, icon: Train, color: 'bg-blue-500' },
          { label: 'Critical Assets', value: assets.filter(a => a.status === 'Critical').length, icon: AlertTriangle, color: 'bg-red-500' },
          { label: 'At Risk', value: assets.filter(a => a.status === 'At Risk').length, icon: TrendingDown, color: 'bg-yellow-500' },
          { label: 'Healthy Assets', value: assets.filter(a => a.health >= 80).length, icon: CheckCircle, color: 'bg-green-500' }
        ].map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by asset name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary-500 outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary-500 outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Signal Equipment">Signal Equipment</option>
            <option value="OHE Equipment">OHE Equipment</option>
            <option value="Track Infrastructure">Track Infrastructure</option>
            <option value="Telecom Equipment">Telecom Equipment</option>
          </select>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="card p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedAsset(asset)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Train className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{asset.name}</h3>
                  <p className="text-sm text-slate-500">{asset.category}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3 h-3" />
                    {asset.location}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(asset.status)}`}>
                {asset.status}
              </span>
            </div>

            {/* Health Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Asset Health</span>
                <span className={`text-sm font-bold px-2 py-1 rounded ${getHealthColor(asset.health)}`}>
                  {asset.health}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    asset.health >= 80 ? 'bg-green-500' :
                    asset.health >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${asset.health}%` }}
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Failure Risk</p>
                <p className="text-sm font-semibold text-slate-900">{(asset.failureProbability * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Condition</p>
                <p className="text-sm font-semibold text-slate-900">{asset.condition}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Est. Life</p>
                <p className="text-sm font-semibold text-slate-900">{asset.estimatedLife}</p>
              </div>
            </div>

            {/* Next Maintenance */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                <span>Next: {asset.nextMaintenance}</span>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedAsset(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Train className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{selectedAsset.name}</h3>
                      <p className="text-slate-500">{selectedAsset.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Overview */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="card p-4">
                    <p className="text-sm text-slate-500 mb-1">Asset Health</p>
                    <p className="text-3xl font-bold text-slate-900">{selectedAsset.health}%</p>
                  </div>
                  <div className="card p-4">
                    <p className="text-sm text-slate-500 mb-1">Failure Probability</p>
                    <p className="text-3xl font-bold text-slate-900">{(selectedAsset.failureProbability * 100).toFixed(0)}%</p>
                  </div>
                  <div className="card p-4">
                    <p className="text-sm text-slate-500 mb-1">Maintenance Count</p>
                    <p className="text-3xl font-bold text-slate-900">{selectedAsset.maintenanceHistory}</p>
                  </div>
                </div>

                {/* Health Trend */}
                <div className="card p-6">
                  <h4 className="font-semibold text-lg mb-4">Health Trend (Last 6 Months)</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={healthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Line type="monotone" dataKey="health" stroke="#2563eb" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Asset Details */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Asset Information</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Asset ID', value: selectedAsset.id },
                        { label: 'Location', value: selectedAsset.location },
                        { label: 'Category', value: selectedAsset.category },
                        { label: 'Condition', value: selectedAsset.condition },
                        { label: 'Estimated Life', value: selectedAsset.estimatedLife }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-sm text-slate-500">{item.label}</span>
                          <span className="text-sm font-medium text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Maintenance Schedule</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Last Maintenance', value: selectedAsset.lastMaintenance },
                        { label: 'Next Maintenance', value: selectedAsset.nextMaintenance },
                        { label: 'Maintenance History', value: `${selectedAsset.maintenanceHistory} times` },
                        { label: 'Status', value: selectedAsset.status }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-sm text-slate-500">{item.label}</span>
                          <span className="text-sm font-medium text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AssetManagement