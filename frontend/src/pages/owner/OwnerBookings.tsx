import { useCallback, useEffect, useState } from 'react'
import { BookingTable } from '@/components/features/bookings/BookingTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { api } from '@/lib/api'
import type { Booking } from '@/lib/types'

export function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    api
      .get<Booking[]>('/bookings')
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  async function handleCancel(id: number) {
    await api.patch(`/bookings/${id}`, { status: 'cancelled' })
    load()
  }

  async function handleDelete(id: number) {
    await api.delete(`/bookings/${id}`)
    load()
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Bookings on your courts</h1>
      <p className="mt-1 text-gray-500">Cancel or remove bookings from your courts.</p>

      <div className="mt-8">
        {bookings.length === 0 ? (
          <EmptyState title="No bookings" description="Bookings on your courts will show up here." />
        ) : (
          <BookingTable
            bookings={bookings}
            showUser={true}
            onUpdateStatus={handleCancel}
            onCancel={handleDelete}
          />
        )}
      </div>
    </div>
  )
}