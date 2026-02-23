import { httpGet } from './http.js'

export function fetchParticipants(eventId) {
  return httpGet('/comments', { postId: eventId })
}
