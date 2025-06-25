import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('fishcast_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - replace with real auth
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
    }
    
    setUser(mockUser)
    localStorage.setItem('fishcast_user', JSON.stringify(mockUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - replace with real auth
    const mockUser: User = {
      id: '1',
      email,
      name,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
    }
    
    setUser(mockUser)
    localStorage.setItem('fishcast_user', JSON.stringify(mockUser))
  }

  const loginWithGoogle = async () => {
    // Mock Google auth - replace with real Google OAuth
    const mockUser: User = {
      id: '1',
      email: 'user@gmail.com',
      name: 'John Angler',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
    }
    
    setUser(mockUser)
    localStorage.setItem('fishcast_user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fishcast_user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      loginWithGoogle,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}