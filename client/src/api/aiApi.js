import { getAuthToken, clearSession, API_URL } from "./authApi";

async function aiRequest(endpoint, body) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Please log in to continue.");
  }

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "Cannot connect to the server. Check whether the backend is running."
    );
  }

  const result = await response.json().catch(() => ({}));

  if (response.status === 401) {
    clearSession();
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(result.message || "AI enhancement failed.");
  }

  return result.data;
}

export async function enhanceSummary({ text, profession }) {
  const data = await aiRequest("/ai/enhance-summary", { text, profession });
  return data.summary;
}

export async function enhanceSkills({ skills, profession }) {
  const data = await aiRequest("/ai/enhance-skills", { skills, profession });
  return data.skills;
}