const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ADMIN ONLY */
export const createPose = async (poseData, token) => {
  const res = await fetch(`${BASE_URL}/admin/poses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(poseData),
  });

  if (!res.ok) throw new Error("Failed to create pose");
  return res.json();
};

/* VIEW – allowed for BOTH admin & user */
export const getAllPosesAdmin = async () => {
  const res = await fetch(`${BASE_URL}/poses`);

  if (!res.ok) throw new Error("Failed to fetch poses");
  return res.json();
};

/* ADMIN ONLY */
export const deletePose = async (poseId, token) => {
  const res = await fetch(`${BASE_URL}/admin/poses/${poseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete pose");
  return res.json();
};