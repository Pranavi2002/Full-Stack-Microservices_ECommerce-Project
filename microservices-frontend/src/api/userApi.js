const BASE_URL = "http://localhost:8080/users"; 

export const registerUser = async (user) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data; // { message, username, email, token }
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");

  // Save token in localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);

  return data; // { message, username, token }
};