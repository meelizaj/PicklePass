import { useCallback, useEffect, useState } from 'react'
import { CourtForm, type CourtFormValues } from '@/components/features/home/courts/CourtForm'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { api } from '@/lib/axios'
import { useToast } from '@/lib/toastContext'
import type { Court } from '@/lib/types'
import { formatPrice, getErrorMessage } from '@/lib/utils'

export function OwnerCourtsPage() {
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCourt, setEditingCourt] = useState<Court | null>(null)
  const toast = useToast()

  const load = useCallback(() => {
    api
      .get<Court[]>('/courts/owner/mine')
      .then((res) => setCourts(res.data))
      .catch(() => setCourts([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(load, [load])

  async function handleSubmit(values: CourtFormValues) {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('address', values.address)
    formData.append('description', values.description)
    formData.append('price_per_hour', String(values.price_per_hour))
    formData.append('open_time', values.open_time)
    formData.append('close_time', values.close_time)
    if (values.image) formData.append('image', values.image)

    if (editingCourt) {
      await api.put(`/courts/${editingCourt.id}`, formData)
      toast.success('Court updated.')
    } else {
      await api.post('/courts', formData)
      toast.success('Court created.')
    }
    setModalOpen(false)
    setEditingCourt(null)
    load()
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/courts/${id}`)
      toast.success('Court deleted.')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  function openEdit(court: Court) {
    setEditingCourt(court)
    setModalOpen(true)
  }

  function openCreate() {
    setEditingCourt(null)
    setModalOpen(true)
  }

  if (loading) return null

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My courts</h1>
          <p className="mt-1 text-gray-500">Manage your pickleball courts.</p>
        </div>
        <Button onClick={openCreate}>Add court</Button>
      </div>

      {courts.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No courts yet"
            description='Click "Add court" to create your first court.'
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courts.map((court) => (
            <div
              key={court.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="aspect-[16/9] w-full rounded-lg bg-gradient-to-br from-primary-100 to-primary-200">
                {court.image_url ? (
                  <img src={court.image_url} alt={court.name} className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl">🏓</div>
                )}
              </div>
              <h3 className="mt-3 font-semibold text-gray-900">{court.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{court.address}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-bold text-primary-600">
                  {formatPrice(court.price_per_hour)}/hr
                </p>
                {typeof court.bookings_count === 'number' && (
                  <Badge variant="blue">{court.bookings_count} bookings</Badge>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Open {court.open_time ?? '06:00'} – {court.close_time ?? '21:00'}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{court.description}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => openEdit(court)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(court.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editingCourt ? 'Edit court' : 'Add new court'}
        onClose={() => {
          setModalOpen(false)
          setEditingCourt(null)
        }}
      >
        <CourtForm
          key={editingCourt?.id ?? 'new'}
          currentImage={editingCourt?.image_url}
          initial={
            editingCourt
              ? {
                  name: editingCourt.name,
                  address: editingCourt.address,
                  description: editingCourt.description,
                  price_per_hour: Number(editingCourt.price_per_hour),
                  image: null,
                  open_time: editingCourt.open_time ?? '06:00',
                  close_time: editingCourt.close_time ?? '21:00',
                }
              : undefined
          }
          submitLabel={editingCourt ? 'Save changes' : 'Create court'}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false)
            setEditingCourt(null)
          }}
        />
      </Modal>
    </div>
  )
}