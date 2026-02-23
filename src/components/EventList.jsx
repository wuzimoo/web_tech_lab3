import EventCard from './EventCard.jsx'

function EventList({ events }) {
  if (!events.length) {
    return <p className="muted">Ще немає подій.</p>
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventList
