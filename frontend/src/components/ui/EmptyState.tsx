import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary-950/15 bg-white/60 p-10 text-center shadow-xs backdrop-blur-xs',
        className,
      )}
    >
      <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 ring-1 ring-primary-500/20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
          <rect x="3" y="4" width="18" height="16" rx="3" strokeWidth="1.5" />
          <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="12" y1="4" x2="12" y2="20" strokeWidth="1.5" />
          <circle cx="17" cy="8" r="2" fill="#c6f135" stroke="#125340" strokeWidth="1" />
        </svg>
      </div>
      <p className="text-base font-semibold text-slate-800">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}