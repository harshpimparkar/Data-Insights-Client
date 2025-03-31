import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios.utils.js";
import { useAuth } from "../../context/UseAuth.jsx";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password || !name) {
      setLoading(false);
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", {
        email,
        password,
        name,
      });

      console.log("Signup successful:", res.data);

      // The JWT is set as a cookie by the backend
      // Store user info if needed
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Navigate only on success
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      // Handle errors properly
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Signup failed");
      } else {
        setError("Unable to connect to the server");
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Sign-Up</h2>
      <div className="input-fields">
        {error && <div className="error-message">{error}</div>}
        <div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
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
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </div>
      <div>
        <p className="account-text">
          Already have an account?{" "}
          <a href="/login" className="register-link">
            Jump back in...
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
