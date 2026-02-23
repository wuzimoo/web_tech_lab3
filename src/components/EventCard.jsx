import { Link } from 'react-router-dom'

function EventCard({ event }) {
  return (
    <article className="event-card">
      <p className="event-id">ID: {event.id}</p>
      <h3>{event.title}</h3>
      <p className="event-body">{event.body}</p>
      <div className="event-card-actions">
        <Link className="btn" to={`/participants/${event.id}`}>
          View participants
        </Link>
      </div>
    </article>
  )
}

export default EventCard
