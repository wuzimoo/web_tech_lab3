const IMPORT_URL = 'https://randomuser.me/api/'

export async function fetchImportedParticipants(results = 10) {
  let response
  try {
    response = await fetch(`${IMPORT_URL}?results=${results}`)
  } catch (error) {
    throw new Error('Network request failed')
  }

  if (!response.ok) {
    throw new Error(`Import failed with status ${response.status}`)
  }

  const payload = await response.json()
  const timestamp = new Date().toISOString()
  return payload.results.map((user) => ({
    id: user.login.uuid,
    fullName: `${user.name.first} ${user.name.last}`,
    email: user.email,
    country: user.location.country,
    importedAt: timestamp,
  }))
}
