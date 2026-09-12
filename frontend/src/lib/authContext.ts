import { createContext } from 'react'
import type { SkillLevel, User } from '@/lib/types'

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  skill_level?: SkillLevel
}

export interface UpdateProfileData {
  name?: string
  email?: string
  password?: string
  phone?: string
  skill_level?: SkillLevel
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (data: RegisterData) => Promise<User>
  updateProfile: (data: UpdateProfileData) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)