import { useCallback, useEffect, useState } from 'react'
import { MatchCard } from '@/components/features/matches/MatchCard'
import { MatchForm } from '@/components/features/matches/MatchForm'
import { useAuth } from '@/components/common/useAuth'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Spinner } from '@/components/ui/Spinner'
import { api } from '@/lib/api'
import type { Court, MatchRequest } from '@/lib/types'

export function MatchesPage() {
  const { user } = useAuth()
  const [courts, setCourts] = useState<Court[]>([])
  const [open, setOpen] = useState<MatchRequest[]>([])
  const [mine, setMine] = useState<MatchRequest[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    Promise.allSettled([
      api.get<Court[]>('/courts').then((res) => setCourts(res.data)),
      api.get<MatchRequest[]>('/match-requests').then((res) => setOpen(res.data)),
      api.get<MatchRequest[]>('/match-requests/mine').then((res) => setMine(res.data)),
    ]).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleCreate(data: {
    skill_level: string
    court_id: number | null
    date: string | null
    time: string | null
    notes: string | null
  }) {
    await api.post<MatchRequest>('/match-requests', data)
    load()
  }

  async function handleJoin(id: number) {
    await api.post<MatchRequest>(`/match-requests/${id}/join`)
    load()
  }

  async function handleRemove(id: number) {
    await api.delete(`/match-requests/${id}`)
    load()
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Find a match</h1>
      <p className="mt-1 text-gray-500">Post what you are looking for and join other players.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card className="h-fit">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Post a match request</h2>
            </CardHeader>
            <CardContent>
              <MatchForm courts={courts} onSubmit={handleCreate} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 lg:col-span-3">
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Open requests</h2>
            {open.length === 0 ? (
              <EmptyState title="No open requests" description="Be the first to post one!" />
            ) : (
              <div className="space-y-4">
                {open.map((request) => (
                  <MatchCard
                    key={request.id}
                    matchRequest={request}
                    isMine={request.user_id === user?.id}
                    onJoin={handleJoin}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">My requests</h2>
            {mine.length === 0 ? (
              <EmptyState title="You have no requests" description="Post one above." />
            ) : (
              <div className="space-y-4">
                {mine.map((request) => (
                  <MatchCard
                    key={request.id}
                    matchRequest={request}
                    isMine={true}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}