const BASE_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/admin`;

export const getAllTutors = async (token) => {
  const res = await fetch(`${BASE_URL}/tutors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  return res.json();
};

export const degradeTutor = async (userId, token) => {
  const res = await fetch(
    `${BASE_URL}/users/${userId}/degrade`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to degrade tutor");
  }

  return res.json();
};