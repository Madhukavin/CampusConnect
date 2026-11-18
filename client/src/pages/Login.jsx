import { useState } from "react";
import "../login.css";
import { useNavigate } from "react-router-dom";
import { signInStudent, signUpStudent } from "../services/api";
import { adminCredentials, saveSession } from "../services/auth";

const emptyStudent = { studentName: "", registerNumber: "", department: "", email: "", password: "" };

function PasswordField({ value, onChange, visible, toggle }) {
  return <label>Password<div className="password-field"><input type={visible ? "text" : "password"} value={value} onChange={onChange} minLength="6" required /><button type="button" onClick={toggle}>{visible ? "Hide" : "Show"}</button></div></label>;
}

export default function Login() {
  const [role, setRole] = useState("student");
  const [studentMode, setStudentMode] = useState("signin");
  const [student, setStudent] = useState(emptyStudent);
  const [credentials, setCredentials] = useState({ registerNumber: "", password: "" });
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const switchRole = nextRole => { setRole(nextRole); setError(""); setShowPassword(false); };
  const switchStudentMode = nextMode => { setStudentMode(nextMode); setError(""); setShowPassword(false); };
  const completeStudentLogin = studentData => { saveSession({ role: "student", ...studentData }); navigate("/"); };

  const submit = async event => {
    event.preventDefault();
    setError("");
    if (role === "admin") {
      if (admin.email.toLowerCase() !== adminCredentials.email || admin.password !== adminCredentials.password) return setError("Invalid admin email or password.");
      saveSession({ role: "admin", name: "Campus Administrator", email: adminCredentials.email });
      navigate("/admin");
      return;
    }

    setBusy(true);
    try {
      const response = studentMode === "signup" ? await signUpStudent(student) : await signInStudent(credentials);
      completeStudentLogin(response.data.student);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to complete the request. Check that the server is running.");
    } finally {
      setBusy(false);
    }
  };

  return <main className="login-page"><section className="login-card"><span className="tag">CAMPUSCONNECT</span><h1>Welcome back</h1><p>Sign in to explore campus events or manage them.</p><div className="role-tabs"><button className={role === "student" ? "active" : ""} type="button" onClick={() => switchRole("student")}>Student</button><button className={role === "admin" ? "active" : ""} type="button" onClick={() => switchRole("admin")}>Admin</button></div>{role === "student" && <div className="mode-links"><button className={studentMode === "signin" ? "active" : ""} type="button" onClick={() => switchStudentMode("signin")}>Sign in</button><button className={studentMode === "signup" ? "active" : ""} type="button" onClick={() => switchStudentMode("signup")}>Sign up</button></div>}{error && <p className="error">{error}</p>}<form className="form" onSubmit={submit}>{role === "student" && studentMode === "signin" && <><label>Username (Register number)<input value={credentials.registerNumber} onChange={event => setCredentials({ ...credentials, registerNumber: event.target.value })} required /></label><PasswordField value={credentials.password} onChange={event => setCredentials({ ...credentials, password: event.target.value })} visible={showPassword} toggle={() => setShowPassword(!showPassword)} /></>}{role === "student" && studentMode === "signup" && <><label>Full name<input value={student.studentName} onChange={event => setStudent({ ...student, studentName: event.target.value })} required /></label><label>Register number<input value={student.registerNumber} onChange={event => setStudent({ ...student, registerNumber: event.target.value })} required /></label><label>Department<input value={student.department} onChange={event => setStudent({ ...student, department: event.target.value })} required /></label><label>Email<input type="email" value={student.email} onChange={event => setStudent({ ...student, email: event.target.value })} required /></label><PasswordField value={student.password} onChange={event => setStudent({ ...student, password: event.target.value })} visible={showPassword} toggle={() => setShowPassword(!showPassword)} /></>}{role === "admin" && <><label>Admin email<input type="email" value={admin.email} onChange={event => setAdmin({ ...admin, email: event.target.value })} required /></label><PasswordField value={admin.password} onChange={event => setAdmin({ ...admin, password: event.target.value })} visible={showPassword} toggle={() => setShowPassword(!showPassword)} /><p className="hint">Demo credentials: {adminCredentials.email} / {adminCredentials.password}</p></>}<button className="button" disabled={busy}>{busy ? "Please wait..." : role === "student" && studentMode === "signup" ? "Create student account" : "Sign in"}</button></form></section></main>;
}
