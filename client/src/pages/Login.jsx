import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminCredentials, saveSession } from "../services/auth";

const emptyStudent = { studentName: "", registerNumber: "", department: "", email: "" };

export default function Login() {
  const [role, setRole] = useState("student");
  const [student, setStudent] = useState(emptyStudent);
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = event => {
    event.preventDefault();
    setError("");

    if (role === "student") {
      if (Object.values(student).some(value => !value.trim())) {
        setError("Please complete all student details.");
        return;
      }
      saveSession({ role: "student", ...student });
      navigate("/");
      return;
    }

    if (admin.email.toLowerCase() !== adminCredentials.email || admin.password !== adminCredentials.password) {
      setError("Invalid admin email or password.");
      return;
    }
    saveSession({ role: "admin", name: "Campus Administrator", email: adminCredentials.email });
    navigate("/admin");
  };

  return <main className="login-page">
    <section className="login-card">
      <span className="tag">CAMPUSCONNECT</span>
      <h1>Welcome back</h1>
      <p>Sign in to explore campus events or manage them.</p>
      <div className="role-tabs">
        <button className={role === "student" ? "active" : ""} type="button" onClick={() => { setRole("student"); setError(""); }}>Student</button>
        <button className={role === "admin" ? "active" : ""} type="button" onClick={() => { setRole("admin"); setError(""); }}>Admin</button>
      </div>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={submit}>
        {role === "student" ? <>
          <label>Full name<input value={student.studentName} onChange={event => setStudent({ ...student, studentName: event.target.value })} required /></label>
          <label>Register number<input value={student.registerNumber} onChange={event => setStudent({ ...student, registerNumber: event.target.value })} required /></label>
          <label>Department<input value={student.department} onChange={event => setStudent({ ...student, department: event.target.value })} required /></label>
          <label>Email<input type="email" value={student.email} onChange={event => setStudent({ ...student, email: event.target.value })} required /></label>
        </> : <>
          <label>Admin email<input type="email" value={admin.email} onChange={event => setAdmin({ ...admin, email: event.target.value })} required /></label>
          <label>Password<input type="password" value={admin.password} onChange={event => setAdmin({ ...admin, password: event.target.value })} required /></label>
          <p className="hint">Demo credentials: {adminCredentials.email} / {adminCredentials.password}</p>
        </>}
        <button className="button">Continue as {role === "student" ? "student" : "admin"}</button>
      </form>
    </section>
  </main>;
}
