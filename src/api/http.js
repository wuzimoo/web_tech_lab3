const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function httpGet(path, params = {}, options = {}) {
  const url = new URL(path, BASE_URL)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value)
    }
  })

  let response
  try {
    response = await fetch(url.toString(), {
      method: 'GET',
      ...options,
    })
  } catch (error) {
    throw new Error('Network request failed')
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
