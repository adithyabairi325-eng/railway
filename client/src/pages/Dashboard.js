import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Wrench, Users, BarChart3, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './Dashboard.css';

function Dashboard() {
  // Sample data
  const maintenanceTrend = [
    { month: 'Jan', completed: 45, pending: 12 },
    { month: 'Feb', completed: 52, pending: 8 },
    { month: 'Mar', completed: 48, pending: 15 },
    { month: 'Apr', completed: 61, pending: 10 },
    { month: 'May', completed: 55, pending: 7 },
    { month: 'Jun', completed: 68, pending: 5 },
  ];

  const assetHealth = [
    { name: 'Healthy', value: 156, color: '#10B981' },
    { name: 'At Risk', value: 23, color: '#F59E0B' },
    { name: 'Critical', value: 8, color: '#EF4444' },
  ];

  const departmentData = [
    { name: 'Track', count: 34 },
    { name: 'Signal', count: 28 },
    { name: 'Electrical', count: 22 },
    { name: 'Bridge', count: 15 },
  ];

  const recentRequests = [
    { id: 'MR001', asset: 'Track Section A-12', type: 'Inspection', priority: 'High', status: 'Pending' },
    { id: 'MR002', asset: 'Signal Box SB-45', type: 'Repair', priority: 'Critical', status: 'In Progress' },
    { id: 'MR003', asset: 'Bridge B-07', type: 'Maintenance', priority: 'Medium', status: 'Approved' },
    { id: 'MR004', asset: 'Electrical Panel EP-22', type: 'Replacement', priority: 'Low', status: 'Completed' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your maintenance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">24</span>
            <span className="stat-label">Pending Requests</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">12</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">156</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon critical">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">8</span>
            <span className="stat-label">Critical Assets</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="card-header">
            <h3>Maintenance Trends</h3>
            <select className="chart-filter">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={maintenanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
              <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>Asset Health Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={assetHealth}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {assetHealth.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {assetHealth.map((item, index) => (
              <div key={index} className="legend-item">
                <span className="legend-color" style={{ background: item.color }}></span>
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>Maintenance by Department</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="name" type="category" stroke="#6B7280" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#FF6B35" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="recent-section">
        <div className="section-header">
          <h3>Recent Maintenance Requests</h3>
          <Link to="/maintenance-requests" className="view-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.id}>
                  <td className="id-cell">{request.id}</td>
                  <td>{request.asset}</td>
                  <td>{request.type}</td>
                  <td>
                    <span className={`priority-badge ${request.priority.toLowerCase()}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/maintenance-requests" className="action-card">
          <Wrench size={24} />
          <span>New Request</span>
        </Link>
        <Link to="/schedule-optimizer" className="action-card">
          <TrendingUp size={24} />
          <span>Optimize Schedule</span>
        </Link>
        <Link to="/what-if-simulator" className="action-card">
          <BarChart3 size={24} />
          <span>Run Simulation</span>
        </Link>
        <Link to="/asset-management" className="action-card">
          <Users size={24} />
          <span>View Assets</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;