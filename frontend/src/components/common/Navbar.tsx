import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '../../lib/useAuth'
import { NotificationBell } from './NotificationBell'

const ownerLinks = [
  { to: '/owner/dashboard', label: 'Dashboard' },
  { to: '/owner/courts', label: 'My Courts' },
  { to: '/owner/bookings', label: 'Bookings' },
]

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/owners', label: 'Owners' },
]

export function PickleballLogo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="paddleGrad" x1="6" y1="6" x2="30" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#125340" />
            <stop offset="1" stopColor="#07251c" />
          </linearGradient>
          <linearGradient id="faceGrad" x1="10" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#168260" />
            <stop offset="1" stopColor="#0d3d25" />
          </linearGradient>
        </defs>

        {/* Outer subtle shield/circle glow */}
        <rect width="40" height="40" rx="10" fill="#f0fbf7" />

        {/* Paddle rotated */}
        <g transform="rotate(-28 19 21)">
          {/* Handle */}
          <rect x="17" y="24" width="4" height="11" rx="1.5" fill="#e2f7ee" stroke="#104435" strokeWidth="1" />
          <line x1="17.5" y1="27" x2="20.5" y2="27" stroke="#13684e" strokeWidth="0.8" />
          <line x1="17.5" y1="30" x2="20.5" y2="30" stroke="#13684e" strokeWidth="0.8" />
          <line x1="17.5" y1="33" x2="20.5" y2="33" stroke="#13684e" strokeWidth="0.8" />
          {/* Paddle Head */}
          <rect x="11" y="6" width="16" height="20" rx="6" fill="url(#paddleGrad)" stroke="#23a67d" strokeWidth="1" />
          {/* Sweet Spot */}
          <rect x="13.5" y="8.5" width="11" height="15" rx="4" fill="url(#faceGrad)" />
        </g>

        {/* Optic Lime Perforated Pickleball */}
        <g transform="translate(22, 9)">
          <circle cx="6.5" cy="6.5" r="6.5" fill="#c6f135" stroke="#104435" strokeWidth="0.75" />
          {/* Pickleball perforated holes */}
          <circle cx="6.5" cy="6.5" r="1.1" fill="#07251c" />
          <circle cx="3.8" cy="4.8" r="0.9" fill="#07251c" />
          <circle cx="9.2" cy="4.8" r="0.9" fill="#07251c" />
          <circle cx="3.8" cy="8.2" r="0.9" fill="#07251c" />
          <circle cx="9.2" cy="8.2" r="0.9" fill="#07251c" />
          <circle cx="6.5" cy="2.8" r="0.8" fill="#07251c" />
          <circle cx="6.5" cy="10.2" r="0.8" fill="#07251c" />
        </g>
      </svg>
    </div>
  )
}

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const links = []
  if (user?.role === 'owner') links.push(...ownerLinks)
  else if (user?.role === 'admin') links.push(...adminLinks)
  else if (user) links.push({ to: '/matches', label: 'Find a Match' })

  return (
    <header className="sticky top-0 z-40 border-b border-primary-950/10 bg-white/95 backdrop-blur-md transition-all shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5 transition-transform hover:scale-[1.01]">
          <PickleballLogo className="h-9 w-9 ring-1 ring-primary-500/20 rounded-xl" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                PicklePass
              </span>
              <span className="h-2 w-2 rounded-full bg-optic-400 ring-2 ring-primary-600/30" />
            </div>
            <span className="text-[10px] font-semibold tracking-wider text-primary-700 uppercase -mt-1">
              Pickleball Club
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1.5 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary-50 text-primary-800 font-semibold border border-primary-200/80 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <NotificationBell />
              <Link
                to="/profile"
                className="flex items-center gap-2.5 rounded-full border border-primary-200 bg-primary-50/60 py-1 pl-1 pr-3 transition-colors hover:bg-primary-100/60"
                title={user.name}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-700 to-primary-900 text-xs font-bold text-white shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-xs font-semibold text-primary-900 max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-800 active:scale-[0.98]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {user && <NotificationBell />}
          <button
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-primary-50 text-primary-800 font-semibold border border-primary-200/80'
                      : 'text-slate-600 hover:bg-slate-50',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Profile ({user.name})
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    handleLogout()
                  }}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-slate-100">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-primary-700 px-4 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-primary-800"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}