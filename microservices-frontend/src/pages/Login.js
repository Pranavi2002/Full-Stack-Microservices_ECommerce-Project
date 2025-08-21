import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import LoginForm from "../components/LoginForm";
import "../styles.css"; // Import global CSS

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem("token", data.token); // store token
    navigate("/products"); // redirect after login
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <LoginForm onLogin={handleLogin} />
      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "#4CAF50", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;