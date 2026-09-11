import { useState, type FormEvent } from 'react'
import type { SkillLevel } from '@/lib/types'
import { SKILL_LEVELS } from '@/lib/types'
import { getErrorMessage } from '@/lib/utils'
import { useAuth } from '@/components/common/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function ProfileForm({ onSaved }: { onSaved: () => void }) {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    skill_level: user?.skill_level ?? '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await updateProfile({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        skill_level: (form.skill_level || undefined) as SkillLevel | undefined,
        password: form.password || undefined,
      })
      setMessage('Profile updated.')
      setForm((f) => ({ ...f, password: '' }))
      onSaved()
    } catch (err) {
      setMessage(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="rounded-lg bg-primary-50 px-4 py-3 text-sm text-primary-700">{message}</div>
      )}
      <Input
        label="Full name"
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <Input
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <Input
        label="Phone"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
      />
      <Select
        label="Skill level"
        options={[{ value: '', label: 'No skill level set' }, ...SKILL_LEVELS]}
        value={form.skill_level}
        onChange={(e) => setForm((f) => ({ ...f, skill_level: e.target.value }))}
      />
      <Input
        label="New password (leave blank to keep current)"
        type="password"
        minLength={6}
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <Button type="submit" loading={loading}>
        Save changes
      </Button>
    </form>
  )
}