import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [form, setForm] = useState({  email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit}>
        {/* <input
          name="name"
          type="text"
          placeholder="Name"
          className="auth-input"
          onChange={handleChange}
          required
        /> */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="auth-input"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-button">Register</button>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
