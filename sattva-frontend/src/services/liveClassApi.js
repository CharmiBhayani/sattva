const BASE_URL = "http://localhost:5000";

export const createLiveClass = async (data, token) => {
  const res = await fetch(`${BASE_URL}/live-classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};

export const getMyLiveClasses = async (token) => {
  const res = await fetch(`${BASE_URL}/live-classes/mine`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch classes");
  return res.json();
};

export const getUpcomingLiveClasses = async () => {
  const res = await fetch(`${BASE_URL}/live-classes/upcoming`);

  if (!res.ok) {
    throw new Error("Failed to fetch live classes");
  }

  return res.json();
};