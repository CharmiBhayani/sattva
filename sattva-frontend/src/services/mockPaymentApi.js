const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const createPayment = async (classId, token) => {
  const res = await fetch(`${BASE_URL}/payment/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ classId })
  });

  return res.json();
};

export const verifyPayment = async (data, token) => {
  const res = await fetch(`${BASE_URL}/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
};