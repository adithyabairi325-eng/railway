import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/common/Sidebar'
import Header from './components/common/Header'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MaintenanceRequests from './pages/MaintenanceRequests'
import ScheduleOptimizer from './pages/ScheduleOptimizer'
import WhatIfSimulator from './pages/WhatIfSimulator'
import AssetManagement from './pages/AssetManagement'
import Analytics from './pages/Analytics'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </Router>
      </AuthProvider>
    )
  }

  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="flex h-screen bg-slate-50">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header user={user} />
              <main className="flex-1 overflow-auto p-6">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/maintenance-requests" element={<MaintenanceRequests />} />
                  <Route path="/schedule-optimizer" element={<ScheduleOptimizer />} />
                  <Route path="/what-if-simulator" element={<WhatIfSimulator />} />
                  <Route path="/asset-management" element={<AssetManagement />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
          </div>
          <Toaster position="top-right" />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App