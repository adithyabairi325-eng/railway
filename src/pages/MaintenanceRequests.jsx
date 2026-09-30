import React, { useState } from 'react'
import {
  Plus,
  Upload,
  Filter,
  Download,
  Search,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  FileText,
  ChevronRight,
  Train
} from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'
import { toast } from 'react-hot-toast'

const MaintenanceRequests = () => {
  const { addNotification } = useNotifications()
  const [requests, setRequests] = useState([
    { id: 'MR-001', asset: 'Track Circuit TC-045', department: 'Signal & Telecom', location: 'Section A - Mile 45', type: 'Signal Equipment', priority: 'Critical', status: 'In Progress', duration: '4 hours', resources: '2 Technicians, 1 Truck', date: '2026-09-20', description: 'Track circuit failure detected during routine inspection' },
    { id: 'MR-002', asset: 'Overhead Wire OW-120', department: 'Traction/OHE', location: 'Section B - Mile 67', type: 'OHE Maintenance', priority: 'High', status: 'Scheduled', duration: '6 hours', resources: '4 Workers, 1 Crane, 1 Vans', date: '2026-09-21', description: 'Scheduled OHE wire inspection and tension adjustment' },
    { id: 'MR-003', asset: 'Signal Box SB-089', department: 'Signal & Telecom', location: 'Central Junction', type: 'Signal Box Maintenance', priority: 'Medium', status: 'Pending', duration: '3 hours', resources: '3 Technicians', date: '2026-09-22', description: 'Quarterly signal box equipment check' },
    { id: 'MR-004', asset: 'Track Beam TB-067', department: 'Engineering', location: 'Section A - Mile 32', type: 'Track Maintenance', priority: 'High', status: 'In Progress', duration: '8 hours', resources: '6 Workers, 2 Machines', date: '2026-09-19', description: 'Track beam alignment correction needed' },
    { id: 'MR-005', asset: 'Communication Tower CT-034', department: 'Signal & Telecom', location: 'Section D - Mile 89', type: 'Telecom Maintenance', priority: 'Low', status: 'Completed', duration: '2 hours', resources: '2 Technicians', date: '2026-09-18', description: 'Regular tower inspection completed' },
    { id: 'MR-006', asset: 'Switch Machine SM-012', department: 'Engineering', location: 'Section C - Mile 55', type: 'Switch Maintenance', priority: 'Critical', status: 'Pending', duration: '5 hours', resources: '4 Workers, 1 Truck', date: '2026-09-23', description: 'Switch machine overheating issue reported' },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const statusColors = {
    'Pending': 'bg-slate-100 text-slate-700',
    'Scheduled': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-green-100 text-green-700',
    'Critical': 'bg-red-100 text-red-800 border-red-200',
    'High': 'bg-orange-100 text-orange-800 border-orange-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Low': 'bg-green-100 text-green-800 border-green-200'
  }

  const handleCreateRequest = (e) => {
    e.preventDefault()
    // Simulate form submission
    toast.success('Maintenance request submitted successfully!')
    setShowCreateModal(false)
    addNotification({
      type: 'success',
      title: 'Request Submitted',
      message: 'Your maintenance request has been submitted for review'
    })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Maintenance Requests</h2>
          <p className="text-slate-500 mt-1">Manage and track all maintenance requests</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by asset, ID, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary-500 outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary-500 outline-none"
          >
            <option value="all">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{request.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                        <Train className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{request.asset}</p>
                        <p className="text-xs text-slate-500">{request.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{request.department}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {request.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{request.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[request.priority]}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {request.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No requests found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      {showCreateModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCreateModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Create New Maintenance Request</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleCreateRequest} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Asset ID</label>
                    <input required type="text" className="input" placeholder="e.g., Track Circuit TC-045" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                    <select className="input">
                      <option value="engineering">Engineering</option>
                      <option value="traction">Traction/OHE</option>
                      <option value="signal">Signal & Telecom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="text" className="input pl-10" placeholder="Enter location details" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Maintenance Type</label>
                  <select className="input">
                    <option value="scheduled">Scheduled Maintenance</option>
                    <option value="corrective">Corrective Maintenance</option>
                    <option value="emergency">Emergency Maintenance</option>
                    <option value="inspection">Inspection</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
                    <select className="input">
                      <option value="critical">Critical - Immediate Attention</option>
                      <option value="high">High - Urgent</option>
                      <option value="medium">Medium - Normal</option>
                      <option value="low">Low - Scheduled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Duration (hours)</label>
                    <input required type="number" className="input" placeholder="4" min="1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Required Resources</label>
                  <textarea className="input" rows="3" placeholder="List required personnel, equipment, and vehicles" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time Window</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="input" />
                    <input type="time" className="input" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea className="input" rows="4" placeholder="Describe the maintenance requirements and issues" required />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <input type="checkbox" id="upload" className="w-4 h-4 text-primary-600 rounded" />
                  <label htmlFor="upload" className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload supporting documents
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MaintenanceRequests