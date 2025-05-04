import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="auth-button">Login</button>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-link">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
