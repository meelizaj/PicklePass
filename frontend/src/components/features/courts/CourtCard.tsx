import { Link } from 'react-router-dom'
import type { Court } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Card } from '@/components/ui/Card'

export function CourtCard({ court }: { court: Court }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary-100 to-primary-200">
        {court.image_url ? (
          <img src={court.image_url} alt={court.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">🏓</div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900">{court.name}</h3>
          <p className="whitespace-nowrap text-sm font-bold text-primary-600">
            {formatPrice(court.price_per_hour)}
            <span className="text-xs font-normal text-gray-400">/hr</span>
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {court.address}
          {court.owner?.name ? ` · ${court.owner.name}` : ''}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Open {court.open_time ?? '06:00'} – {court.close_time ?? '21:00'}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{court.description}</p>
        <Link
          to={`/courts/${court.id}`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          View & Book
        </Link>
      </div>
    </Card>
  )
}