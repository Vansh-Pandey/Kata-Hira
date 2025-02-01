import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-toastify";

export const useProfileStore = create((set) => ({
  // State
  profile: null,
  leaderboard: [],
  isFetchingProfile: false,
  isUpdatingProfile: false,
  isFetchingLeaderboard: false,
  isUpdatingLeaderboard: false,

  // Fetch the authenticated user's profile.
  fetchProfile: async () => {
    set({ isFetchingProfile: true });
    try {
      const res = await axiosInstance.get("/profile");
      set({ profile: res.data });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(error.response?.data?.error || "Failed to fetch profile");
    } finally {
      set({ isFetchingProfile: false });
    }
  },

  // Update the user's profile stats.
  updateProfile: async (updatedData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.patch("/profile/update", updatedData);
      set({ profile: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Fetch the leaderboard.
  fetchLeaderboard: async () => {
    set({ isFetchingLeaderboard: true });
    try {
      const res = await axiosInstance.get("/profile/leaderboard");
      console.log("Fetched leaderboard data:", res.data); // Debug logging

      if (!res.data || !Array.isArray(res.data)) {
        throw new Error("Invalid leaderboard data format.");
      }

      // Transform data: use fullName as Username.
      const transformedLeaderboard = res.data.map((entry, index) => ({
        id: `player-${index}`,
        Username: entry.fullName, // from the DB
        CorrectAnswersCount: entry.CorrectAnswersCount,
        QuizCount: entry.QuizCount,
      }));

      set({ leaderboard: transformedLeaderboard });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error(error.response?.data?.error || "Failed to fetch leaderboard");
    } finally {
      set({ isFetchingLeaderboard: false });
    }
  },

  // Update the leaderboard stats.
  updateLeaderboard: async (updateData) => {
    set({ isUpdatingLeaderboard: true });
    try {
      const res = await axiosInstance.patch("/profile/leaderboard", updateData);
      // Optionally update local leaderboard state if the API returns updated leaderboard data.
      // For now, we simply show a success message.
      toast.success("Leaderboard updated successfully");
    } catch (error) {
      console.error("Error updating leaderboard:", error);
      toast.error(error.response?.data?.error || "Failed to update leaderboard");
    } finally {
      set({ isUpdatingLeaderboard: false });
    }
  },
}));
