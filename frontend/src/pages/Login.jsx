import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Signup from "./Signup";
import "../styling/Login.css";

import { FaUser, FaLock } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ closePanel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeView, setActiveView] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate("/home"); // Redirect to home on successful login
    }
  };

  return (
    <div className="wrapper">
      <div className="panel">
        {activeView === "login" && (
          <>
            <div className="panel-header">
              <h1>Login</h1>
              <span className="close-btn" onClick={closePanel}>×</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FaUser className="icon-login" />
              </div>
              <div className="input-box">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FaLock className="icon-login" />
              </div>
              <button className="submit" type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
              <div className="register-link">
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveView("signup");
                    }}
                  >
                    Signup
                  </a>
                </p>
              </div>
            </form>
          </>
        )}
        {activeView === "signup" && (
          <Signup
            closePanel={closePanel}
            switchToLogin={() => setActiveView("login")}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
