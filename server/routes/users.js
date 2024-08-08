import express from "express";
import {
  getUser,
  getAllUsers,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/users", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
