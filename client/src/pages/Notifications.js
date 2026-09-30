import React, { useState } from 'react';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle, Clock, Trash2, Check } from 'lucide-react';
import './Notifications.css';

function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', title: 'Critical Asset Alert', message: 'Signal Box SB-45 requires immediate attention. Risk score: 85%', time: '5 mins ago', tag: 'Signal', read: false },
    { id: 2, type: 'warning', title: 'Maintenance Overdue', message: 'Transformer T-05 maintenance is 3 days overdue. Schedule immediately.', time: '1 hour ago', tag: 'Electrical', read: false },
    { id: 3, type: 'info', title: 'Schedule Update', message: 'Track Inspection A-12 has been rescheduled to tomorrow 9:00 AM', time: '2 hours ago', tag: 'Track', read: true },
    { id: 4, type: 'success', title: 'Maintenance Completed', message: 'Bridge B-12 maintenance completed successfully ahead of schedule.', time: '3 hours ago', tag: 'Bridge', read: true },
    { id: 5, type: 'warning', title: 'Resource Conflict', message: 'Team availability conflict detected for Zone A maintenance on Jan 20.', time: '5 hours ago', tag: 'Planning', read: true },
    { id: 6, type: 'info', title: 'New Request Submitted', message: 'New maintenance request MR006 has been submitted for approval.', time: 'Yesterday', tag: 'Request', read: true },
    { id: 7, type: 'critical', title: 'Failure Prediction', message: 'ML model predicts high probability of failure for Switch Motor SM-12 within 48 hours.', time: 'Yesterday', tag: 'AI Alert', read: true },
    { id: 8, type: 'success', title: 'Risk Mitigated', message: 'Critical risk for Track Section B-05 has been successfully mitigated.', time: '2 days ago', tag: 'Track', read: true },
  ]);

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle size={24} />;
      case 'warning': return <AlertCircle size={24} />;
      case 'info': return <Info size={24} />;
      case 'success': return <CheckCircle size={24} />;
      default: return <Bell size={24} />;
    }
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <div>
          <h1>Notifications</h1>
          <p>{unreadCount} unread notifications</p>
        </div>
      </div>

      <div className="notifications-header">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-tab ${activeFilter === 'critical' ? 'active' : ''}`}
            onClick={() => setActiveFilter('critical')}
          >
            Critical
          </button>
          <button
            className={`filter-tab ${activeFilter === 'warning' ? 'active' : ''}`}
            onClick={() => setActiveFilter('warning')}
          >
            Warning
          </button>
          <button
            className={`filter-tab ${activeFilter === 'info' ? 'active' : ''}`}
            onClick={() => setActiveFilter('info')}
          >
            Info
          </button>
          <button
            className={`filter-tab ${activeFilter === 'success' ? 'active' : ''}`}
            onClick={() => setActiveFilter('success')}
          >
            Success
          </button>
        </div>
        <button className="mark-read-btn" onClick={markAllAsRead}>
          <Check size={16} />
          Mark all as read
        </button>
      </div>

      {filteredNotifications.length > 0 ? (
        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.type} ${!notification.read ? 'unread' : ''}`}
            >
              <div className="notification-icon">
                {getIcon(notification.type)}
              </div>
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-meta">
                  <span className="notification-time">
                    <Clock size={12} />
                    {notification.time}
                  </span>
                  <span className="notification-tag">{notification.tag}</span>
                </div>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="action-btn-small"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  className="action-btn-small"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <div className="empty-title">No notifications</div>
          <div className="empty-desc">You're all caught up!</div>
        </div>
      )}
    </div>
  );
}

export default Notifications;