import { Link } from 'react-router-dom'
import { useAuth } from '@/components/common/useAuth'

export function CallToActionSection() {
  const { user } = useAuth()

  return (
    <section className="court-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 to-primary-950/60" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-optic-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready for your next game?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
          Join the PicklePass community. Book a court, find a match, and start dinking today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {user ? (
            <Link
              to="/matches"
              className="rounded-lg bg-optic-400 px-6 py-3 text-sm font-bold text-primary-950 shadow-sm transition hover:bg-optic-300"
            >
              Find a match
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-800 shadow-sm transition hover:bg-primary-50"
              >
                Create your free account
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}