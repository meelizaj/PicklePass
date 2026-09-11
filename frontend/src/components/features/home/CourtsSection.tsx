import { useEffect, useState } from 'react'
import { CourtCard } from '@/components/features/courts/CourtCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { api } from '@/lib/api'
import type { Court } from '@/lib/types'
import { SectionHeading } from './SectionHeading'

export function CourtsSection() {
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<Court[]>('/courts')
      .then((res) => setCourts(res.data))
      .catch(() => setCourts([]))
      .finally(() => setLoading(false))
  }, [])

  const featured = courts.slice(0, 6)

  return (
    <section id="courts" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse courts"
          title="Available courts"
          description="Browse pickleball courts near your area, check hourly rates, and book a slot in seconds."
        />

        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : featured.length === 0 ? (
            <EmptyState title="No courts available" className="mt-6" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          )}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          {!loading && courts.length > 6 && (
            <span className="font-medium text-primary-600">{courts.length - 6} more courts available after you log in.</span>
          )}
        </p>
      </div>
    </section>
  )
}