import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { formatPrice, getErrorMessage } from '@/lib/utils'
import { addMinutes, format12H, parseTime, timeBoundaries } from '@/lib/time'
import { api } from '@/lib/axios'
import type { BookedRange } from '@/lib/types'
import { AvailabilityCard } from '@/components/features/home/courts/AvailabilityCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

interface BookingFormProps {
  courtId: number
  courtName: string
  pricePerHour: string
  openTime?: string | null
  closeTime?: string | null
  onSubmit: (data: { date: string; start_time: string; end_time: string; pax: number }) => Promise<void>
}

const DEFAULT_OPEN = '06:00'
const DEFAULT_CLOSE = '21:00'

function overlaps(start: string, end: string, booked: BookedRange[]): boolean {
  return booked.some(
    (b) => parseTime(b.start_time) < parseTime(end) && parseTime(b.end_time) > parseTime(start),
  )
}

export function BookingForm({
  courtId,
  courtName,
  pricePerHour,
  openTime,
  closeTime,
  onSubmit,
}: BookingFormProps) {
  const open = openTime ?? DEFAULT_OPEN
  const close = closeTime ?? DEFAULT_CLOSE
  const boundaries = timeBoundaries(open, close)
  const startCandidates = boundaries.slice(0, -1)

  const [date, setDate] = useState('')
  const [pax, setPax] = useState('1')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [booked, setBooked] = useState<BookedRange[]>([])
  const [availabilityLoading, setAvailabilityLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const requestId = useRef(0)

  function fetchAvailability(value: string) {
    const id = ++requestId.current
    if (!value) {
      setBooked([])
      setAvailabilityLoading(false)
      return
    }
    setAvailabilityLoading(true)
    api
      .get<{ booked: BookedRange[] }>(`/courts/${courtId}/availability`, { params: { date: value } })
      .then((res) => {
        if (id === requestId.current) setBooked(res.data.booked)
      })
      .catch(() => {
        if (id === requestId.current) setBooked([])
      })
      .finally(() => {
        if (id === requestId.current) setAvailabilityLoading(false)
      })
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setDate(value)
    fetchAvailability(value)
  }

  const startOptions = startCandidates.filter(
    (slot) => !overlaps(slot, addMinutes(slot, 60), booked),
  )

  const endOptions = start
    ? boundaries.filter((slot) => slot > start && !overlaps(start, slot, booked))
    : []

  const effectiveEnd = start && endOptions.includes(end) ? end : ''

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await onSubmit({
        date,
        start_time: start,
        end_time: effectiveEnd,
        pax: parseInt(pax),
      })
      setSuccess('Booking confirmed!')
      setStart('')
      setEnd('')
      fetchAvailability(date)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-500">
        Booking <span className="font-medium text-gray-900">{courtName}</span> at{' '}
        <span className="font-medium text-primary-600">{formatPrice(pricePerHour)}</span>/hr.
      </p>

      <AvailabilityCard openTime={open} closeTime={close} booked={booked} loading={availabilityLoading} />

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="rounded-lg bg-primary-50 px-4 py-3 text-sm text-primary-700">{success}</div>
      )}
      <Input
        label="Date"
        type="date"
        required
        min={new Date().toISOString().slice(0, 10)}
        value={date}
        onChange={handleDateChange}
      />
      <Select
        label="Start time"
        required
        options={[{ value: '', label: 'Select start time' }, ...startOptions.map((s) => ({ value: s, label: format12H(s) }))]}
        value={start}
        onChange={(e) => {
          setStart(e.target.value)
          setEnd('')
        }}
      />
      <Select
        label="End time"
        required
        options={[{ value: '', label: 'Select end time' }, ...endOptions.map((s) => ({ value: s, label: format12H(s) }))]}
        value={effectiveEnd}
        onChange={(e) => setEnd(e.target.value)}
        disabled={!start}
      />
      <Select
        label="Pax"
        required
        options={[
          { value: '', label: 'Select number of players' },
          { value: '1', label: '1 player' },
          { value: '2', label: '2 players' },
          { value: '3', label: '3 players' },
          { value: '4', label: '4 players' },
        ]}
        value={pax}
        onChange={(e) => setPax(e.target.value)}
      />
      <Button type="submit" loading={loading} className="w-full">
        Book this court
      </Button>
    </form>
  )
}