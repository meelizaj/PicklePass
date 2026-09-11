import type { ReactNode } from 'react'
import type { Role } from '@/lib/types'
import { ROLES } from '@/lib/types'
import { cn } from '@/lib/utils'

type BadgeVariant = 'green' | 'gray' | 'red' | 'yellow' | 'blue' | 'optic'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  dot?: boolean
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-primary-50 text-primary-800 ring-1 ring-primary-600/25 border border-primary-200/60',
  optic: 'bg-optic-100 text-optic-900 ring-1 ring-optic-400/40 border border-optic-300/60',
  gray: 'bg-slate-100 text-slate-700 ring-1 ring-slate-400/20 border border-slate-200/50',
  red: 'bg-rose-50 text-rose-800 ring-1 ring-rose-500/20 border border-rose-200/50',
  yellow: 'bg-amber-50 text-amber-800 ring-1 ring-amber-500/20 border border-amber-200/50',
  blue: 'bg-sky-50 text-sky-800 ring-1 ring-sky-500/20 border border-sky-200/50',
}

const dotClasses: Record<BadgeVariant, string> = {
  green: 'bg-primary-600',
  optic: 'bg-optic-500',
  gray: 'bg-slate-400',
  red: 'bg-rose-500',
  yellow: 'bg-amber-500',
  blue: 'bg-sky-500',
}

export function Badge({ variant = 'gray', dot = false, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide shadow-2xs',
        variantClasses[variant],
        className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotClasses[variant])} />}
      {children}
    </span>
  )
}

const roleColors: Record<Role, BadgeVariant> = {
  admin: 'red',
  owner: 'blue',
  user: 'gray',
}

export function RoleBadge({ role }: { role: Role }) {
  return <Badge variant={roleColors[role]}>{ROLES.find((r) => r.value === role)?.label}</Badge>
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, BadgeVariant> = {
    confirmed: 'green',
    pending: 'yellow',
    cancelled: 'red',
    open: 'green',
    matched: 'blue',
  }
  const variant = colors[status] ?? 'gray'
  return (
    <Badge variant={variant} dot={status === 'confirmed' || status === 'open'} className="capitalize">
      {status}
    </Badge>
  )
}