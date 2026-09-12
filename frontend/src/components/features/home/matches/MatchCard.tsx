import type { MatchRequest, SkillLevel } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface MatchCardProps {
  matchRequest: MatchRequest
  isMine: boolean
  onJoin?: (id: number) => void
  onRemove?: (id: number) => void
}

const levelColors: Record<SkillLevel, 'green' | 'yellow' | 'red'> = {
  novice: 'green',
  intermediate: 'yellow',
  advanced: 'red',
}

export function MatchCard({ matchRequest, isMine, onJoin, onRemove }: MatchCardProps) {
  const requester = matchRequest.user?.name ?? 'Player'

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-gray-900">{requester}</p>
          <p className="text-sm text-gray-500">
            {matchRequest.date ?? 'Any day'} at {matchRequest.time ?? 'flexible'}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={levelColors[matchRequest.skill_level]}>{matchRequest.skill_level}</Badge>
          <Badge variant={matchRequest.status === 'open' ? 'green' : 'blue'} className="capitalize">
            {matchRequest.status}
          </Badge>
        </div>
      </div>

      {matchRequest.court?.name && (
        <p className="mt-2 text-sm text-gray-500">Court: {matchRequest.court.name}</p>
      )}

      {matchRequest.notes && <p className="mt-2 text-sm text-gray-600">“{matchRequest.notes}”</p>}

      {matchRequest.status === 'matched' && matchRequest.opponent && (
        <p className="mt-2 text-sm font-medium text-primary-700">
          You have a match with {matchRequest.opponent.name}
        </p>
      )}

      <div className="mt-4 flex justify-end gap-2">
        {isMine && onRemove && (
          <Button size="sm" variant="danger" onClick={() => onRemove(matchRequest.id)}>
            Remove
          </Button>
        )}
        {!isMine && matchRequest.status === 'open' && onJoin && (
          <Button size="sm" onClick={() => onJoin(matchRequest.id)}>
            Join match
          </Button>
        )}
      </div>
    </div>
  )
}