import { httpGet } from './http.js'

export function fetchEvents(page = 1, limit = 10) {
  return httpGet('/posts', { _page: page, _limit: limit })
}
