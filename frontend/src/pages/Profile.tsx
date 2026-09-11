import { useEffect, useState } from 'react'
import { ProfileForm } from '@/components/features/profile/ProfileForm'
import { BookingTable } from '@/components/features/bookings/BookingTable'
import { ReceiptModal } from '@/components/features/bookings/ReceiptModal'
import { useAuth } from '@/components/common/useAuth'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { RoleBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { api } from '@/lib/api'
import type { Booking } from '@/lib/types'

export function ProfilePage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [receipt, setReceipt] = useState<Booking | null>(null)

  function loadBookings() {
    api
      .get<Booking[]>('/bookings')
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }

  useEffect(loadBookings, [])

  async function handleCancel(id: number) {
    await api.delete(`/bookings/${id}`)
    setBookings((list) => list.filter((b) => b.id !== id))
  }

  if (!user) return null

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">My profile</h1>
              <RoleBadge role={user.role} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {user.email} · {user.phone || 'No phone'} ·{' '}
              <span className="capitalize">{user.skill_level ?? 'skill level not set'}</span>
            </p>
          </CardHeader>
          <CardContent>
            <ProfileForm onSaved={loadBookings} />
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">My bookings</h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : bookings.length === 0 ? (
            <EmptyState title="No bookings yet" description="Book a court to see it here." />
          ) : (
            <BookingTable bookings={bookings} onCancel={handleCancel} onReceipt={setReceipt} />
          )}
        </div>
      </div>
      <ReceiptModal booking={receipt} userName={user.name} onClose={() => setReceipt(null)} />
    </div>
  )
}