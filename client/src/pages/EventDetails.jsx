import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent, register } from "../services/api";
const blank = { studentName: "", registerNumber: "", department: "", email: "" };

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null), [form, setForm] = useState(blank), [msg, setMsg] = useState(""), [error, setError] = useState("");
  useEffect(() => { getEvent(id).then(response => setEvent(response.data)).catch(() => setError("Event not found.")); }, [id]);
  const change = input => setForm({ ...form, [input.target.name]: input.target.value });
  const submit = async input => { input.preventDefault(); setMsg(""); setError(""); try { const response = await register({ ...form, eventId: id }); setMsg(response.data.message); setForm(blank); setEvent({ ...event, registeredCount: (event.registeredCount || 0) + 1 }); } catch (err) { setError(err.response?.data?.message || "Registration failed"); } };
  if (!event) return <main className="wrap">{error || "Loading..."}</main>;
  const full = (event.registeredCount || 0) >= event.capacity;
  return <main className="wrap narrow">
    <Link to="/">← All events</Link>
    <section className="panel"><span className="tag">{event.category}</span><h1>{event.title}</h1><p>{event.description}</p><p>{new Date(event.date).toLocaleDateString()} · {event.time} · {event.venue}</p><p>Seats left: {Math.max(0, event.capacity - (event.registeredCount || 0))} of {event.capacity}</p></section>
    <section className="panel"><h2>Student registration</h2>{msg && <p className="success">{msg}</p>}{error && <p className="error">{error}</p>}<form className="form" onSubmit={submit}>{[["studentName", "Full name"], ["registerNumber", "Register number"], ["department", "Department"], ["email", "Email"]].map(([name, label]) => <label key={name}>{label}<input name={name} type={name === "email" ? "email" : "text"} value={form[name]} onChange={change} required disabled={full} /></label>)}<button className="button" disabled={full}>{full ? "Event is full" : "Register for event"}</button></form></section>
  </main>;
}
