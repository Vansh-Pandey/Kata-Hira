import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styling/Quiz.css";
import { useProfileStore } from "../store/useProfileStore";

function Quiz() {
  const location = useLocation();
  const quizSettings = location.state; // Quiz settings passed from the previous page
  const navigate = useNavigate();
  const { updateProfile } = useProfileStore(); // Use the updateProfile function from the store

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(quizSettings.numberOfQuestions).fill("")
  );
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(quizSettings.timer);
  const [isTimedOut, setIsTimedOut] = useState(false);

  // Fisher-Yates shuffle function to randomize questions
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetch and shuffle questions from a local JSON file
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Updated fetch URL; assumes question.json is in the public folder
        const response = await fetch("./question.json");
        const data = await response.json();
        const shuffledQuestions = shuffleArray(data).slice(
          0,
          quizSettings.numberOfQuestions
        );
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [quizSettings.numberOfQuestions]);

  // Timer logic: decrease time every second if answer not submitted
  useEffect(() => {
    if (timeLeft > 0 && !isAnswerSubmitted) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isAnswerSubmitted) {
      handleTimeout();
    }
  }, [timeLeft, isAnswerSubmitted]);

  // Reset timer and question-related state when moving to the next question
  useEffect(() => {
    setTimeLeft(quizSettings.timer);
    setIsTimedOut(false);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
  }, [currentQuestionIndex, quizSettings.timer]);

  // Mark question as timed out when time runs out
  const handleTimeout = () => {
    setIsTimedOut(true);
    setIsAnswerSubmitted(true);
  };

  // Handle answer selection and check correctness
  const handleAnswerSelection = (selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
    setIsCorrect(selectedAnswer === questions[currentQuestionIndex].correctAnswer);
  };

  // Submit the answer: stop timer and mark as submitted
  const handleSubmitAnswer = () => {
    if (!isTimedOut) {
      setIsAnswerSubmitted(true);
      setTimeLeft(0);
    }
  };

  // Move to the next question or finish the quiz
  const handleNextQuestion = async () => {
    if (currentQuestionIndex < quizSettings.numberOfQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const scoreCount = answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      await handleEndQuiz();
      setScore(score + scoreCount);
      navigate("/results", {
        state: { score: scoreCount, total: quizSettings.numberOfQuestions },
      });
    }
  };

  // End the quiz, update the user profile, and navigate to the results page
  const handleEndQuiz = async () => {
    const scoreCount = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    try {
      // Update profile with quiz statistics using the store's updateProfile function
      await updateProfile({
        QuestionCount: quizSettings.numberOfQuestions,
        QuizCount: 1,
        CorrectAnswersCount: scoreCount,
      });
      console.log("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setScore(score + scoreCount);
    navigate("/results", {
      state: { score: scoreCount, total: quizSettings.numberOfQuestions },
    });
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>
          Quiz: {quizSettings.type === "mcq" ? "Multiple Choice" : "Fill in the Blanks"}
        </h1>
        <span>
          Question {currentQuestionIndex + 1}/{quizSettings.numberOfQuestions}
        </span>
        <div className="timer">Time Left: {timeLeft} seconds</div>
      </div>

      <div className="quiz-question">{currentQuestion.question}</div>

      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(option)}
            disabled={isAnswerSubmitted || isTimedOut}
            className={
              isAnswerSubmitted && option === currentQuestion.correctAnswer
                ? "correct"
                : answers[currentQuestionIndex] === option && isAnswerSubmitted
                ? "incorrect"
                : answers[currentQuestionIndex] === option
                ? "selected"
                : ""
            }
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswerSubmitted && (
        <div
          className={`quiz-feedback ${
            isTimedOut ? "timeout" : isCorrect ? "correct" : "incorrect"
          }`}
        >
          {isTimedOut
            ? "Time's up! ⏰"
            : isCorrect
            ? "Correct! 🎉"
            : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
        </div>
      )}

      <div className="quiz-navigation">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={!answers[currentQuestionIndex] && !isTimedOut}
          >
            Submit Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex < quizSettings.numberOfQuestions - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        )}
        <button onClick={handleEndQuiz} className="end-quiz-button">
          End Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;
