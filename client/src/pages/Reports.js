import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';
import './Reports.css';

function Reports() {
  const [timeRange, setTimeRange] = useState('6months');

  const completionData = [
    { month: 'Jan', completed: 45, failed: 3 },
    { month: 'Feb', completed: 52, failed: 2 },
    { month: 'Mar', completed: 48, failed: 4 },
    { month: 'Apr', completed: 61, failed: 1 },
    { month: 'May', completed: 55, failed: 3 },
    { month: 'Jun', completed: 68, failed: 2 },
  ];

  const riskData = [
    { name: 'Mitigated', value: 65, color: '#10B981' },
    { name: 'Ongoing', value: 25, color: '#F59E0B' },
    { name: 'New Risks', value: 10, color: '#EF4444' },
  ];

  const departmentData = [
    { department: 'Track', count: 34, icon: '🛤️' },
    { department: 'Signal', count: 28, icon: '🚦' },
    { department: 'Electrical', count: 22, icon: '⚡' },
    { department: 'Bridge', count: 15, icon: '🌉' },
  ];

  const assetReliability = [
    { asset: 'Track A', reliability: 95 },
    { asset: 'Signal B', reliability: 88 },
    { asset: 'Bridge C', reliability: 92 },
    { asset: 'Electrical D', reliability: 85 },
    { asset: 'Track E', reliability: 97 },
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports & Analysis</h1>
          <p>Comprehensive maintenance analytics and insights</p>
        </div>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="chart-filter">
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="reports-stats">
        <div className="report-stat">
          <div className="label">Total Completed</div>
          <div className="value">329</div>
          <div className="trend up">
            <TrendingUp size={14} />
            <span>+12% from last period</span>
          </div>
        </div>
        <div className="report-stat">
          <div className="label">Risk Reduction</div>
          <div className="value">35%</div>
          <div className="trend up">
            <TrendingUp size={14} />
            <span>+8% improvement</span>
          </div>
        </div>
        <div className="report-stat">
          <div className="label">Avg Response Time</div>
          <div className="value">4.2h</div>
          <div className="trend down">
            <TrendingDown size={14} />
            <span>-15% faster</span>
          </div>
        </div>
        <div className="report-stat">
          <div className="label">Asset Uptime</div>
          <div className="value">98.5%</div>
          <div className="trend up">
            <TrendingUp size={14} />
            <span>+2.3% from target</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="reports-charts">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Maintenance Completion Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Area type="monotone" dataKey="completed" stroke="#FF6B35" fill="#FFF0EB" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Risk Mitigation Status</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {riskData.map((item, index) => (
              <div key={index} className="legend-item">
                <span className="legend-color" style={{ background: item.color }}></span>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Asset Reliability Scores</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={assetReliability}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="asset" stroke="#6B7280" />
              <YAxis domain={[0, 100]} stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="reliability" fill="#FF6B35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="department-breakdown">
        <h3>Maintenance by Department</h3>
        <div className="department-grid">
          {departmentData.map((dept, index) => (
            <div key={index} className="department-card">
              <div className="department-icon">{dept.icon}</div>
              <div className="department-name">{dept.department}</div>
              <div className="department-count">{dept.count}</div>
              <div className="department-percent">
                {Math.round((dept.count / 99) * 100)}% of total
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="performance-section">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-name">Schedule Adherence</span>
              <span className="metric-badge excellent">Excellent</span>
            </div>
            <div className="metric-progress">
              <div className="metric-fill excellent" style={{ width: '92%' }}></div>
            </div>
            <span className="metric-value">92%</span>
          </div>
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-name">Resource Utilization</span>
              <span className="metric-badge good">Good</span>
            </div>
            <div className="metric-progress">
              <div className="metric-fill good" style={{ width: '85%' }}></div>
            </div>
            <span className="metric-value">85%</span>
          </div>
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-name">Cost Efficiency</span>
              <span className="metric-badge excellent">Excellent</span>
            </div>
            <div className="metric-progress">
              <div className="metric-fill excellent" style={{ width: '94%' }}></div>
            </div>
            <span className="metric-value">94%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;