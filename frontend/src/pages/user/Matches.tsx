import { useCallback, useEffect, useState } from 'react'
import { MatchCard } from '@/components/features/home/matches/MatchCard'
import { MatchForm } from '@/components/features/home/matches/MatchForm'
import { useAuth } from '@/lib/useAuth'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { api } from '@/lib/axios'
import { useToast } from '@/lib/toastContext'
import type { Court, MatchRequest } from '@/lib/types'
import { getErrorMessage } from '@/lib/utils'

export function MatchesPage() {
  const { user } = useAuth()
  const [courts, setCourts] = useState<Court[]>([])
  const [open, setOpen] = useState<MatchRequest[]>([])
  const [mine, setMine] = useState<MatchRequest[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

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
    try {
      await api.post<MatchRequest>('/match-requests', data)
      toast.success('Match request posted.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  async function handleJoin(id: number) {
    try {
      await api.post<MatchRequest>(`/match-requests/${id}/join`)
      toast.success('You joined the match.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  async function handleRemove(id: number) {
    try {
      await api.delete(`/match-requests/${id}`)
      toast.success('Match request removed.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return null

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