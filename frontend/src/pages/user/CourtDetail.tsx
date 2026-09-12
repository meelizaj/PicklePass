import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BookingForm } from '@/components/features/home/courts/BookingForm'
import { ReceiptModal } from '@/components/features/home/courts/bookings/ReceiptModal'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/axios'
import { useToast } from '@/lib/toastContext'
import type { Booking, Court } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useAuth } from '@/lib/useAuth'

export function CourtDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [court, setCourt] = useState<Court | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [receipt, setReceipt] = useState<Booking | null>(null)
  const toast = useToast()

  useEffect(() => {
    api
      .get<Court>(`/courts/${id}`)
      .then((res) => setCourt(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  async function handleBook(data: { date: string; start_time: string; end_time: string; pax: number }) {
    const res = await api.post<Booking>('/bookings', { court_id: Number(id), ...data })
    setReceipt(res.data)
    toast.success('Booking confirmed!')
  }

  if (loading) return null

  if (notFound || !court) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="Court not found"
          description="This court may have been removed."
          action={
            <button onClick={() => navigate('/')} className="text-sm font-medium text-primary-600">
              Back to courts
            </button>
          }
        />
      </div>
    )
  }

  return (
    <>
<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-primary-200">
              {court.image_url ? (
                <img src={court.image_url} alt={court.name} className="h-full w-full rounded-xl object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl">🏓</div>
              )}
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">{court.name}</h1>
            <p className="mt-1 text-gray-500">
              {court.address}
              {court.owner?.name ? ` · Managed by ${court.owner.name}` : ''}
            </p>
            <p className="mt-4 text-gray-700">{court.description}</p>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Book a slot</h2>
                  <p className="text-lg font-bold text-primary-600">{formatPrice(court.price_per_hour)}/hr</p>
                </div>
              </CardHeader>
              <CardContent>
                {user ? (
                  <BookingForm
                    courtId={court.id}
                    courtName={court.name}
                    pricePerHour={court.price_per_hour}
                    openTime={court.open_time}
                    closeTime={court.close_time}
                    onSubmit={handleBook}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 py-6 text-center">
                    <p className="text-sm text-gray-500">Log in to book this court.</p>
                    <div className="flex gap-2">
                      <Link to="/login" state={{ from: `/courts/${court.id}` }}>
                        <Button variant="outline" size="sm">Log in</Button>
                      </Link>
                      <Link to="/register">
                        <Button size="sm">Sign up</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ReceiptModal booking={receipt} userName={user?.name ?? ''} onClose={() => setReceipt(null)} />
    </>
  )
}