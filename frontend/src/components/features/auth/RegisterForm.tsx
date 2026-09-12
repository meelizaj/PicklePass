import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SkillLevel } from '@/lib/types'
import { SKILL_LEVELS } from '@/lib/types'
import { getErrorMessage } from '@/lib/utils'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    skill_level: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const loggedIn = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        skill_level: (form.skill_level || undefined) as SkillLevel | undefined,
      })
      if (loggedIn.role === 'admin') navigate('/admin/dashboard')
      else if (loggedIn.role === 'owner') navigate('/owner/dashboard')
      else navigate('/')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
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
        label="Password"
        type="password"
        required
        minLength={6}
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <Input
        label="Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
      />
      <Select
        label="Skill level (optional)"
        options={[{ value: '', label: 'Select skill level' }, ...SKILL_LEVELS]}
        value={form.skill_level}
        onChange={(e) => setForm((f) => ({ ...f, skill_level: e.target.value }))}
      />
      <Button type="submit" loading={loading} className="w-full">
        Create account
      </Button>
    </form>
  )
}