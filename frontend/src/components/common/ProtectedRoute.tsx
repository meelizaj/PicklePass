import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { Role } from '@/lib/types'
import { Spinner } from '@/components/ui/Spinner'
import { useAuth } from './useAuth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}

export function RoleRoute({ roles, children }: { roles: Role[]; children: ReactNode }) {
  return <RoleGate roles={roles}>{children}</RoleGate>
}

function RoleGate({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { user } = useAuth()

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}