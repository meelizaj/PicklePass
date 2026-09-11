import { Card } from '@/components/ui/Card'
import { SectionHeading } from './SectionHeading'

const features = [
  {
    title: 'Instant booking',
    description: 'Reserve a court in seconds with a calendar that always reflects real availability.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Find a Match',
    description: 'Post an open match request and join other players who match your skill level.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="9" cy="8" r="3.5" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M15 17.5c0-2 1.5-3.5 3.5-3.5s2.5 1.5 2.5 3.5" />
      </svg>
    ),
  },
  {
    title: 'Smart scheduling',
    description: 'Overlapping slots are blocked automatically, so double bookings never happen.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 3l7 4v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7l7-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Owner tools',
    description: 'Court owners can list, update, and manage their courts and bookings from one dashboard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="4" y="3" width="16" height="18" rx="3" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Player profiles',
    description: 'Build a pickleball identity with your name, phone, and skill level.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c.5-4 3.5-6 8-6s7.5 2 8 6" />
      </svg>
    ),
  },
  {
    title: 'Transparent pricing',
    description: 'Every court shows its true hourly rate upfront — no hidden charges.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 9.5h4a2 2 0 1 0 0-4H9v9h4a2 2 0 1 0 0-4" />
      </svg>
    ),
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything to keep you playing"
          description="A full toolkit for players and court owners alike."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="p-7 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-500/20">
                {feature.icon}
              </div>
              <h3 className="mt-5 font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}