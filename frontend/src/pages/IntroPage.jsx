import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styling/IntroPage.css";
import Login from "./Login";

function IntroPage() {
  const { authUser, checkAuth } = useAuthStore();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    checkAuth();
  }, [checkAuth]); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMenuItem(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

  const openPanel = () => {
    if (authUser) {
      navigate("/home"); // Redirect to /home if user is already authenticated
    } else {
      setIsPanelOpen(true); // Otherwise, open login panel
    }
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="language-switcher">
          <span className="globe-icon">🌐</span>
          <select className="language-select">
            <option value="en">English</option>
          </select>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="main-content">
        <div className="logo">かたひら</div>
        <h1 className="heading">Kata-Hira</h1>
        <div className="quote">The initiative to grow in Japanese</div>
        <button className="cssbuttons-io-button" onClick={openPanel}>
          Get started
          <div className="icon">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className={`side-menu`} ref={menuRef}>
          <div className="menu-header">
            <span className="menu-title">Menu</span>
            <span className="menu-close" onClick={closeMenu}>×</span>
          </div>
          <div className="menu-item" onClick={() => handleMenuItemClick("credits")}>
            Credits
          </div>
          {activeMenuItem === "credits" && <p className="menu-content">Thanks to everyone who contributed!</p>}
          <div className="menu-item" onClick={() => handleMenuItemClick("contact")}>
            Contact
          </div>
          {activeMenuItem === "contact" && <p className="menu-content">Contact us at example@mail.com</p>}
          <div className="menu-item" onClick={() => handleMenuItemClick("terms")}>
            Terms and Conditions
          </div>
          {activeMenuItem === "terms" && <p className="menu-content">Terms and conditions apply.</p>}
        </div>
      )}

      {isPanelOpen && <Login closePanel={closePanel} />}
    </div>
  );
}

export default IntroPage;
