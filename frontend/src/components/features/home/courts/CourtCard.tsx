import { Link } from 'react-router-dom'
import type { Court } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Card } from '@/components/ui/Card'

const CLOCK_ICON = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="8.5" />
    <path strokeLinecap="round" d="M12 7.5V12l3 2" />
  </svg>
)

const PIN_ICON = (
  <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s-6.5-5.2-6.5-10a6.5 6.5 0 1 1 13 0c0 4.8-6.5 10-6.5 10Z"
    />
    <circle cx="12" cy="11" r="2.3" />
  </svg>
)

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function CourtCard({ court }: { court: Court }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
        <div className="court-card-pattern absolute inset-0" />
        {court.image_url ? (
          <img
            src={court.image_url}
            alt={court.name}
            className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center text-6xl drop-shadow-sm">
            🏓
          </div>
        )}

        <div className="absolute right-3 top-3 rounded-xl bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <p className="text-sm font-extrabold text-primary-700">
            {formatPrice(court.price_per_hour)}
            <span className="text-xs font-medium text-gray-400"> /hr</span>
          </p>
        </div>

        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {CLOCK_ICON}
          {court.open_time ?? '06:00'} – {court.close_time ?? '21:00'}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-700">
          {court.name}
        </h3>

        <p className="mt-1.5 flex items-start gap-1.5 text-sm text-gray-500">
          {PIN_ICON}
          <span className="leading-snug">{court.address}</span>
        </p>

        <p className="mt-2.5 line-clamp-2 text-sm text-gray-600">{court.description}</p>

        {court.owner && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <span className="inline-flex items-center gap-2 text-xs text-gray-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-[10px] font-bold text-primary-700">
                {initials(court.owner.name)}
              </span>
              Managed by {court.owner.name}
            </span>
          </div>
        )}

        <Link
          to={`/courts/${court.id}`}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
        >
          View & Book
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </Card>
  )
}