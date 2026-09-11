import type { User } from '@/lib/types'
import type { Role } from '@/lib/types'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/EmptyState'
import { RoleBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface UserTableProps {
  users: User[]
  onRoleChange?: (id: number, role: Role) => void
  onDelete?: (id: number) => void
}

export function UserTable({ users, onRoleChange, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return <EmptyState title="No users found" description="Users will appear here." />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-6 py-3 font-medium">User</th>
            <th className="px-6 py-3 font-medium">Role</th>
            <th className="px-6 py-3 font-medium">Skill level</th>
            <th className="px-6 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className={cn(user.role === 'admin' && 'bg-gray-50')}>
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </td>
              <td className="px-6 py-4">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-6 py-4 capitalize text-gray-600">
                {user.skill_level ?? '—'}
              </td>
              <td className="px-6 py-4 text-right">
                {user.role !== 'admin' && onRoleChange && (
                  <>
                    <Button
                      size="sm"
                      variant={user.role === 'owner' ? 'secondary' : 'primary'}
                      onClick={() => onRoleChange(user.id, user.role === 'owner' ? 'user' : 'owner')}
                      className="mr-2"
                    >
{user.role === 'owner'
                      ? 'Demote to user'
                      : 'Promote to owner'}
                    </Button>
                    {onDelete && (
                      <Button size="sm" variant="danger" onClick={() => onDelete(user.id)}>
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}