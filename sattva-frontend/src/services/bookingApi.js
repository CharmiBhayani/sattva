const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const bookLiveClass = async (classId, token) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ classId })
  });

  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Server error. Booking route not found.");
  }

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getMyBookings = async (token) => {
  const res = await fetch(`${BASE_URL}/bookings/mine`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  return res.json();
};

export const getTutorEnrollments = async (token) => {
  const res = await fetch(`${BASE_URL}/bookings/tutor`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  return res.json();
};