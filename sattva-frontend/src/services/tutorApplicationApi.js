const BASE_URL = "http://localhost:5000";

export const applyTutor = async (data, token) => {
  const res = await fetch(`${BASE_URL}/tutor-applications/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};

export const getMyTutorApplication = async (token) => {
  const res = await fetch(`${BASE_URL}/tutor-applications/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch application");
  return res.json();
};
