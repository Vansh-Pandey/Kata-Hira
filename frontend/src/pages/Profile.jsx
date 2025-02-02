import React, { useEffect } from "react";
import { useProfileStore } from "../store/useProfileStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import "../styling/Profile.css";

const Profile = ({ onClose }) => {
  const { authUser } = useAuthStore();
  const { profile, fetchProfile, isFetchingProfile } = useProfileStore();
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // While loading, display a loading message
  if (isFetchingProfile || !profile) {
    return <div>Loading profile...</div>;
  }

  // Function to generate achievements based on the number of questions solved
  const generateAchievements = (questionCount) => {
    const achievements = [];
    if (questionCount >= 100) {
      achievements.push("You’ve completed 100 questions! Well done!");
    }
    if (questionCount >= 250) {
      achievements.push("You’ve completed 250 questions! Amazing effort!");
    }
    if (questionCount >= 500) {
      achievements.push("500 questions solved! You're on fire!");
    }
    if (questionCount >= 1000) {
      achievements.push("1000 questions solved! You're a true quiz master!");
    }
    return achievements;
  };

  // Generate achievements based on profile data
  const achievements = generateAchievements(profile.QuestionCount);

  // Predefined set of colors for achievement cards
  const brightColors = ["color-1", "color-2", "color-3", "color-4", "color-5"];

  return (
    <div className="profile-overlay">
      <div className="profile-section">
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        {/* Profile header with user info */}
        <div className="profile-header">
          <img src="/user.jpg" alt="" className="profile-pic" />
          <div className="profile-info">
            <div className="name">{profile.Username || "John Doe"}</div>
            <div className="email">{profile.Email}</div>
          </div>
        </div>

        {/* Quiz stats section */}
        <div className="quiz-stats">
          <div className="stat-heading">Quiz Stats</div>
          <div className="stats-row">
            <div className="stat-block">
              <div className="stat-label">Number of Questions Solved</div>
              <div className="stat-value">{profile.QuestionCount}</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Total Number of Quizzes</div>
              <div className="stat-value">{profile.QuizCount}</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Total Correct Answers</div>
              <div className="stat-value">{profile.CorrectAnswersCount}</div>
            </div>
          </div>
        </div>

        {/* Achievements section */}
        <div className="achievements-section">
          <div className="achievement-heading">Achievements</div>
          <div className="achievements-carousel">
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`achievement-card ${
                    brightColors[index % brightColors.length]
                  }`}
                >
                  <div className="achievement-quote-container">
                    <blockquote className="achievement-quote">
                      {achievement}
                    </blockquote>
                  </div>
                </div>
              ))
            ) : (
              <div>No achievements yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
