import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios.utils.js";
import { useAuth } from "../../context/UseAuth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setLoading(false);
      setError("Please fill in both fields");
      return;
    }

    try {
      console.log("Attempting login to:", axiosInstance.defaults.baseURL);
      
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", res.data);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      } else {
        // Handle unusual case where backend returns success but no user
        setError("Login successful but user data is missing");
      }
    } catch (error) {
      console.error("Login error:", error);

      // More detailed error handling
      if (error.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to server. Please check your internet connection or try again later."
        );
      } else if (error.response) {
        // Handle specific HTTP status codes
        switch (error.response.status) {
          case 401:
            setError("Invalid email or password");
            break;
          case 404:
            setError("Server endpoint not found. Please contact support.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(error.response.data.message || "Login failed");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Login</h2>
      <div className="input-fields">
        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <div>
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      <div>
        <p className="account-text">
          Don't have an account?{" "}
          <a href="/signup" className="register-link">
            Register yourself...
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;