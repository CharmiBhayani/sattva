const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function parseResponse(res) {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  }

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("API endpoint not found. Please ensure the backend is running and up-to-date.");
    }
    throw new Error(`Server returned an error (${res.status}). Please check backend status.`);
  }

  return {};
}

export async function signup(userData) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return parseResponse(res);
}

export async function login(userData) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return parseResponse(res);
}

export const verifyEmail = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
};

export const resendOTP = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
};

export const forgotPassword = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
};

export const resetPassword = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse(res);
};