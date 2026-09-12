import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getErrorMessage } from '@/lib/utils'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const loggedIn = await login(form.email, form.password)
      if (loggedIn.role === 'admin') navigate('/admin/dashboard')
      else if (loggedIn.role === 'owner') navigate('/owner/dashboard')
      else navigate(redirectTo ?? '/')
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
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <Button type="submit" loading={loading} className="w-full">
        Log in
      </Button>
    </form>
  )
}