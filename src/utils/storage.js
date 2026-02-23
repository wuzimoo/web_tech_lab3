const isBrowser = typeof window !== 'undefined'

export function readJSON(key, fallback = []) {
  if (!isBrowser) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (error) {
    console.error('Failed to parse storage value', error)
    return fallback
  }
}

export function writeJSON(key, value) {
  if (!isBrowser) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function clearKey(key) {
  if (!isBrowser) return
  window.localStorage.removeItem(key)
}
