const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

export function requestOtp(payload) {
  return requestJson("/auth/request-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function registerUser(payload) {
  return requestJson("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return requestJson("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}