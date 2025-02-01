import mongoose from "mongoose";
import User from "../models/user.model.js";
// Remove or add logic for Cloudinary if needed in the future.
// import cloudinary from "../lib/cloudinary.js";

/**
 * Updates the statistics (profile scores) of the authenticated user.
 * Expects the following numeric fields in req.body:
 * - QuizCount: Number to add to the current QuizCount.
 * - QuestionCount: Number to add to the current QuestionCount.
 * - CorrectAnswersCount: Number to add to the current CorrectAnswersCount.
 */
export const updateProfile = async (req, res) => {
  try {
    const { QuizCount, QuestionCount, CorrectAnswersCount } = req.body;
    const userId = req.user.id; // Ensure the auth middleware sets req.user

    // Validate the user ID.
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    // Find the user by ID.
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log("Incoming stats:", QuizCount, QuestionCount, CorrectAnswersCount);

    // Increment the user's stats. (Make sure the values in req.body are numbers.)
    user.QuizCount += Number(QuizCount);
    user.QuestionCount += Number(QuestionCount);
    user.CorrectAnswersCount += Number(CorrectAnswersCount);

    await user.save();

    console.log("Updated stats:", user.QuizCount, user.QuestionCount, user.CorrectAnswersCount);

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        Username: user.fullName,
        Email: user.email,
        QuizCount: user.QuizCount || 0,
        QuestionCount: user.QuestionCount || 0,
        CorrectAnswersCount: user.CorrectAnswersCount || 0,
        Achievements: user.Achievements || "",
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Updates leaderboard-related fields for the authenticated user.
 * Expects one or both of the following in req.body:
 * - correctAnswersCount: New score or total correct answers.
 * - quizCount: New total quizzes count.
 *
 * Depending on your requirements, this function can either replace the current values or increment them.
 */
export const updateLeaderboard = async (req, res) => {
  try {
    const userId = req.user.id; // Use consistent extraction of the user ID.
    const { correctAnswersCount, quizCount } = req.body;

    // Build the update object.
    const updateData = {};
    if (typeof correctAnswersCount !== "undefined") {
      updateData.CorrectAnswersCount = correctAnswersCount;
    }
    if (typeof quizCount !== "undefined") {
      updateData.QuizCount = quizCount;
    }

    // Update the user document.
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating leaderboard:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * (Optional) Get the authenticated user's profile.
 * You may want this endpoint if your front-end needs to fetch profile details.
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({
      id: user._id,
      Username: user.fullName,
      Email: user.email,
      QuizCount: user.QuizCount || 0,
      QuestionCount: user.QuestionCount || 0,
      CorrectAnswersCount: user.CorrectAnswersCount || 0,
      Achievements: user.Achievements || "",
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};
