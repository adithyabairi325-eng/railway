import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (credentials) => {
    setIsLoading(true)
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const userData = {
        id: Date.now(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: credentials.role,
        department: getDepartmentByRole(credentials.role),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`
      }
      setUser(userData)
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const getDepartmentByRole = (role) => {
    const departments = {
      'admin': 'Administration',
      'engineering': 'Engineering',
      'traction': 'Traction/OHE',
      'signal': 'Signal & Telecom'
    }
    return departments[role] || 'Unknown'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}