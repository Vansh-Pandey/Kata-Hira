import { useLocation, useNavigate } from "react-router-dom"; // Importing hooks for routing
import "../styling/Results.css"; // Importing the CSS for styling the Results component

// Array of Japanese letters for the background effect
const japaneseLetters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"];

function Results() {
  const location = useLocation(); // Using the useLocation hook to access location state
  const { score, total } = location.state; // Extracting score and total from the location state
  const navigate = useNavigate(); // Using the useNavigate hook to navigate between routes

  // Function to navigate back to the QuizForm page
  const handleRestart = () => {
    navigate("/QuizForm");
  };

  // Function to navigate back to the home page
  const handleHome = () => {
    navigate("/home"); // Navigate to home
  };

  return (
    <div className="results-container">
      {/* Japanese Letters Background */}
      <div className="japanese-letters">
        {/* Generating random positions for Japanese letters */}
        {Array.from({ length: 50 }).map((_, index) => (
          <span
            key={index} // Unique key for each element
            style={{
              "--start-x": Math.random(), // Random starting X position
              "--start-y": Math.random(), // Random starting Y position
              "--i": index, // Random index for each letter
            }}
          >
            {japaneseLetters[Math.floor(Math.random() * japaneseLetters.length)]} {/* Randomly selecting a letter */}
          </span>
        ))}
      </div>

      {/* Content */}
      <h1>Quiz Results</h1> {/* Heading for results */}
      <p className="score">Your score: {score} / {total}</p> {/* Displaying the score and total */}
      <div className="button-container">
        {/* Button to navigate back to home page */}
        <button className="home-button" onClick={handleHome}>
          Go Back to Home
        </button>
        {/* Button to restart the quiz */}
        <button className="restart-button" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default Results; // Exporting the Results component for use in other parts of the app
