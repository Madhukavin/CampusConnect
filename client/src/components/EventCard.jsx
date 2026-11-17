import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const remaining = Math.max(0, event.capacity - (event.registeredCount || 0));
  return <article className="card">
    <span className="tag">{event.category}</span><h3>{event.title}</h3><p>{event.description}</p>
    <p><b>Date:</b> {new Date(event.date).toLocaleDateString()} · {event.time}</p><p><b>Venue:</b> {event.venue}</p>
    <p><b>Seats left:</b> {remaining} of {event.capacity}</p>
    <Link className="button" to={`/events/${event._id}`}>View & register</Link>
  </article>;
}
