import { httpGet } from './http.js'
import { mapRegistrations } from '../utils/aggregate.js'

export async function fetchRegistrations() {
  const comments = await httpGet('/comments')
  return mapRegistrations(comments)
}
