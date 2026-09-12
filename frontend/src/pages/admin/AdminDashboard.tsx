import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { RoleBadge, StatusBadge } from '@/components/ui/Badge'
import { api } from '@/lib/axios'
import type { AdminDashboardData } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

function StatCard({ label, value, href }: { label: string; value: string | number; href?: string }) {
  const content = (
    <Card className="flex flex-col p-5">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </Card>
  )
  return href ? <Link to={href} className="block transition-shadow hover:shadow-md">{content}</Link> : content
}

export function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<AdminDashboardData>('/dashboard/admin')
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  const stats = data?.stats
  const bookings = data?.recent_bookings ?? []
  const users = data?.recent_users ?? []
  const courts = data?.recent_courts ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin dashboard</h1>
      <p className="mt-1 text-gray-500">Overview of the platform.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={stats?.users ?? 0} href="/admin/users" />
        <StatCard label="Owners" value={stats?.owners ?? 0} href="/admin/owners" />
        <StatCard label="Courts" value={stats?.courts ?? 0} />
        <StatCard label="Revenue" value={stats ? formatPrice(stats.revenue) : '₱0.00'} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Recent bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-sm text-gray-500">No bookings yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Court</th>
                    <th className="px-5 py-3 font-medium">Player</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Time</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="px-5 py-3 font-medium text-gray-900">{b.court?.name ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{b.user?.name ?? '—'}</td>
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

        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Recent users</h2>
          {users.length === 0 ? (
            <p className="text-sm text-gray-500">No users yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="px-5 py-3 font-medium text-gray-900">{u.name}</td>
                      <td className="px-5 py-3 text-gray-600">{u.email}</td>
                      <td className="px-5 py-3"><RoleBadge role={u.role} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {courts.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Recent courts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courts.map((c) => (
              <Card key={c.id} className="p-5">
                <p className="font-semibold text-gray-900">{c.name}</p>
                <p className="mt-1 text-sm text-gray-500">{c.address}</p>
                {c.owner && (
                  <p className="mt-1 text-xs text-gray-400">Owner: {c.owner.name}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
