import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "../styling/Signup.css";
import { useNavigate } from 'react-router-dom';


// Import toast and ToastContainer from react-toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ closePanel, switchToLogin }) => {
  // Get values from your auth store in a single call
  const { authUser, signup, isRegistering } = useAuthStore();
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) { toast.error("Fullname is required"); return false;}
    if (!formData.email.trim()) { toast.error("Email is required"); return false;}
    if (!/\S+@\S+\.\S+/.test(formData.email))  {toast.error("Invalid email address"); return false;}
    if (!formData.password)  {toast.error("Password is required"); return false;}
    if (formData.password.length < 6)  {toast.error("Password must be at least 6 characters"); return false;}
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      await signup(formData);
      navigate("/home");
    }
  };

  return (
    <div className="wrapper-2">
      <div className="panel-2">
        <div className="panel-header-2">
          <h1>Register</h1>
          <span className="close-btn" onClick={closePanel}>×</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="fullName"
              maxLength={25}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <FaUser className="reg-icon" />
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={formData.email}
              maxLength={40}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <FaEnvelope className="reg-icon" />
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              minLength={6}
              maxLength={20}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <FaLock className="reg-icon" />
          <button type="submit" className="register-button" disabled={isRegistering}>
            {isRegistering ? "Registering..." : "Register"}
          </button>
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  switchToLogin();
                }}
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
