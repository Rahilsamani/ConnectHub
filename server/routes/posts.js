import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.delete("/:userId/deletePost/:postId", verifyToken, deletePost);

// Update
router.patch("/:id/like", verifyToken, likePost);

export default router;
