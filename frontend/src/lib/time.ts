export function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + (m || 0)
}

export function toTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function addMinutes(time: string, minutes: number): string {
  return toTime(parseTime(time) + minutes)
}

export function timeSlotsBetween(openTime: string, closeTime: string, stepMinutes = 60): string[] {
  const start = parseTime(openTime)
  const end = parseTime(closeTime)
  const slots: string[] = []
  for (let t = start; t < end; t += stepMinutes) {
    slots.push(toTime(t))
  }
  return slots
}

export function timeBoundaries(openTime: string, closeTime: string, stepMinutes = 60): string[] {
  const start = parseTime(openTime)
  const end = parseTime(closeTime)
  const slots: string[] = []
  for (let t = start; t <= end; t += stepMinutes) {
    slots.push(toTime(t))
  }
  return slots
}

export function format12H(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''}${period}`
}