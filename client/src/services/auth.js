const SESSION_KEY = "campusconnect-session";

export const adminCredentials = {
  email: "admin@campusconnect.edu",
  password: "admin123"
};

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
