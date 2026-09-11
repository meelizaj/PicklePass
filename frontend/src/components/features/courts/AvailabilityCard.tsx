import type { BookedRange } from '@/lib/types'
import { addMinutes, format12H, parseTime, timeSlotsBetween } from '@/lib/time'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'

interface AvailabilityCardProps {
  openTime: string
  closeTime: string
  booked: BookedRange[]
  loading?: boolean
}

function isRangeBooked(start: string, end: string, booked: BookedRange[]): boolean {
  return booked.some(
    (b) => parseTime(b.start_time) < parseTime(end) && parseTime(b.end_time) > parseTime(start),
  )
}

export function AvailabilityCard({ openTime, closeTime, booked, loading }: AvailabilityCardProps) {
  const slots = timeSlotsBetween(openTime, closeTime)
  const available = slots.filter((slot) => !isRangeBooked(slot, addMinutes(slot, 60), booked)).length

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900">Court availability</h3>
        <p className="text-xs text-gray-500">
          {format12H(openTime)} – {format12H(closeTime)}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
          <Spinner size="sm" />
          Checking availability…
        </div>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 min-[420px]:grid-cols-5">
            {slots.map((slot) => {
              const slotEnd = addMinutes(slot, 60)
              const unavailable = isRangeBooked(slot, slotEnd, booked)
              return (
                <div
                  key={slot}
                  className={cn(
                    'rounded-md px-2 py-1.5 text-center text-xs font-medium',
                    unavailable
                      ? 'bg-gray-100 text-gray-400 line-through'
                      : 'bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200',
                  )}
                >
                  {format12H(slot)}
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary-200 ring-1 ring-inset ring-primary-300" />
              Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gray-200" />
              Booked
            </span>
            <span className="ml-auto font-medium text-gray-700">
              {available} of {slots.length} open slots
            </span>
          </div>
        </>
      )}
    </div>
  )
}