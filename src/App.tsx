import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import LoginScreen from './components/auth/LoginScreen'
import SignUpScreen from './components/auth/SignUpScreen'
import Dashboard from './components/dashboard/Dashboard'
import SpotAnalyzer from './components/features/SpotAnalyzer'
import CatchLog from './components/features/CatchLog'
import FishingForecast from './components/features/FishingForecast'
import Profile from './components/profile/Profile'
import Layout from './components/layout/Layout'
import LoadingScreen from './components/common/LoadingScreen'
import { useAuth } from './hooks/useAuth'

function AppContent() {
  const { user, loading } = useAuth()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (losading || isInitialLoad) {
    return <LoadingScreen />
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/spot-analyzer" element={<SpotAnalyzer />} />
        <Route path="/catch-log" element={<CatchLog />} />
        <Route path="/forecast" element={<FishingForecast />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <AppContent />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App