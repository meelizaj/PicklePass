import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-2xs transition-all',
          'placeholder:text-slate-400',
          'focus:border-primary-600 focus:outline-none focus:ring-3 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:opacity-75',
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
    </div>
  )
}