import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");      
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password || !email) {
      setError("Username, Email, and Password are required");
      return;
    }
    try {
      await onRegister({ username, email, password });
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div>
      {error && <div className="message error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
