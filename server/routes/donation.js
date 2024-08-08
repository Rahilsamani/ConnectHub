import express from "express";
import {
  createDonationPost,
  deleteDonationPage,
  getAllDonations,
  getDonationPostDetails,
  updateDonationPost,
} from "../controllers/donation.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createDonationPost);
router.get("/all", getAllDonations);
router.get("/:id", verifyToken, getDonationPostDetails);
router.put("/update/:id", verifyToken, updateDonationPost);
router.delete("/delete/:id", verifyToken, deleteDonationPage);

export default router;
