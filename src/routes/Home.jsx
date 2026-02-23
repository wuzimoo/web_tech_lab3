import { useEffect, useRef, useState } from 'react'
import EventList from '../components/EventList.jsx'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { fetchEvents } from '../api/eventsApi.js'
import { setDocumentTitle } from '../utils/title.js'

const PAGE_LIMIT = 10

function Home() {
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [reloadKey, setReloadKey] = useState(0)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)

  useEffect(() => {
    setDocumentTitle('Home')
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function loadEvents() {
      setStatus('loading')
      setError('')
      try {
        const nextEvents = await fetchEvents(page, PAGE_LIMIT)
        if (isCancelled) return
        setEvents((prev) => {
          const seen = new Set(prev.map((item) => item.id))
          const merged = [...prev]
          nextEvents.forEach((event) => {
            if (!seen.has(event.id)) {
              merged.push(event)
            }
          })
          return merged
        })
        setHasMore(nextEvents.length === PAGE_LIMIT)
        setStatus('idle')
      } catch (err) {
        if (isCancelled) return
        setError(err.message)
        setStatus('error')
      }
    }

    loadEvents()

    return () => {
      isCancelled = true
    }
  }, [page, reloadKey])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && status === 'idle' && hasMore) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [status, hasMore, events.length])

  const handleRetry = () => {
    setStatus('loading')
    setReloadKey((key) => key + 1)
  }

  const isInitialLoading = status === 'loading' && events.length === 0
  const isLoadingMore = status === 'loading' && events.length > 0

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h1>Events feed</h1>
          <p className="muted">Інфінітний скрол з JSONPlaceholder</p>
        </div>
      </div>

      {isInitialLoading ? <Loader label="Loading events" /> : null}

      {!isInitialLoading && error && events.length === 0 ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : (
        <>
          <EventList events={events} />
          {error && events.length > 0 ? (
            <ErrorState message={error} onRetry={handleRetry} />
          ) : null}
          {hasMore ? (
            <div ref={sentinelRef} className="sentinel" aria-hidden="true" />
          ) : (
            <p className="muted center">Більше подій немає.</p>
          )}
          {isLoadingMore ? <Loader label="Loading more" /> : null}
        </>
      )}
    </section>
  )
}

export default Home
