import { Link } from 'react-router-dom'
import { useAuth } from '@/lib/useAuth'

export function HeroSection() {
  const { user } = useAuth()
  const firstName = user ? user.name.split(' ')[0] : 'champ'

  return (
    <section className="court-pattern relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-800/40 to-primary-950/70" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-optic-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-primary-100 backdrop-blur-xs">
            <span className="h-2 w-2 rounded-full bg-optic-400" />
            Pickleball Club
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Find a court, <span className="text-optic-300">{firstName}.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-100">
            Book pickleball courts and find local players. Simple, fast, and fair — so you can
            spend less time organizing and more time dinking.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#courts"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-800 shadow-sm transition hover:bg-primary-50"
            >
              Browse courts
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How it works
            </a>
            {!user && (
              <Link
                to="/register"
                className="rounded-lg border border-optic-400/60 bg-optic-400/15 px-6 py-3 text-sm font-semibold text-optic-200 transition hover:bg-optic-400/25"
              >
                Create an account
              </Link>
            )}
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-primary-100">
            <div className="flex -space-x-2">
              {['JD', 'MK', 'AL'].map((initials) => (
                <span
                  key={initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-900 bg-primary-500 text-[10px] font-bold text-white"
                >
                  {initials}
                </span>
              ))}
            </div>
            <p>
              Loved by local players — <span className="font-semibold text-white">100% free</span> to
              join.
            </p>
          </div>
        </div>

        <div className="relative hidden justify-center lg:flex">
          <div className="relative">
            <div className="w-80 -rotate-6 rounded-2xl border border-white/10 bg-white/95 p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Sunset Court</p>
                  <p className="mt-1 text-2xl font-extrabold text-gray-900">Lakeside Park</p>
                </div>
                <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-800 p-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="2.4" fill="white" stroke="none" />
                    <circle cx="7" cy="9" r="1" fill="#c6f135" stroke="#104435" strokeWidth="0.5" />
                    <circle cx="17" cy="9" r="1" fill="#c6f135" stroke="#104435" strokeWidth="0.5" />
                    <circle cx="7" cy="15" r="1" fill="#c6f135" stroke="#104435" strokeWidth="0.5" />
                    <circle cx="17" cy="15" r="1" fill="#c6f135" stroke="#104435" strokeWidth="0.5" />
                  </svg>
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-primary-50 p-3">
                <div>
                  <p className="text-xs text-gray-500">Today · 6:00 PM</p>
                  <p className="text-sm font-semibold text-gray-800">2 hours · 2 players</p>
                </div>
                <span className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-bold text-white">
                  ₱350.00/hr
                </span>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-24 w-64 rotate-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-optic-100 text-lg">
                  🏓
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Match found!</p>
                  <p className="text-xs text-gray-500">2 players at your level nearby</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-10 rotate-6 rounded-2xl bg-optic-400 px-4 py-2 text-sm font-bold text-primary-950 shadow-lg">
              Level: Intermediate
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}