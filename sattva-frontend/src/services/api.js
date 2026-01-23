const API_URL = "http://localhost:5000";

export const getAllPoses = async () => {
  const res = await fetch(`${API_URL}/poses`);
  return res.json();
};

const BASE_URL = "http://localhost:5000";

export const createSession = async (sessionData, token) => {
  const response = await fetch(`${BASE_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(sessionData)
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }

  return response.json();
};

export const getAllSessions = async (token) => {
  const response = await fetch(`${BASE_URL}/session`,{headers:{Authorization: `Bearer ${token}`}});
  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }
  return response.json();
};
