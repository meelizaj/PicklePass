import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './SectionHeading'

const faqs = [
  {
    question: 'Do I need an account to browse courts?',
    answer:
      'No. You can browse courts and see prices without an account. You only need to register when you are ready to book a slot or create a match request.',
  },
  {
    question: 'How do bookings work?',
    answer:
      'Pick a court, choose a date and time slot, and confirm instantly. The system automatically blocks overlapping slots so you will never get double-booked.',
  },
  {
    question: 'Can I cancel a booking?',
    answer:
      'Yes. Head to your profile, find the booking under "My bookings", and cancel it. Court owners can also cancel bookings on their courts if needed.',
  },
  {
    question: 'How do I find other players?',
    answer:
      'Use the "Find a Match" feature. You can post an open match request and players at your skill level can join, or you can join an existing request.',
  },
  {
    question: 'Can anyone list a court for rent?',
    answer:
      'Court owners can list their courts through the platform. If you own a court, create an account and an admin can promote you to an owner role.',
  },
  {
    question: 'Is there a fee to use PicklePass?',
    answer:
      'Joining PicklePass is 100% free. You only pay the displayed hourly rate of the court you book, which goes directly to the court owner.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Answers to the things players usually ask before their first dink."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={faq.question}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-white transition-colors',
                  isOpen ? 'border-primary-200 bg-primary-50/40' : 'border-gray-200',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={cn(
                      'h-5 w-5 shrink-0 text-primary-600 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}