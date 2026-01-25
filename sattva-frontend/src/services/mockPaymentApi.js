export const createMockPayment = async (classId, token) => {
  const res = await fetch("http://localhost:5000/mock-payments/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ classId })
  });
  return res.json();
};

export const verifyMockPayment = async (intentId, status, token) => {
  const res = await fetch("http://localhost:5000/mock-payments/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ intentId, status })
  });
  return res.json();
};
