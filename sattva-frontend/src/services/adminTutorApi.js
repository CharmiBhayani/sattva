const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getTutorApplications = async (token) => {
  const res = await fetch(`${BASE_URL}/tutor-applications`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutor applications");
  }

  return res.json();
};