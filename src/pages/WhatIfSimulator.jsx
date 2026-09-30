import React, { useState } from 'react'
import {
  FlaskConical,
  Plus,
  Minus,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Train,
  Users,
  Zap,
  Activity,
  ChevronRight,
  Info
} from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const WhatIfSimulator = () => {
  const [simulationParams, setSimulationParams] = useState({
    delayMaintenance: 0,
    increaseDuration: 0,
    addTrains: 0,
    unavailableResources: 0
  })

  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResult, setSimulationResult] = useState(null)

  const baselineData = {
    totalRisk: 245,
    scheduledJobs: 18,
    totalDuration: 23,
    resourceUtilization: 75,
    trainConflicts: 3,
    estimatedCost: 125000
  }

  const handleSimulate = () => {
    setIsSimulating(true)
    setTimeout(() => {
      // Calculate changes based on parameters
      const riskChange = (simulationParams.delayMaintenance * 15) + (simulationParams.addTrains * 8)
      const durationChange = simulationParams.increaseDuration * 2
      const conflictChange = simulationParams.addTrains + Math.floor(simulationParams.delayMaintenance / 2)
      const costChange = (durationChange * 2000) + (conflictChange * 5000)

      setSimulationResult({
        totalRisk: baselineData.totalRisk + riskChange,
        scheduledJobs: baselineData.scheduledJobs - Math.floor(simulationParams.delayMaintenance / 3),
        totalDuration: baselineData.totalDuration + durationChange,
        resourceUtilization: baselineData.resourceUtilization - (simulationParams.unavailableResources * 5),
        trainConflicts: baselineData.trainConflicts + conflictChange,
        estimatedCost: baselineData.estimatedCost + costChange,
        changes: {
          riskChange,
          durationChange,
          conflictChange,
          costChange
        }
      })
      setIsSimulating(false)
    }, 2000)
  }

  const handleReset = () => {
    setSimulationParams({
      delayMaintenance: 0,
      increaseDuration: 0,
      addTrains: 0,
      unavailableResources: 0
    })
    setSimulationResult(null)
  }

  const updateParam = (key, delta) => {
    setSimulationParams(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }))
  }

  const comparisonData = simulationResult ? [
    { metric: 'Risk Score', baseline: baselineData.totalRisk, simulated: simulationResult.totalRisk },
    { metric: 'Duration (hrs)', baseline: baselineData.totalDuration, simulated: simulationResult.totalDuration },
    { metric: 'Train Conflicts', baseline: baselineData.trainConflicts, simulated: simulationResult.trainConflicts },
    { metric: 'Cost ($K)', baseline: baselineData.estimatedCost / 1000, simulated: simulationResult.estimatedCost / 1000 }
  ] : []

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-purple-600" />
            </div>
            What-If Simulator
          </h2>
          <p className="text-slate-500 mt-1">Test different scenarios and see their impact on maintenance schedules</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20 disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Activity className="w-5 h-5" />
                Run Simulation
              </>
            )}
          </button>
        </div>
      </div>

      {/* Baseline Metrics */}
      <div className="card p-6 bg-gradient-to-r from-slate-50 to-slate-100">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-slate-600" />
          Current Baseline Schedule
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: 'Total Risk', value: baselineData.totalRisk, icon: Zap, color: 'text-yellow-600' },
            { label: 'Scheduled Jobs', value: baselineData.scheduledJobs, icon: Activity, color: 'text-blue-600' },
            { label: 'Duration (hrs)', value: baselineData.totalDuration, icon: Clock, color: 'text-slate-600' },
            { label: 'Resource Use', value: baselineData.resourceUtilization + '%', icon: Users, color: 'text-green-600' },
            { label: 'Train Conflicts', value: baselineData.trainConflicts, icon: Train, color: 'text-red-600' },
            { label: 'Est. Cost', value: '$' + (baselineData.estimatedCost / 1000) + 'K', icon: TrendingUp, color: 'text-purple-600' }
          ].map((metric, index) => (
            <div key={index} className="text-center">
              <metric.icon className={`w-5 h-5 mx-auto mb-2 ${metric.color}`} />
              <p className="text-xs text-slate-500 mb-1">{metric.label}</p>
              <p className="text-lg font-bold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-6">Scenario Parameters</h3>
          <div className="space-y-6">
            {/* Delay Maintenance */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">Delay Maintenance (days)</label>
                <span className="text-2xl font-bold text-slate-900">{simulationParams.delayMaintenance}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateParam('delayMaintenance', -1)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-slate-600" />
                </button>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(simulationParams.delayMaintenance / 10) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => updateParam('delayMaintenance', 1)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                Increases failure risk and operational impact
              </p>
            </div>

            {/* Increase Duration */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">Increase Task Duration (hours)</label>
                <span className="text-2xl font-bold text-slate-900">{simulationParams.increaseDuration}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateParam('increaseDuration', -1)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-slate-600" />
                </button>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    style={{ width: `${(simulationParams.increaseDuration / 10) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => updateParam('increaseDuration', 1)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                <Clock className="w-3 h-3 inline mr-1" />
                Affects schedule windows and resource allocation
              </p>
            </div>

            {/* Add Trains */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">Add Extra Trains</label>
                <span className="text-2xl font-bold text-slate-900">{simulationParams.addTrains}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateParam('addTrains', -1)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-slate-600" />
                </button>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                    style={{ width: `${(simulationParams.addTrains / 10) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => updateParam('addTrains', 1)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                <Train className="w-3 h-3 inline mr-1" />
                Increases scheduling conflicts and reduces windows
              </p>
            </div>

            {/* Resource Unavailability */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">Unavailable Resources (%)</label>
                <span className="text-2xl font-bold text-slate-900">{simulationParams.unavailableResources}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateParam('unavailableResources', -5)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-slate-600" />
                </button>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${simulationParams.unavailableResources}%` }}
                  />
                </div>
                <button
                  onClick={() => updateParam('unavailableResources', 5)}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                <Users className="w-3 h-3 inline mr-1" />
                Constrains available workforce and equipment
              </p>
            </div>
          </div>
        </div>

        {/* Impact Analysis */}
        {simulationResult && (
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-6">Impact Analysis</h3>
            <div className="space-y-4">
              {[
                {
                  label: 'Risk Score Impact',
                  baseline: baselineData.totalRisk,
                  simulated: simulationResult.totalRisk,
                  change: simulationResult.changes.riskChange,
                  icon: Zap,
                  negative: true
                },
                {
                  label: 'Duration Impact',
                  baseline: baselineData.totalDuration,
                  simulated: simulationResult.totalDuration,
                  change: simulationResult.changes.durationChange,
                  unit: 'hrs',
                  icon: Clock,
                  negative: true
                },
                {
                  label: 'Train Conflict Impact',
                  baseline: baselineData.trainConflicts,
                  simulated: simulationResult.trainConflicts,
                  change: simulationResult.changes.conflictChange,
                  icon: Train,
                  negative: true
                },
                {
                  label: 'Cost Impact',
                  baseline: '$' + (baselineData.estimatedCost / 1000) + 'K',
                  simulated: '$' + (simulationResult.estimatedCost / 1000) + 'K',
                  change: simulationResult.changes.costChange / 1000,
                  unit: 'K',
                  icon: TrendingUp,
                  negative: true
                }
              ].map((item, index) => {
                const isNegative = item.negative && item.change > 0
                return (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        isNegative ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {isNegative ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(item.change)} {item.unit || ''}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-slate-500">Baseline: </span>
                        <span className="font-medium text-slate-900">{item.baseline}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="text-slate-500">Simulated: </span>
                        <span className="font-medium text-slate-900">{item.simulated}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recommendation */}
            <div className={`mt-6 p-4 rounded-lg ${
              simulationResult.changes.riskChange > 30 ? 'bg-red-50' :
              simulationResult.changes.riskChange > 10 ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  simulationResult.changes.riskChange > 30 ? 'text-red-600' :
                  simulationResult.changes.riskChange > 10 ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <div>
                  <h4 className="font-medium text-sm mb-2">Recommendation</h4>
                  <p className="text-sm text-slate-700">
                    {simulationResult.changes.riskChange > 30
                      ? 'High risk scenario detected. Consider alternative scheduling or additional resources to mitigate impacts.'
                      : simulationResult.changes.riskChange > 10
                      ? 'Moderate risk increase. Review resource allocation and train schedule conflicts.'
                      : 'Low impact scenario. Current schedule remains optimal under these conditions.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Chart */}
      {simulationResult && (
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-6">Baseline vs Simulated Comparison</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="baseline" name="Baseline" fill="#2563eb" radius={[8, 8, 0, 0]} />
                <Bar dataKey="simulated" name="Simulated" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default WhatIfSimulator