
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const TOKEN_KEY = "resume_builder_token";
const USER_KEY = "resume_builder_user";

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Cannot connect to the server. Make sure your backend is running."
    );
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
}

function saveSession(data) {
  if (!data?.token || !data?.user) {
    throw new Error("The server returned an invalid login response.");
  }

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  window.dispatchEvent(new Event("auth:changed"));

  return data;
}

export async function registerUser(formData) {
  const result = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return saveSession(result.data);
}

export async function loginUser(formData) {
  const result = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return saveSession(result.data);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  window.dispatchEvent(new Event("auth:changed"));
}

export { API_URL };
