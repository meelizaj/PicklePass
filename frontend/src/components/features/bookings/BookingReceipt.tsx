import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import type { Booking } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface BookingReceiptProps {
  booking: Booking
  userName: string
  onClose: () => void
}

function hoursBetween(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return (eh * 60 + em - sh * 60 - sm) / 60
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-gray-100 py-1">
      <span className="text-[11px] text-gray-500">{label}</span>
      <span className="text-[11px] font-semibold text-gray-900">{value}</span>
    </div>
  )
}

export function BookingReceipt({ booking, userName, onClose }: BookingReceiptProps) {
  const [qr, setQr] = useState('')
  const hours = hoursBetween(booking.start_time, booking.end_time)
  const pricePerHour = Number(booking.court?.price_per_hour ?? 0)
  const total = pricePerHour * hours

  const qrPayload = [
    `PICKLEPASS`,
    booking.reference,
    booking.court?.name,
    booking.date,
    `${booking.start_time}-${booking.end_time}`,
    `${booking.pax}`,
  ].join(' | ')

  useEffect(() => {
    QRCode.toDataURL(qrPayload, { width: 200, margin: 2, color: { dark: '#07251c' } }).then(setQr)
  }, [qrPayload])

  function handlePrint() {
    window.print()
  }

  return (
    <div className="receipt-wrapper flex flex-col items-center gap-4">
      <div id="booking-receipt" className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between bg-primary-700 px-4 py-2.5 text-white">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold tracking-tight">PicklePass</span>
            <span className="h-1 w-1 rounded-full bg-optic-400" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-100">
              Pickleball Club
            </span>
          </div>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase">
            {booking.status}
          </span>
        </div>

        <div className="flex items-center gap-4 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Reference</p>
            <p className="mt-0.5 truncate font-mono text-lg font-extrabold tracking-widest text-primary-700">
              {booking.reference ?? '—'}
            </p>
            <p className="mt-1 truncate text-xs text-gray-600">
              {userName} · {booking.court?.name ?? '—'}
            </p>
          </div>
          {qr && <img src={qr} alt="Booking QR Code" className="h-24 w-24 shrink-0" />}
        </div>

        <div className="grid grid-cols-2 gap-x-4 border-t border-gray-100 px-4 py-3">
          <Detail label="Date" value={booking.date} />
          <Detail label="Time" value={`${booking.start_time} – ${booking.end_time}`} />
          <Detail label="Duration" value={`${hours} hr${hours !== 1 ? 's' : ''}`} />
          <Detail label="Players" value={booking.pax} />
          <Detail label="Rate" value={`${formatPrice(pricePerHour)}/hr`} />
          <Detail label="Total" value={formatPrice(total)} />
        </div>

        <p className="border-t border-gray-100 px-4 py-2 text-center text-[10px] text-gray-400">
          Present this QR at the court entrance.
        </p>
      </div>

      <div className="receipt-actions flex items-center gap-2 print:hidden">
        <Button variant="outline" onClick={handlePrint}>Print</Button>
        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  )
}