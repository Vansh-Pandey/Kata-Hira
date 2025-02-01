import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import { useNavigate } from "react-router-dom";
import "../styling/LeaderBoard.css";

const Leaderboard = ({ onClose }) => {
  const { authUser } = useAuthStore(); // Get authentication state
  const navigate = useNavigate();
  const { leaderboard, fetchLeaderboard, isFetchingLeaderboard } = useProfileStore();

  // Fetch leaderboard data on component mount.
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Redirect to login if user is not authenticated.
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  // Render loading state or the leaderboard.
  return (
    <div className="leaderboard-section">
      {/* Close Button */}
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      {/* Leaderboard heading */}
      <div className="leaderboard-heading">Leaderboard</div>

      {isFetchingLeaderboard ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="leaderboard-list">
          {leaderboard.map((player, index) => (
            <div key={player.id} className="leaderboard-card">
              <div className="leaderboard-rank">#{index + 1}</div>
              <div className="leaderboard-name">{player.Username}</div>
              <div className="leaderboard-score">
                {player.CorrectAnswersCount} Points
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
