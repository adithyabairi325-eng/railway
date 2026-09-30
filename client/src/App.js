import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, TrendingUp, Users, Wrench, Bell, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MaintenanceRequests from './pages/MaintenanceRequests';
import ScheduleOptimizer from './pages/ScheduleOptimizer';
import WhatIfSimulator from './pages/WhatIfSimulator';
import AssetManagement from './pages/AssetManagement';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import './App.css';

// Auth Context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen, onLogout }) => {
  const menuItems = [
    { path: '/dashboard', icon: Layout, label: 'Dashboard' },
    { path: '/maintenance-requests', icon: Wrench, label: 'Maintenance Requests' },
    { path: '/schedule-optimizer', icon: TrendingUp, label: 'Schedule Optimizer' },
    { path: '/what-if-simulator', icon: BarChart3, label: 'What-If Simulator' },
    { path: '/asset-management', icon: Users, label: 'Asset Management' },
    { path: '/reports', icon: BarChart3, label: 'Reports & Analysis' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🚂</span>
            <span className="logo-text">Railway Maint.</span>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className="nav-item" onClick={() => setIsOpen(false)}>
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button className="nav-item logout-btn" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// Layout Component
const LayoutWrapper = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onLogout={onLogout} />

      <main className="main-content">
        <header className="top-bar">
          <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="header-right">
            <Link to="/notifications" className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </Link>
            <div className="user-avatar">RA</div>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Railway Maintenance System...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<LayoutWrapper onLogout={handleLogout}><Dashboard /></LayoutWrapper>} />
              <Route path="/maintenance-requests" element={<LayoutWrapper onLogout={handleLogout}><MaintenanceRequests /></LayoutWrapper>} />
              <Route path="/schedule-optimizer" element={<LayoutWrapper onLogout={handleLogout}><ScheduleOptimizer /></LayoutWrapper>} />
              <Route path="/what-if-simulator" element={<LayoutWrapper onLogout={handleLogout}><WhatIfSimulator /></LayoutWrapper>} />
              <Route path="/asset-management" element={<LayoutWrapper onLogout={handleLogout}><AssetManagement /></LayoutWrapper>} />
              <Route path="/reports" element={<LayoutWrapper onLogout={handleLogout}><Reports /></LayoutWrapper>} />
              <Route path="/notifications" element={<LayoutWrapper onLogout={handleLogout}><Notifications /></LayoutWrapper>} />
              <Route path="/settings" element={<LayoutWrapper onLogout={handleLogout}><Dashboard /></LayoutWrapper>} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;