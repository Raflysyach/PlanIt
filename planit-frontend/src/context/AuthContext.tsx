import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { authService } from '../services/auth.service'
import { usersService } from '../services/users.service'

interface User {
  id: number
  email: string
  username: string
  fullName: string
  phone?: string
  location?: string
  gender?: string
  dateOfBirth?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; username: string; password: string; fullName: string }) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
  updateUser: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('planit_token')
    const savedUser = localStorage.getItem('planit_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password })
    setToken(res.token)
    setUser(res.user)
    localStorage.setItem('planit_token', res.token)
    localStorage.setItem('planit_user', JSON.stringify(res.user))
  }

  const register = async (data: { email: string; username: string; password: string; fullName: string }) => {
    const res = await authService.register(data)
    setToken(res.token)
    setUser(res.user)
    localStorage.setItem('planit_token', res.token)
    localStorage.setItem('planit_user', JSON.stringify(res.user))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('planit_token')
    localStorage.removeItem('planit_user')
  }

  const refreshUser = async () => {
    try {
      const data = await usersService.getMe()
      setUser(data)
      localStorage.setItem('planit_user', JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }

  const updateUser = async (data: Partial<User>) => {
    const updated = await usersService.updateMe(data)
    setUser(updated)
    localStorage.setItem('planit_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!token, login, register, logout, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}