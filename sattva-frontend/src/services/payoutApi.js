const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/payment/payout`;

export const getTutorWallet = async (token) => {
  const response = await fetch(`${API_URL}/tutor/wallet`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch tutor wallet");
  }

  return response.json();
};

export const getTutorPayoutHistory = async (token) => {
  const response = await fetch(`${API_URL}/tutor/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch payout history");
  }

  return response.json();
};

export const getAllTutorWallets = async (token) => {
  const response = await fetch(`${API_URL}/admin/wallets`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch all tutor wallets");
  }

  return response.json();
};

export const processTutorPayout = async (token, tutorId, amount) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ tutorId, amount })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to process payout");
  }

  return response.json();
};