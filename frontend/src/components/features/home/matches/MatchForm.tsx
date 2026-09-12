import { useState, type FormEvent } from 'react'
import type { Court } from '@/lib/types'
import { SKILL_LEVELS } from '@/lib/types'
import { getErrorMessage } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'

interface MatchFormProps {
  courts: Court[]
  onSubmit: (data: {
    skill_level: string
    court_id: number | null
    date: string | null
    time: string | null
    notes: string | null
  }) => Promise<void>
}

export function MatchForm({ courts, onSubmit }: MatchFormProps) {
  const [form, setForm] = useState({
    skill_level: '',
    court_id: '',
    date: '',
    time: '',
    notes: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set<K extends keyof typeof form>(field: K, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSubmit({
        skill_level: form.skill_level,
        court_id: form.court_id ? Number(form.court_id) : null,
        date: form.date || null,
        time: form.time || null,
        notes: form.notes || null,
      })
      setForm({ skill_level: '', court_id: '', date: '', time: '', notes: '' })
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
      <Select
        label="Skill level"
        required
        options={[{ value: '', label: 'Select your level' }, ...SKILL_LEVELS]}
        value={form.skill_level}
        onChange={(e) => set('skill_level', e.target.value)}
      />
      <Select
        label="Preferred court (optional)"
        options={[{ value: '', label: 'No preference' }, ...courts.map((c) => ({ value: String(c.id), label: c.name }))]}
        value={form.court_id}
        onChange={(e) => set('court_id', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date (optional)"
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          value={form.date}
          onChange={(e) => set('date', e.target.value)}
        />
        <Input
          label="Time (optional)"
          type="time"
          value={form.time}
          onChange={(e) => set('time', e.target.value)}
        />
      </div>
      <Textarea
        label="Notes (optional)"
        rows={2}
        placeholder="e.g. Looking for a friendly game, 2.5 level, bring balls"
        value={form.notes}
        onChange={(e) => set('notes', e.target.value)}
      />
      <Button type="submit" loading={loading}>
        Post match request
      </Button>
    </form>
  )
}