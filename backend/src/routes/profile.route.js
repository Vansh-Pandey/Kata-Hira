import express from "express";
import { updateProfile, updateLeaderboard, getProfile } from "../controllers/profile.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"
import User from "../models/user.model.js"; // Import the User model

const router = express.Router();

router.get("/", protectRoute, getProfile);


router.patch("/update", protectRoute, updateProfile);

router.patch("/leaderboard", protectRoute, updateLeaderboard);

router.get("/leaderboard", protectRoute, async (req, res) => {
  try {
    // Find all users, sort by CorrectAnswersCount descending, and select only the fields needed.
    const leaderboard = await User.find({})
      .sort({ CorrectAnswersCount: -1 })
      .limit(10)
      .select("fullName CorrectAnswersCount QuizCount"); // Use fullName (which is our Username)

    // Optionally, transform the data here or in the front-end.
    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
