import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { fetchParticipants } from '../api/participantsApi.js'
import { setDocumentTitle } from '../utils/title.js'

function Participants() {
  const { eventId } = useParams()
  const [participants, setParticipants] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    setDocumentTitle(`Participants #${eventId}`)
  }, [eventId])

  useEffect(() => {
    let cancelled = false

    async function loadParticipants() {
      setStatus('loading')
      setError('')
      try {
        const data = await fetchParticipants(eventId)
        if (cancelled) return
        setParticipants(data)
        setStatus('success')
      } catch (err) {
        if (cancelled) return
        setError(err.message)
        setStatus('error')
      }
    }

    loadParticipants()

    return () => {
      cancelled = true
    }
  }, [eventId, reloadKey])

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h1>Participants</h1>
          <p className="muted">Подія #{eventId}</p>
        </div>
        <Link className="btn btn-ghost" to="/">
          ← Back to events
        </Link>
      </div>

      {status === 'loading' ? <Loader label="Loading participants" /> : null}

      {status === 'error' ? (
        <ErrorState
          message={error}
          onRetry={() => {
            setStatus('loading')
            setReloadKey((key) => key + 1)
          }}
        />
      ) : null}

      {status === 'success' ? (
        <ul className="participants-list">
          {participants.map((participant) => (
            <li key={participant.id} className="participant-card">
              <h3>{participant.name}</h3>
              <p className="muted">{participant.email}</p>
              <p>{participant.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default Participants
