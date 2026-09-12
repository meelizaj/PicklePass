import { useState, useEffect, type ReactNode } from 'react'
import { api, clearAuth, onUnauthorized, storeToken, TOKEN_KEY } from '@/lib/axios'
import type { AuthResponse, User } from '@/lib/types'
import { AuthContext, type AuthContextType, type RegisterData, type UpdateProfileData } from '../../lib/authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(() => !!localStorage.getItem(TOKEN_KEY))

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return

    api
      .get<User>('/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))

    return onUnauthorized(() => setUser(null))
  }, [])

  const applyAuth = (data: AuthResponse) => {
    storeToken(data.token)
    setUser(data.user)
  }

  const login = async (email: string, password: string) => {
    const res = await api.post<AuthResponse>('/login', { email, password })
    applyAuth(res.data)
    return res.data.user
  }

  const register = async (data: RegisterData) => {
    const res = await api.post<AuthResponse>('/register', data)
    applyAuth(res.data)
    return res.data.user
  }

  const updateProfile = async (data: UpdateProfileData) => {
    const res = await api.put<User>('/profile', data)
    setUser(res.data)
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } finally {
      clearAuth()
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    updateProfile,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}