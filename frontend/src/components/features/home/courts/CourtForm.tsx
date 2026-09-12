import { useState, type ChangeEvent, type FormEvent } from 'react'
import { getErrorMessage } from '@/lib/utils'
import { format12H, timeSlotsBetween } from '@/lib/time'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'

export interface CourtFormValues {
  name: string
  address: string
  description: string
  price_per_hour: number
  image: File | null
  open_time: string
  close_time: string
}

const TIME_OPTIONS = timeSlotsBetween('00:00', '24:00').map((t) => ({
  value: t,
  label: format12H(t),
}))

interface CourtFormProps {
  initial?: CourtFormValues
  submitLabel: string
  onSubmit: (values: CourtFormValues) => Promise<void>
  onCancel?: () => void
  currentImage?: string | null
}

export function CourtForm({ initial, submitLabel, onSubmit, onCancel, currentImage }: CourtFormProps) {
  const [form, setForm] = useState<CourtFormValues>({
    name: initial?.name ?? '',
    address: initial?.address ?? '',
    description: initial?.description ?? '',
    price_per_hour: initial?.price_per_hour ?? 0,
    image: initial?.image ?? null,
    open_time: initial?.open_time ?? '06:00',
    close_time: initial?.close_time ?? '21:00',
  })
  const [preview, setPreview] = useState<string | null>(currentImage ?? null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set<K extends keyof CourtFormValues>(field: K, value: CourtFormValues[K]) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setForm((f) => ({ ...f, image: file }))
    setPreview(file ? URL.createObjectURL(file) : (currentImage ?? null))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSubmit(form)
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
      <Input label="Court name" required value={form.name} onChange={(e) => set('name', e.target.value)} />
      <Input
        label="Address"
        required
        value={form.address}
        onChange={(e) => set('address', e.target.value)}
      />
      <Textarea
        label="Description"
        required
        rows={3}
        value={form.description}
        onChange={(e) => set('description', e.target.value)}
      />
      <Input
        label="Price per hour (PHP)"
        type="number"
        required
        min={0}
        step="0.01"
        value={form.price_per_hour}
        onChange={(e) => set('price_per_hour', Number(e.target.value))}
      />
      <div className="space-y-1.5">
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          Court photo (optional)
        </span>
        {preview && (
          <div className="aspect-video w-full max-h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <img src={preview} alt="Court photo preview" className="h-full w-full object-cover" />
          </div>
        )}
        <Input label="Upload photo" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Opens at"
          required
          options={TIME_OPTIONS}
          value={form.open_time}
          onChange={(e) => set('open_time', e.target.value)}
        />
        <Select
          label="Closes at"
          required
          options={TIME_OPTIONS}
          value={form.close_time}
          onChange={(e) => set('close_time', e.target.value)}
        />
      </div>
      <div className="sticky -bottom-4 -mx-6 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}