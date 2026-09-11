import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number) {
  const num = Number(price)
  return `₱${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}

export function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as {
      response?: { data?: { message?: string; errors?: Record<string, string[]> } }
    }).response
    const firstError = Object.values(response?.data?.errors ?? {})[0]?.[0]
    if (firstError) return firstError
    if (response?.data?.message) return response.data.message
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong.'
}