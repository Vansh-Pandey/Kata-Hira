import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import "../styling/QuizForm.css";

const QuizForm = () => {
  const { authUser } = useAuthStore(); // Get authentication state
  const navigate = useNavigate(); // Hook to navigate between routes

  const [quizSettings, setQuizSettings] = useState({
    numberOfQuestions: 10,
    difficulty: "easy",
    timer: 30,
    type: "mcq",
  });

  // Handler for form field changes (dropdowns, text inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizSettings({
      ...quizSettings,
      [name]: value,
    });
  };

  // Handler for range sliders (Number of questions, timer)
  const handleSliderChange = (name, value) => {
    setQuizSettings({
      ...quizSettings,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quiz Settings:", quizSettings);
  };

  // Navigate back to home
  const handleClose = () => {
    navigate("/home");
  };

  // Redirect to home if user is not authenticated
  if (!authUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="quiz-form-container">
      {/* Close Button */}

      {/* Floating Japanese Letters */}
      <div className="form-floating-letters">
        {Array.from({ length: 60 }, (_, i) => (
          <span
            className="form-floating-letter form-rotating-letter"
            key={i}
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 1.5 + 1}rem`,
            }}
          >
            {["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ"][
              Math.floor(Math.random() * 14)
            ]}
          </span>
        ))}
      </div>

        <button className="close-button-2" onClick={handleClose}>✖</button>
      {/* Form Section */}
      <form className="quiz-form" onSubmit={handleSubmit}>
        <h1>Quiz Settings</h1>

        {/* Number of Questions Slider */}
        <label htmlFor="numberOfQuestions">
          Number of Questions: {quizSettings.numberOfQuestions}
        </label>
        <input
          type="range"
          id="numberOfQuestions"
          name="numberOfQuestions"
          min="1"
          max="50"
          value={quizSettings.numberOfQuestions}
          onChange={(e) => handleSliderChange("numberOfQuestions", parseInt(e.target.value))}
        />

        {/* Difficulty Level Dropdown */}
        <label htmlFor="difficulty">Difficulty Level:</label>
        <select id="difficulty" name="difficulty" value={quizSettings.difficulty} onChange={handleChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Timer Slider */}
        <label htmlFor="timer">Timer: {quizSettings.timer} seconds</label>
        <input
          type="range"
          id="timer"
          name="timer"
          min="10"
          max="120"
          value={quizSettings.timer}
          onChange={(e) => handleSliderChange("timer", parseInt(e.target.value))}
        />

        {/* Quiz Type Dropdown */}
        <label htmlFor="type">Type of Quiz:</label>
        <select id="type" name="type" value={quizSettings.type} onChange={handleChange}>
          <option value="mcq">Multiple Choice Questions (MCQs)</option>
        </select>

        {/* Start Quiz Button */}
        <Link to={"/Quiz"} state={quizSettings}>
          <button type="submit">Start Quiz</button>
        </Link>
      </form>
    </div>
  );
};

export default QuizForm;
