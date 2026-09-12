import { useCallback, useEffect, useState } from 'react'
import { BookingTable } from '@/components/features/home/courts/bookings/BookingTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { api } from '@/lib/axios'
import { useToast } from '@/lib/toastContext'
import type { Booking } from '@/lib/types'
import { getErrorMessage } from '@/lib/utils'

export function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const load = useCallback(() => {
    api
      .get<Booking[]>('/bookings')
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  async function handleCancel(id: number) {
    try {
      await api.patch(`/bookings/${id}`, { status: 'cancelled' })
      toast.success('Booking cancelled.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/bookings/${id}`)
      toast.success('Booking removed.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return null

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