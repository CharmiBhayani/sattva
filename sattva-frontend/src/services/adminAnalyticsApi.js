const BASE_URL = "http://localhost:5000/admin-stats";

export const getAdminStats = async (token) => {
  const res = await fetch(`${BASE_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

if (!res.ok) {
    throw new Error("Failed to fetch admin stats");
  }

  return res.json();
};
