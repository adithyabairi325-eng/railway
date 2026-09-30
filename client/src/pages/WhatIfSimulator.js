import React, { useState } from 'react';
import { Play, RotateCcw, TrendingUp, AlertTriangle, Clock, DollarSign } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './WhatIfSimulator.css';

function WhatIfSimulator() {
  const [duration, setDuration] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const riskData = [
    { duration: 2, risk: 15, impact: 'Low' },
    { duration: 4, risk: 25, impact: 'Medium' },
    { duration: 6, risk: 45, impact: 'High' },
    { duration: 8, risk: 65, impact: 'Critical' },
    { duration: 10, risk: 82, impact: 'Critical' },
  ];

  const impactAnalysis = [
    { name: 'Trains Affected', current: 12, projected: 18 + duration * 2 },
    { name: 'Delay (hours)', current: 2, projected: 2 + duration * 0.5 },
    { name: 'Cost Impact ($K)', current: 15, projected: 15 + duration * 5 },
  ];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const risk = riskData.find(d => d.duration === duration) || { risk: 50 };
      setSimulationResult({
        riskPercentage: risk.risk,
        trainsAffected: 12 + duration * 2,
        delayHours: 2 + duration * 0.5,
        additionalCost: duration * 5000,
        recommendation: risk.risk > 50 ? 'Not recommended. Consider splitting into multiple sessions.' : 'Acceptable risk level. Proceed with current plan.'
      });
      setIsSimulating(false);
    }, 1500);
  };

  const handleReset = () => {
    setDuration(4);
    setSimulationResult(null);
  };

  return (
    <div className="simulator-page">
      <div className="page-header">
        <div>
          <h1>What-If Simulator</h1>
          <p>Analyze risk and impact of maintenance duration changes</p>
        </div>
      </div>

      <div className="simulator-grid">
        {/* Input Panel */}
        <div className="input-panel">
          <h3>Simulation Parameters</h3>

          <div className="param-group">
            <label>Maintenance Duration (hours)</label>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="12"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>1h</span>
                <span>6h</span>
                <span>12h</span>
              </div>
            </div>
            <div className="duration-display">
              <span className="duration-value">{duration}</span>
              <span className="duration-unit">hours</span>
            </div>
          </div>

          <div className="param-group">
            <label>Maintenance Type</label>
            <select defaultValue="track">
              <option value="track">Track Inspection</option>
              <option value="signal">Signal Repair</option>
              <option value="bridge">Bridge Maintenance</option>
              <option value="electrical">Electrical Work</option>
            </select>
          </div>

          <div className="param-group">
            <label>Priority Level</label>
            <select defaultValue="high">
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="action-buttons">
            <button
              className="btn-simulate"
              onClick={handleSimulate}
              disabled={isSimulating}
            >
              <Play size={18} />
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
            <button className="btn-reset" onClick={handleReset}>
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <h3>Risk Analysis</h3>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="duration" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#FF6B35"
                  fill="#FFF0EB"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {simulationResult && (
            <div className="simulation-results">
              <div className="result-card risk">
                <TrendingUp size={20} />
                <div className="result-content">
                  <span className="result-value">{simulationResult.riskPercentage}%</span>
                  <span className="result-label">Risk Level</span>
                </div>
              </div>

              <div className="result-stats">
                <div className="result-stat">
                  <Clock size={16} />
                  <span>{simulationResult.delayHours}h delay</span>
                </div>
                <div className="result-stat">
                  <DollarSign size={16} />
                  <span>${simulationResult.additionalCost.toLocaleString()} extra cost</span>
                </div>
              </div>

              <div className={`recommendation ${simulationResult.riskPercentage > 50 ? 'warning' : 'success'}`}>
                <AlertTriangle size={16} />
                <p>{simulationResult.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Impact Analysis */}
      {simulationResult && (
        <div className="impact-section">
          <h3>Impact Analysis</h3>
          <div className="impact-grid">
            {impactAnalysis.map((item, index) => (
              <div key={index} className="impact-card">
                <div className="impact-header">
                  <span className="impact-name">{item.name}</span>
                </div>
                <div className="impact-values">
                  <div className="impact-current">
                    <span className="label">Current</span>
                    <span className="value">{item.current}</span>
                  </div>
                  <div className="impact-arrow">→</div>
                  <div className="impact-projected">
                    <span className="label">Projected</span>
                    <span className="value highlight">{item.projected}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WhatIfSimulator;