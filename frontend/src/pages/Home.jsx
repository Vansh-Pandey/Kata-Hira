import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import "../styling/Home.css";
import Profile from "./Profile";
import { ToastContainer, toast } from "react-toastify";
import Leaderboard from "./Leaderboard";

const Home = () => {
  const { authUser, logout } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("You have been logged out.", {
      position: "top-right",
      autoClose: 200,
    });
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="game-home-container">
      {authUser && (
        <div className="profile-icon-container" onClick={() => setShowProfile(true)}>
          <FaUserCircle className="profile-icon" />
        </div>
      )}

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}

      <header className="game-header">
        <div className="game-logo">かたひら</div>
        <h1 className="game-title">Kata-Hira</h1>
        <p className="game-subtitle">Master Japanese, One Quiz at a Time</p>
      </header>
      {/* Japanese Letters Roaming */}
      <div className="japanese-letter1" style={{ top: "5%", left: "5%" }}>
        あ
      </div>
      <div className="japanese-letter1" style={{ top: "10%", left: "15%" }}>
        い
      </div>
      <div className="japanese-letter1" style={{ top: "15%", left: "25%" }}>
        う
      </div>
      <div className="japanese-letter1" style={{ top: "20%", left: "35%" }}>
        え
      </div>
      <div className="japanese-letter1" style={{ top: "25%", left: "45%" }}>
        お
      </div>
      <div className="japanese-letter1" style={{ top: "30%", left: "55%" }}>
        か
      </div>
      <div className="japanese-letter1" style={{ top: "35%", left: "65%" }}>
        き
      </div>
      <div className="japanese-letter1" style={{ top: "40%", left: "75%" }}>
        く
      </div>
      <div className="japanese-letter1" style={{ top: "45%", left: "85%" }}>
        け
      </div>
      <div className="japanese-letter1" style={{ top: "50%", left: "10%" }}>
        こ
      </div>
      <div className="japanese-letter1" style={{ top: "55%", left: "20%" }}>
        さ
      </div>
      <div className="japanese-letter1" style={{ top: "60%", left: "30%" }}>
        し
      </div>
      <div className="japanese-letter1" style={{ top: "65%", left: "40%" }}>
        す
      </div>
      <div className="japanese-letter1" style={{ top: "70%", left: "50%" }}>
        せ
      </div>
      <div className="japanese-letter1" style={{ top: "75%", left: "60%" }}>
        そ
      </div>
      <div className="japanese-letter1" style={{ top: "80%", left: "70%" }}>
        た
      </div>
      <div className="japanese-letter1" style={{ top: "85%", left: "80%" }}>
        ち
      </div>
      <div className="japanese-letter1" style={{ top: "90%", left: "90%" }}>
        つ
      </div>
      <div className="japanese-letter1" style={{ top: "5%", left: "40%" }}>
        て
      </div>
      <div className="japanese-letter1" style={{ top: "10%", left: "50%" }}>
        と
      </div>
      <div className="japanese-letter1" style={{ top: "15%", left: "60%" }}>
        な
      </div>
      <div className="japanese-letter1" style={{ top: "20%", left: "70%" }}>
        に
      </div>
      <div className="japanese-letter1" style={{ top: "25%", left: "80%" }}>
        ぬ
      </div>
      <div className="japanese-letter1" style={{ top: "30%", left: "90%" }}>
        ね
      </div>
      <div className="japanese-letter1" style={{ top: "35%", left: "10%" }}>
        の
      </div>
      <div className="japanese-letter1" style={{ top: "40%", left: "20%" }}>
        は
      </div>
      <div className="japanese-letter1" style={{ top: "45%", left: "30%" }}>
        ひ
      </div>
      <div className="japanese-letter1" style={{ top: "50%", left: "40%" }}>
        ふ
      </div>
      <div className="japanese-letter1" style={{ top: "55%", left: "50%" }}>
        へ
      </div>
      <div className="japanese-letter1" style={{ top: "60%", left: "60%" }}>
        ほ
      </div>
      <div className="japanese-letter1" style={{ top: "65%", left: "70%" }}>
        ま
      </div>
      <div className="japanese-letter1" style={{ top: "70%", left: "80%" }}>
        み
      </div>
      <div className="japanese-letter1" style={{ top: "75%", left: "90%" }}>
        む
      </div>
      <div className="japanese-letter1" style={{ top: "80%", left: "10%" }}>
        め
      </div>
      <div className="japanese-letter1" style={{ top: "85%", left: "20%" }}>
        も
      </div>
      <div className="japanese-letter1" style={{ top: "90%", left: "30%" }}>
        や
      </div>
      <div className="japanese-letter1" style={{ top: "5%", left: "60%" }}>
        ゆ
      </div>
      <div className="japanese-letter1" style={{ top: "10%", left: "70%" }}>
        よ
      </div>
      <div className="japanese-letter1" style={{ top: "15%", left: "80%" }}>
        ら
      </div>
      <div className="japanese-letter1" style={{ top: "20%", left: "90%" }}>
        り
      </div>
      <div className="japanese-letter1" style={{ top: "25%", left: "10%" }}>
        る
      </div>
      <div className="japanese-letter1" style={{ top: "30%", left: "20%" }}>
        れ
      </div>
      <div className="japanese-letter1" style={{ top: "35%", left: "30%" }}>
        ろ
      </div>
      <div className="japanese-letter1" style={{ top: "40%", left: "40%" }}>
        わ
      </div>
      <div className="japanese-letter1" style={{ top: "45%", left: "50%" }}>
        を
      </div>
      <div className="japanese-letter1" style={{ top: "50%", left: "60%" }}>
        ん
      </div>


      <div className="center-buttons">
        <Link to="/QuizForm">
          <button className="game-button start-button">Start Quiz</button>
        </Link>
        <button className="game-button leaderboard-button" onClick={() => setShowLeaderboard(true)}>
          Leaderboard
        </button>
        <button className="Btn" onClick={handleLogout}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>

      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      

      <ToastContainer />

      <footer className="home-footer">
        <p>© 2025 Kata-Hira. Learn Japanese, one step at a time!</p>
      </footer>
    </div>
  );
};

export default Home;