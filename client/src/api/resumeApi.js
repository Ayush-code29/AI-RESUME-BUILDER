const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createResume = async (resumeData) => {
  const response = await fetch(`${API_URL}/resumes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resumeData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create resume");
  }

  return data;
};

export const updateResume = async (id, resumeData) => {
  const response = await fetch(`${API_URL}/resumes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resumeData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update resume");
  }

  return data;
};

export const getResume = async (id) => {
  const response = await fetch(`${API_URL}/resumes/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resume");
  }

  return data;
};

export const getAllResumes = async () => {
  const response = await fetch(`${API_URL}/resumes`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch resumes");
  }

  return data;
};

export const deleteResume = async (id) => {
  const response = await fetch(`${API_URL}/resumes/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete resume");
  }

  return data;
};