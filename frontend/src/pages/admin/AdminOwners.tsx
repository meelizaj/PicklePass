import { useCallback, useEffect, useState } from 'react'
import { UserTable } from '@/components/features/admin/UserTable'
import { Spinner } from '@/components/ui/Spinner'
import { api } from '@/lib/api'
import type { Role, User } from '@/lib/types'

export function AdminOwnersPage() {
  const [owners, setOwners] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    api
      .get<User[]>('/admin/owners')
      .then((res) => setOwners(res.data))
      .catch(() => setOwners([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  async function handleRoleChange(id: number, role: Role) {
    await api.patch(`/admin/users/${id}`, { role })
    load()
  }

  async function handleDelete(id: number) {
    await api.delete(`/admin/users/${id}`)
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
      <h1 className="text-3xl font-bold text-gray-900">Manage owners</h1>
      <p className="mt-1 text-gray-500">Revoke owner access or remove owner accounts.</p>
      <div className="mt-8">
        <UserTable users={owners} onRoleChange={handleRoleChange} onDelete={handleDelete} />
      </div>
    </div>
  )
}