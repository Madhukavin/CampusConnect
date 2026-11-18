import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent, register } from "../services/api";
import { getSession } from "../services/auth";

const empty = { studentName: "", registerNumber: "", department: "", email: "" };

export default function EventDetails() {
  const { id } = useParams();
  const session = getSession();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState(session?.role === "student" ? { studentName: session.studentName, registerNumber: session.registerNumber, department: session.department, email: session.email } : empty);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { getEvent(id).then(response => setEvent(response.data)).catch(() => setError("Event not found.")); }, [id]);
  const submit = async input => { input.preventDefault(); setMessage(""); setError(""); try { const response = await register({ ...form, eventId: id }); setMessage(response.data.message); setEvent({ ...event, registeredCount: (event.registeredCount || 0) + 1 }); } catch (err) { setError(err.response?.data?.message || "Registration failed"); } };
  if (!event) return <main className="wrap">{error || "Loading..."}</main>;
  const full = (event.registeredCount || 0) >= event.capacity;

  return <main className="wrap narrow"><Link to="/">← All events</Link><section className="panel"><span className="tag">{event.category}</span><h1>{event.title}</h1><p>{event.description}</p><p>{new Date(event.date).toLocaleDateString()} · {event.time} · {event.venue}</p><p>Seats left: {Math.max(0, event.capacity - (event.registeredCount || 0))} of {event.capacity}</p></section><section className="panel"><h2>Student registration</h2><p>Your login details are already filled in.</p>{message && <p className="success">{message}</p>}{error && <p className="error">{error}</p>}<form className="form" onSubmit={submit}>{[["studentName", "Full name"], ["registerNumber", "Register number"], ["department", "Department"], ["email", "Email"]].map(([name, label]) => <label key={name}>{label}<input name={name} type={name === "email" ? "email" : "text"} value={form[name]} readOnly disabled={full} /></label>)}<button className="button" disabled={full}>{full ? "Event is full" : "Register for event"}</button></form></section></main>;
}
