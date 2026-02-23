const DAYS_WINDOW = 30

export function startOfToday() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export function dateDaysAgo(days) {
  const date = startOfToday()
  date.setDate(date.getDate() - days)
  return date
}

export function formatDate(date) {
  const normalized = date instanceof Date ? date : new Date(date)
  return normalized.toISOString().split('T')[0]
}

export function createdAtFromId(id) {
  const dayIndex = id % DAYS_WINDOW
  const target = dateDaysAgo(29 - dayIndex)
  return target
}

export function recentDateWindow(size = DAYS_WINDOW) {
  const days = []
  for (let i = size - 1; i >= 0; i -= 1) {
    days.push(formatDate(dateDaysAgo(i)))
  }
  return days
}
