
import { getAuthToken, clearSession, API_URL } from "./authApi";

function toResumePayload(resume) {
  return {
    title: resume.title,
    personal_info: resume.personal_info,
    professional_summary: resume.professional_summary,
    experience: resume.experience,
    education: resume.education,
    project: resume.project,
    skills: resume.skills,
    template: resume.template,
    accent_color: resume.accent_color,
    public: resume.public,
  };
}

async function resumeRequest(endpoint, options = {}) {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Please log in to continue.");
  }

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
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
    throw new Error(result.message || "Resume request failed.");
  }

  return result;
}

export async function createResume(resumeData) {
  const result = await resumeRequest("/resumes", {
    method: "POST",
    body: JSON.stringify(toResumePayload(resumeData)),
  });

  return result.data;
}

export async function updateResume(id, resumeData) {
  const result = await resumeRequest(
    `/resumes/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(toResumePayload(resumeData)),
    }
  );

  return result.data;
}

export async function getResume(id) {
  const result = await resumeRequest(
    `/resumes/${encodeURIComponent(id)}`
  );

  return result.data;
}

export async function getAllResumes() {
  const result = await resumeRequest("/resumes");

  return Array.isArray(result.data) ? result.data : [];
}

export async function deleteResume(id) {
  const result = await resumeRequest(
    `/resumes/${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );

  return result.data;
}
