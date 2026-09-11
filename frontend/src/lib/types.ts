export type Role = 'user' | 'owner' | 'admin'

export type SkillLevel = 'novice' | 'intermediate' | 'advanced'

export type BookingStatus = 'confirmed' | 'cancelled'

export type MatchStatus = 'open' | 'matched' | 'cancelled'

export interface User {
  id: number
  name: string
  email: string
  phone: string | null
  skill_level: SkillLevel | null
  role: Role
  created_at: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Court {
  id: number
  owner_id: number
  name: string
  address: string
  description: string
  price_per_hour: string
  image_url: string | null
  open_time?: string | null
  close_time?: string | null
  bookings_count?: number
  owner?: { id: number; name: string }
  created_at: string
}

export interface BookedRange {
  start_time: string
  end_time: string
  status: string
}

export interface CourtAvailability {
  date: string
  booked: BookedRange[]
}

export interface AppNotification {
  id: number
  type: string
  title: string
  message: string
  link: string | null
  notifiable_id: number | null
  read_at: string | null
  created_at: string
}

export interface NotificationsResponse {
  notifications: AppNotification[]
  unread: number
}

export interface Booking {
  id: number
  court_id: number
  user_id: number
  date: string
  start_time: string
  end_time: string
  status: BookingStatus
  reference?: string
  court?: { id: number; name: string; price_per_hour: string }
  user?: { id: number; name: string }
  pax: number
  created_at: string
}

export interface MatchRequest {
  id: number
  user_id: number
  court_id: number | null
  skill_level: SkillLevel
  date: string | null
  time: string | null
  notes: string | null
  status: MatchStatus
  opponent_id: number | null
  user?: { id: number; name: string }
  opponent?: { id: number; name: string } | null
  court?: { id: number; name: string } | null
  created_at: string
}

export interface AdminDashboardData {
  stats: {
    users: number
    owners: number
    courts: number
    bookings: number
    revenue: number
  }
  recent_bookings: Booking[]
  recent_users: User[]
  recent_courts: Court[]
}

export interface OwnerDashboardData {
  stats: {
    courts: number
    bookings: number
    bookings_total: number
    revenue: number
  }
  courts: Court[]
  recent_bookings: Booking[]
}

export const SKILL_LEVELS: { value: SkillLevel; label: string }[] = [
  { value: 'novice', label: 'Novice' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export const ROLES: { value: Role; label: string }[] = [
  { value: 'user', label: 'User' },
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
]