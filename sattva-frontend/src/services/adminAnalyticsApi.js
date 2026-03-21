const BASE_URL = "http://localhost:5000/admin-stats";


export const getAdminOverview = async (token) => {
  const res = await fetch(`${BASE_URL}/overview`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch admin overview");
  }

  return res.json();
};


export const getAllPayments = async (token) => {
  const res = await fetch(`${BASE_URL}/payments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }

  return res.json();
};



export const getPaymentById = async (paymentId, token) => {
  const res = await fetch(`${BASE_URL}/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch payment details");
  }

  return res.json();
};