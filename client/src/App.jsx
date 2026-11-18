import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Admin from "./pages/Admin";
import EventForm from "./pages/EventForm";
import Registrations from "./pages/Registrations";
import Login from "./pages/Login";
import { clearSession, getSession } from "./services/auth";

function ProtectedRoute({ role, children }) {
  const session = getSession();
  if (!session) return <Navigate to="/login" replace />;
  if (role && session.role !== role) return <Navigate to={session.role === "admin" ? "/admin" : "/"} replace />;
  return children;
}

function Header() {
  const session = getSession();
  if (!session) return null;
  const logout = () => { clearSession(); window.location.assign("/login"); };
  return <header><Link className="brand" to={session.role === "admin" ? "/admin" : "/"}>CampusConnect</Link><nav>{session.role === "student" ? <Link to="/">Events</Link> : <Link to="/admin">Admin dashboard</Link>}<span className="user-name">{session.role === "student" ? session.studentName : "Admin"}</span><button className="linkbtn" type="button" onClick={logout}>Log out</button></nav></header>;
}

export default function App() {
  return <><Header /><Routes>
    <Route path="/login" element={getSession() ? <Navigate to={getSession().role === "admin" ? "/admin" : "/"} replace /> : <Login />} />
    <Route path="/" element={<ProtectedRoute role="student"><Home /></ProtectedRoute>} />
    <Route path="/events/:id" element={<ProtectedRoute role="student"><EventDetails /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
    <Route path="/admin/add" element={<ProtectedRoute role="admin"><EventForm /></ProtectedRoute>} />
    <Route path="/admin/edit/:id" element={<ProtectedRoute role="admin"><EventForm /></ProtectedRoute>} />
    <Route path="/admin/registrations" element={<ProtectedRoute role="admin"><Registrations /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></>;
}
