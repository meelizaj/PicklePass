import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'
import type { AppNotification } from '@/lib/types'

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function NotificationBell() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    let active = true

    const poll = () => {
      api
        .get<{ notifications: AppNotification[]; unread: number }>('/notifications')
        .then((res) => {
          if (!active) return
          setNotifications(res.data.notifications)
          setUnread(res.data.unread)
        })
        .catch(() => {
          if (active) {
            setNotifications([])
            setUnread(0)
          }
        })
    }

    poll()
    const interval = setInterval(poll, 30_000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  function handleToggle() {
    if (open) {
      setOpen(false)
      return
    }
    setOpen(true)
    api
      .get<{ notifications: AppNotification[]; unread: number }>('/notifications')
      .then((res) => {
        setNotifications(res.data.notifications)
        setUnread(res.data.unread)
        if (res.data.unread > 0) {
          api
            .post('/notifications/read-all')
            .then(() => {
              setUnread(0)
              setNotifications((list) =>
                list.map((n) =>
                  n.read_at === null ? { ...n, read_at: new Date().toISOString() } : n,
                ),
              )
            })
            .catch(() => {})
        }
      })
      .catch(() => {})
  }

  function handleItemClick(notification: AppNotification) {
    setOpen(false)
    if (notification.link) navigate(notification.link)
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 mt-1 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-gray-400">
                  No notifications yet.
                </p>
              ) : (
                notifications.slice(0, 20).map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleItemClick(notification)}
                    className={cn(
                      'flex w-full flex-col gap-0.5 border-b border-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-50',
                      notification.read_at === null && 'bg-primary-50/40',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{notification.title}</span>
                      {notification.read_at === null && (
                        <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <span className="text-[11px] text-gray-400">{timeAgo(notification.created_at)}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}