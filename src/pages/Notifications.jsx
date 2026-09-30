import React, { useState } from 'react'
import {
  Bell,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  Archive,
  Filter,
  MoreVertical,
  Clock,
  MapPin,
  Train
} from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll, unreadCount } = useNotifications()
  const [filterType, setFilterType] = useState('all')
  const [filterRead, setFilterRead] = useState('all')

  const notificationsList = [
    {
      id: 1,
      type: 'critical',
      title: 'Critical Asset Alert',
      message: 'Track circuit #TC-045 showing signs of failure. Immediate inspection recommended.',
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'OHE maintenance block approved for tomorrow 02:00-06:00. Section B assigned.',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Resource Conflict Detected',
      message: 'Crane equipment double-booked for Section B maintenance on 2026-09-21.',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 4,
      type: 'info',
      title: 'Schedule Optimization Complete',
      message: 'AI schedule optimizer has completed analysis for 6 pending maintenance requests.',
      timestamp: new Date(Date.now() - 10800000),
      read: true,
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Train Schedule Change',
      message: 'Additional passenger trains scheduled for Section A on 2026-09-20. Maintenance window affected.',
      timestamp: new Date(Date.now() - 14400000),
      read: true,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 6,
      type: 'success',
      title: 'Maintenance Completed',
      message: 'Signal box maintenance (MR-005) completed successfully. No issues encountered.',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 7,
      type: 'info',
      title: 'Monthly Report Available',
      message: 'August maintenance report is now available for download.',
      timestamp: new Date(Date.now() - 172800000),
      read: true,
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 8,
      type: 'critical',
      title: 'System Maintenance Window',
      message: 'RailMaint AI will undergo scheduled maintenance on 2026-09-25 from 23:00-01:00 UTC.',
      timestamp: new Date(Date.now() - 259200000),
      read: true,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  const filteredNotifications = notificationsList.filter(notif => {
    const matchesType = filterType === 'all' || notif.type === filterType
    const matchesRead = filterRead === 'all' || (filterRead === 'unread' ? !notif.read : notif.read)
    return matchesType && matchesRead
  })

  const formatTime = (date) => {
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <p className="text-slate-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
          </p>
        </div>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
            >
              Mark all as read
            </button>
          )}
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">Filter:</span>
          </div>
          <div className="flex gap-2">
            {['all', 'critical', 'warning', 'info', 'success'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs rounded-full font-medium transition-colors capitalize ${
                  filterType === type
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            {['all', 'unread', 'read'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterRead(status)}
                className={`px-3 py-1 text-xs rounded-full font-medium transition-colors capitalize ${
                  filterRead === status
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon
            return (
              <div
                key={notification.id}
                className={`card p-5 transition-all cursor-pointer hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-primary-500 bg-primary-50/30' : ''
                } ${notification.bgColor}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className={`w-6 h-6 ${notification.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full" />
                        )}
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
                              title="Mark as read"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 hover:bg-red-200 rounded-lg transition-colors text-slate-500 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="card p-12 text-center">
            <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No notifications</h3>
            <p className="text-slate-500 mt-2">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Critical Alerts', description: 'Asset failures and emergency situations', enabled: true },
            { title: 'Maintenance Scheduled', description: 'When maintenance blocks are confirmed', enabled: true },
            { title: 'Schedule Changes', description: 'Train schedule changes affecting maintenance', enabled: true },
            { title: 'Resource Conflicts', description: 'Equipment and workforce availability issues', enabled: true },
            { title: 'Completion Reports', description: 'Maintenance job completions', enabled: false },
            { title: 'Weekly Digest', description: 'Summary of maintenance activities', enabled: true }
          ].map((pref, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <input
                type="checkbox"
                defaultChecked={pref.enabled}
                className="w-4 h-4 text-primary-600 rounded mt-1"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{pref.title}</p>
                <p className="text-sm text-slate-500 mt-1">{pref.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notifications