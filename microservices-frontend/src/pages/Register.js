import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";
import RegisterForm from "../components/RegisterForm";
import "../styles.css"; // Import global CSS

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (user) => {
    // user = { username, email, password }
    await registerUser(user);
    navigate("/login"); // redirect to login after successful registration
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <RegisterForm onRegister={handleRegister} />
      <p>
        Already have an account?{" "}
        <span
          style={{ color: "#4CAF50", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;