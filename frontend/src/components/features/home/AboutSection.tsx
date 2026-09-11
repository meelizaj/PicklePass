import { Card } from '@/components/ui/Card'
import { SectionHeading } from './SectionHeading'

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 21s-7.5-4.5-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2 4.5-9.5 9-9.5 9Z" />
      </svg>
    ),
    title: 'Community first',
    description:
      'PicklePass is built around players and the local court owners who make the game possible. Every booking supports a real community venue.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: 'Fair & transparent',
    description:
      'Clear hourly rates, honest availability, and no hidden fees. What you see is exactly what you pay.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <circle cx="12" cy="8" r="5" />
        <path d="M4 20c.5-3.5 3.5-5.5 8-5.5s7.5 2 8 5.5" />
      </svg>
    ),
    title: 'Players at your level',
    description:
      'Set your skill level once and get matched with dinkers who play like you — no more mismatched games.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About PicklePass"
          title="Pickleball made simple"
          description="PicklePass is a community-driven pickleball platform that connects players to nearby courts and friendly games — so anyone can just show up and play."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 ring-1 ring-primary-500/20">
                {value.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}