import { SectionHeading } from './SectionHeading'

const steps = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Sign up in under a minute and set your skill level so the right games find you.',
  },
  {
    number: '02',
    title: 'Find a court',
    description: 'Browse available pickleball courts nearby with live pricing and photos.',
  },
  {
    number: '03',
    title: 'Book your slot',
    description: 'Pick a date and time. Double bookings are prevented automatically.',
  },
  {
    number: '04',
    title: 'Play & connect',
    description: 'Show up, play, and use Find a Match to meet other players at your level.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Ready in four simple steps"
          description="From signing up to your first dink in no time."
        />

        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute top-7 left-14 right-0 hidden h-px bg-gradient-to-r from-primary-200 to-transparent lg:block" />
              )}
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-lg font-extrabold text-white shadow-sm">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}