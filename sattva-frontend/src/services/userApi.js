const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};