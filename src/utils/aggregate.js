import { createdAtFromId, formatDate, recentDateWindow } from './dates.js'

export function mapRegistrations(comments = []) {
  return comments.map((comment) => {
    const createdAt = createdAtFromId(comment.id)
    return {
      ...comment,
      createdAt: createdAt.toISOString(),
      date: formatDate(createdAt),
    }
  })
}

export function aggregateByDate(registrations = []) {
  const counts = registrations.reduce((acc, reg) => {
    const key = reg.date ?? formatDate(reg.createdAt)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  return recentDateWindow().map((date) => ({
    date,
    count: counts[date] || 0,
  }))
}

export function applyRange(data = [], days = 30) {
  const safeDays = Math.min(days, data.length)
  return data.slice(data.length - safeDays)
}

export function applyMinCount(data = [], minCount = 0) {
  return data.filter((item) => item.count >= minCount)
}

export function calculateStats(data = []) {
  if (!data.length) {
    return { total: 0, average: 0, maxDay: null, minDay: null }
  }

  const total = data.reduce((sum, item) => sum + item.count, 0)
  const average = total / data.length

  const maxDay = data.reduce((prev, item) =>
    !prev || item.count > prev.count ? item : prev,
  )
  const minDay = data.reduce((prev, item) =>
    !prev || item.count < prev.count ? item : prev,
  )

  return { total, average, maxDay, minDay }
}
