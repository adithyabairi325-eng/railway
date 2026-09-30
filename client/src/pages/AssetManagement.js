import React, { useState } from 'react';
import { Search, Filter, Package, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import './AssetManagement.css';

function AssetManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterHealth, setFilterHealth] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const assets = [
    { id: 'AST001', name: 'Track Section A-12', department: 'Track', location: 'Zone A', health: 'Healthy', lastMaintenance: '2024-01-10', riskScore: 15, nextDue: '2024-02-10' },
    { id: 'AST002', name: 'Signal Box SB-45', department: 'Signal', location: 'Zone B', health: 'Critical', lastMaintenance: '2023-12-15', riskScore: 85, nextDue: '2024-01-15' },
    { id: 'AST003', name: 'Bridge B-07', department: 'Bridge', location: 'Zone C', health: 'At Risk', lastMaintenance: '2023-11-20', riskScore: 55, nextDue: '2024-01-20' },
    { id: 'AST004', name: 'Electrical Panel EP-22', department: 'Electrical', location: 'Zone A', health: 'Healthy', lastMaintenance: '2024-01-05', riskScore: 20, nextDue: '2024-02-05' },
    { id: 'AST005', name: 'Track Section B-05', department: 'Track', location: 'Zone B', health: 'Healthy', lastMaintenance: '2024-01-08', riskScore: 18, nextDue: '2024-02-08' },
    { id: 'AST006', name: 'Switch Motor SM-12', department: 'Signal', location: 'Zone A', health: 'At Risk', lastMaintenance: '2023-12-01', riskScore: 60, nextDue: '2024-01-25' },
    { id: 'AST007', name: 'Transformer T-05', department: 'Electrical', location: 'Zone C', health: 'Critical', lastMaintenance: '2023-10-15', riskScore: 90, nextDue: '2024-01-10' },
    { id: 'AST008', name: 'Bridge B-12', department: 'Bridge', location: 'Zone A', health: 'Healthy', lastMaintenance: '2024-01-12', riskScore: 12, nextDue: '2024-02-12' },
  ];

  const stats = {
    total: assets.length,
    critical: assets.filter(a => a.health === 'Critical').length,
    atRisk: assets.filter(a => a.health === 'At Risk').length,
    healthy: assets.filter(a => a.health === 'Healthy').length
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'all' || asset.department === filterDept;
    const matchesHealth = filterHealth === 'all' || asset.health === filterHealth;
    return matchesSearch && matchesDept && matchesHealth;
  });

  return (
    <div className="asset-page">
      <div className="page-header">
        <div>
          <h1>Asset Management</h1>
          <p>Monitor and manage all railway assets</p>
        </div>
      </div>

      {/* Stats */}
      <div className="asset-stats">
        <div className="asset-stat">
          <div className="stat-icon total"><Package size={24} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Assets</span>
          </div>
        </div>
        <div className="asset-stat">
          <div className="stat-icon critical"><AlertTriangle size={24} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.critical}</span>
            <span className="stat-label">Critical</span>
          </div>
        </div>
        <div className="asset-stat">
          <div className="stat-icon at-risk"><Shield size={24} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.atRisk}</span>
            <span className="stat-label">At Risk</span>
          </div>
        </div>
        <div className="asset-stat">
          <div className="stat-icon healthy"><CheckCircle size={24} /></div>
          <div className="stat-info">
            <span className="stat-value">{stats.healthy}</span>
            <span className="stat-label">Healthy</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="asset-filters">
        <div className="search-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-select">
          <Filter size={18} />
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
            <option value="all">All Departments</option>
            <option value="Track">Track</option>
            <option value="Signal">Signal</option>
            <option value="Electrical">Electrical</option>
            <option value="Bridge">Bridge</option>
          </select>
        </div>
        <div className="filter-select">
          <select value={filterHealth} onChange={(e) => setFilterHealth(e.target.value)}>
            <option value="all">All Health Status</option>
            <option value="Healthy">Healthy</option>
            <option value="At Risk">At Risk</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="assets-grid">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="asset-card" onClick={() => setSelectedAsset(asset)}>
            <div className="asset-header">
              <div className="asset-info">
                <h4>{asset.name}</h4>
                <span className="asset-id">{asset.id}</span>
              </div>
              <span className={`health-badge ${asset.health.toLowerCase().replace(' ', '-')}`}>
                {asset.health}
              </span>
            </div>
            <div className="asset-body">
              <div className="asset-detail">
                <span className="detail-label">Department</span>
                <span className="detail-value">{asset.department}</span>
              </div>
              <div className="asset-detail">
                <span className="detail-label">Location</span>
                <span className="detail-value">{asset.location}</span>
              </div>
              <div className="asset-detail">
                <span className="detail-label">Risk Score</span>
                <span className="detail-value">{asset.riskScore}%</span>
              </div>
            </div>
            <div className="asset-footer">
              <span className="last-maintenance">Last: {asset.lastMaintenance}</span>
              <span className="view-details">View Details →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="modal-overlay" onClick={() => setSelectedAsset(null)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedAsset.name}</h2>
                <span className="asset-id">{selectedAsset.id}</span>
              </div>
              <button className="close-btn" onClick={() => setSelectedAsset(null)}>×</button>
            </div>
            <div className="modal-form">
              <div className="detail-grid">
                <div className="detail-card">
                  <h5>Health Status</h5>
                  <span className={`health-badge ${selectedAsset.health.toLowerCase().replace(' ', '-')}`}>
                    {selectedAsset.health}
                  </span>
                </div>
                <div className="detail-card">
                  <h5>Risk Score</h5>
                  <span className="value">{selectedAsset.riskScore}%</span>
                </div>
                <div className="detail-card">
                  <h5>Department</h5>
                  <span className="value">{selectedAsset.department}</span>
                </div>
                <div className="detail-card">
                  <h5>Location</h5>
                  <span className="value">{selectedAsset.location}</span>
                </div>
                <div className="detail-card">
                  <h5>Last Maintenance</h5>
                  <span className="value">{selectedAsset.lastMaintenance}</span>
                </div>
                <div className="detail-card">
                  <h5>Next Due</h5>
                  <span className="value">{selectedAsset.nextDue}</span>
                </div>
              </div>

              <div className="maintenance-history">
                <h4>Recent Maintenance History</h4>
                <div className="history-item">
                  <span className="history-date">{selectedAsset.lastMaintenance}</span>
                  <div className="history-info">
                    <span className="history-type">Routine Inspection</span>
                    <span className="history-desc">Completed successfully</span>
                  </div>
                </div>
                <div className="history-item">
                  <span className="history-date">2023-11-15</span>
                  <div className="history-info">
                    <span className="history-type">Preventive Maintenance</span>
                    <span className="history-desc">Parts replaced</span>
                  </div>
                </div>
                <div className="history-item">
                  <span className="history-date">2023-10-01</span>
                  <div className="history-info">
                    <span className="history-type">Scheduled Check</span>
                    <span className="history-desc">No issues found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetManagement;