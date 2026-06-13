const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4242";

export const request = async (method, endpoint, body = null) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

    if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro");
  return data;
};