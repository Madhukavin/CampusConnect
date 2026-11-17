import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";

const categories = ["All", "Technical", "Cultural", "Sports", "Workshop", "Other"];
export default function Home() {
  const [events, setEvents] = useState([]), [search, setSearch] = useState(""), [category, setCategory] = useState("All"), [error, setError] = useState("");
  useEffect(() => { getEvents().then(response => setEvents(response.data)).catch(() => setError("Cannot connect to server.")); }, []);
  const filtered = events.filter(event => (category === "All" || event.category === category) && `${event.title} ${event.category} ${event.description}`.toLowerCase().includes(search.toLowerCase()));
  return <main className="wrap">
    <section className="hero"><small>YOUR CAMPUS. YOUR COMMUNITY.</small><h1>Discover what's happening on campus.</h1><p>Find events, meet people and make your college experience memorable.</p></section>
    <div className="heading"><div><h2>Upcoming events</h2><p>Explore and register for campus activities.</p></div><div className="filters"><input className="search" placeholder="Search events..." value={search} onChange={event => setSearch(event.target.value)} /><select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></div></div>
    {error && <p className="error">{error}</p>}<div className="grid">{filtered.map(event => <EventCard key={event._id} event={event} />)}</div>
    {!filtered.length && !error && <p>No events match your search.</p>}
  </main>;
}
