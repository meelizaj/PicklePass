import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { api } from '@/lib/axios'
import type { OwnerDashboardData } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="flex flex-col p-5">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </Card>
  )
}

export function OwnerDashboardPage() {
  const [data, setData] = useState<OwnerDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<OwnerDashboardData>('/dashboard/owner')
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  const stats = data?.stats
  const courts = data?.courts ?? []
  const bookings = data?.recent_bookings ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Owner dashboard</h1>
          <p className="mt-1 text-gray-500">Your courts and recent activity.</p>
        </div>
        <Link to="/owner/courts">
          <Button>Manage courts</Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Your courts" value={stats?.courts ?? 0} />
        <StatCard label="Active bookings" value={stats?.bookings ?? 0} />
        <StatCard label="Total bookings" value={stats?.bookings_total ?? 0} />
        <StatCard label="Revenue" value={stats ? formatPrice(stats.revenue) : '₱0.00'} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your courts</h2>
            <Link to="/owner/courts" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          {courts.length === 0 ? (
            <p className="text-sm text-gray-500">
              No courts yet.{' '}
              <Link to="/owner/courts" className="font-medium text-primary-600 hover:text-primary-700">
                Create one
              </Link>
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {courts.map((court) => (
                <Card key={court.id} className="flex items-center justify-between p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">{court.name}</p>
                    <p className="truncate text-sm text-gray-500">{court.address}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <p className="whitespace-nowrap text-sm font-bold text-primary-600">
                      {formatPrice(court.price_per_hour)}/hr
                    </p>
                    {typeof court.bookings_count === 'number' && (
                      <Badge variant="blue">{court.bookings_count} bookings</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent bookings</h2>
            <Link to="/owner/bookings" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          {bookings.length === 0 ? (
            <p className="text-sm text-gray-500">No bookings on your courts yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Player</th>
                    <th className="px-5 py-3 font-medium">Court</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Time</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="px-5 py-3 font-medium text-gray-900">{b.user?.name ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{b.court?.name ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{b.date}</td>
                      <td className="px-5 py-3 text-gray-600">{b.start_time} – {b.end_time}</td>
                      <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
