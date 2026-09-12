import type { Booking } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'

interface BookingTableProps {
  bookings: Booking[]
  showUser?: boolean
  onUpdateStatus?: (id: number, status: 'confirmed' | 'cancelled') => void
  onCancel?: (id: number) => void
  onReceipt?: (booking: Booking) => void
}

export function BookingTable({ bookings, showUser = false, onUpdateStatus, onCancel, onReceipt }: BookingTableProps) {
  if (bookings.length === 0) {
    return <EmptyState title="No bookings yet" description="Bookings will appear here." />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-6 py-3 font-medium">Reference</th>
            <th className="px-6 py-3 font-medium">Court</th>
            {showUser && <th className="px-6 py-3 font-medium">Player</th>}
            <th className="px-6 py-3 font-medium">Date</th>
            <th className="px-6 py-3 font-medium">Time</th>
            <th className="px-6 py-3 font-medium">Pax</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className={cn(booking.status === 'cancelled' && 'opacity-60')}>
              <td className="px-6 py-4">
                <p className="font-mono text-xs font-semibold text-primary-700">{booking.reference ?? '—'}</p>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">{booking.court?.name ?? 'Court'}</td>
              {showUser && <td className="px-6 py-4 text-gray-600">{booking.user?.name ?? 'Player'}</td>}
              <td className="px-6 py-4 text-gray-600">{booking.date}</td>
              <td className="px-6 py-4 text-gray-600">
                {booking.start_time} - {booking.end_time}
              </td>
              <td className="px-6 py-4 text-gray-600">{booking.pax}</td>
              <td className="px-6 py-4">
                <Badge variant={booking.status === 'cancelled' ? 'red' : 'green'} className="capitalize">
                  {booking.status}
                </Badge>
              </td>
              <td className="px-6 py-4 text-right">
                {onReceipt && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReceipt(booking)}
                    className="mr-2"
                  >
                    Receipt
                  </Button>
                )}
                {onUpdateStatus && booking.status !== 'cancelled' && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                )}
                {onCancel && (
                  <Button size="sm" variant="danger" onClick={() => onCancel(booking.id)}>
                    Remove
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}