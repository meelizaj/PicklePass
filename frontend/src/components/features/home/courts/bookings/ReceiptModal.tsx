import { Modal } from '@/components/ui/Modal'
import { BookingReceipt } from './BookingReceipt'
import type { Booking } from '@/lib/types'

interface ReceiptModalProps {
  booking: Booking | null
  userName: string
  onClose: () => void
}

export function ReceiptModal({ booking, userName, onClose }: ReceiptModalProps) {
  if (!booking) return null

  return (
    <Modal open title="Booking confirmed — here's your receipt" onClose={onClose}>
      <BookingReceipt booking={booking} userName={userName} onClose={onClose} />
    </Modal>
  )
}