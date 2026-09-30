import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit2, Trash2 } from 'lucide-react';
import './MaintenanceRequests.css';

function MaintenanceRequests() {
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([
    { id: 'MR001', asset: 'Track Section A-12', department: 'Track', type: 'Inspection', location: 'Zone A', priority: 'High', date: '2024-01-15', status: 'Pending' },
    { id: 'MR002', asset: 'Signal Box SB-45', department: 'Signal', type: 'Repair', location: 'Zone B', priority: 'Critical', status: 'In Progress' },
    { id: 'MR003', asset: 'Bridge B-07', department: 'Bridge', type: 'Maintenance', location: 'Zone C', priority: 'Medium', status: 'Approved' },
    { id: 'MR004', asset: 'Electrical Panel EP-22', department: 'Electrical', type: 'Replacement', location: 'Zone A', priority: 'Low', status: 'Completed' },
    { id: 'MR005', asset: 'Track Section B-05', department: 'Track', type: 'Inspection', location: 'Zone B', priority: 'High', status: 'Pending' },
    { id: 'MR006', asset: 'Switch Motor SM-12', department: 'Signal', type: 'Repair', location: 'Zone A', priority: 'Critical', status: 'Approved' },
  ]);

  const [newRequest, setNewRequest] = useState({
    asset: '', department: '', type: '', location: '', priority: 'Medium', date: ''
  });

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status.toLowerCase() === filterStatus;
    const matchesSearch = req.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `MR${String(requests.length + 1).padStart(3, '0')}`;
    setRequests([...requests, { ...newRequest, id: newId, status: 'Pending' }]);
    setShowModal(false);
    setNewRequest({ asset: '', department: '', type: '', location: '', priority: 'Medium', date: '' });
  };

  return (
    <div className="maintenance-page">
      <div className="page-header">
        <div>
          <h1>Maintenance Requests</h1>
          <p>Manage and track all maintenance requests</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> New Request
        </button>
      </div>

      {/* Stats */}
      <div className="status-stats">
        <div className="status-stat pending" onClick={() => setFilterStatus('pending')}>
          <span className="count">{requests.filter(r => r.status === 'Pending').length}</span>
          <span className="label">Pending</span>
        </div>
        <div className="status-stat approved" onClick={() => setFilterStatus('approved')}>
          <span className="count">{requests.filter(r => r.status === 'Approved').length}</span>
          <span className="label">Approved</span>
        </div>
        <div className="status-stat progress" onClick={() => setFilterStatus('in progress')}>
          <span className="count">{requests.filter(r => r.status === 'In Progress').length}</span>
          <span className="label">In Progress</span>
        </div>
        <div className="status-stat completed" onClick={() => setFilterStatus('completed')}>
          <span className="count">{requests.filter(r => r.status === 'Completed').length}</span>
          <span className="label">Completed</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by asset name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Department</th>
              <th>Type</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="id-cell">{request.id}</td>
                <td>{request.asset}</td>
                <td>{request.department}</td>
                <td>{request.type}</td>
                <td>{request.location}</td>
                <td>
                  <span className={`priority-badge ${request.priority.toLowerCase()}`}>
                    {request.priority}
                  </span>
                </td>
                <td>{request.date || '2024-01-20'}</td>
                <td>
                  <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view"><Eye size={16} /></button>
                    <button className="action-btn edit"><Edit2 size={16} /></button>
                    <button className="action-btn delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Maintenance Request</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Asset Name</label>
                  <input
                    type="text"
                    value={newRequest.asset}
                    onChange={(e) => setNewRequest({...newRequest, asset: e.target.value})}
                    placeholder="Enter asset name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    value={newRequest.department}
                    onChange={(e) => setNewRequest({...newRequest, department: e.target.value})}
                    required
                  >
                    <option value="">Select department</option>
                    <option value="Track">Track</option>
                    <option value="Signal">Signal</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Bridge">Bridge</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Repair">Repair</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Replacement">Replacement</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newRequest.location}
                    onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    value={newRequest.date}
                    onChange={(e) => setNewRequest({...newRequest, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintenanceRequests;