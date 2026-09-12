import { useCallback, useEffect, useState } from 'react'
import { UserTable } from '@/components/features/admin/UserTable'
import { api } from '@/lib/axios'
import { useToast } from '@/lib/toastContext'
import type { Role, User } from '@/lib/types'
import { getErrorMessage } from '@/lib/utils'

export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const load = useCallback(() => {
    api
      .get<User[]>('/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  async function handleRoleChange(id: number, role: Role) {
    try {
      await api.patch(`/admin/users/${id}`, { role })
      toast.success(role === 'owner' ? 'User promoted to owner.' : 'User demoted to member.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/admin/users/${id}`)
      toast.success('User deleted.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return null

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Manage users</h1>
      <p className="mt-1 text-gray-500">Promote users to owners, demote owners, or delete accounts.</p>
      <div className="mt-8">
        <UserTable users={users} onRoleChange={handleRoleChange} onDelete={handleDelete} />
      </div>
    </div>
  )
}