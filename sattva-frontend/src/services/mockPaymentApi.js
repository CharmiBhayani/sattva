export const createPayment = async (classId, token) => {
  const res = await fetch("http://localhost:5000/payment/create", {
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
  const res = await fetch("http://localhost:5000/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
};