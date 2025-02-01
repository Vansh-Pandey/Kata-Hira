import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Home from "./pages/Home";
import IntroPage from "./pages/IntroPage";
import Login from "./pages/Login";

import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import QuizForm from "./pages/QuizForm";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import { useAuthStore } from "./store/useAuthStore";
// import {Toaster} from "react-hot-toast";
const App = () => {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);  
  console.log({ authUser });
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/leaderboard"
          element={authUser ? <Leaderboard /> : <Navigate to="/" />}
        />
        <Route
          path="/quizform"
          element={authUser ? <QuizForm /> : <Navigate to="/" />}
        />
        <Route
          path="/quiz"
          element={authUser ? <Quiz /> : <Navigate to="/" />}
        />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
};

export default App;
