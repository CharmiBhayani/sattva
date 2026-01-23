import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {
  applyTutor,
  getMyApplication,
  getAllApplications,
  getApplicationById,
  approveApplication,
  rejectApplication
} from "../controllers/tutorApplicationController.js";

const router = express.Router();

/* User */
router.post("/apply", authMiddleware, applyTutor);
router.get("/me", authMiddleware, getMyApplication);

/* Admin */
router.get("/", authMiddleware, isAdmin, getAllApplications);
router.get("/:id", authMiddleware, isAdmin, getApplicationById);
router.put("/:id/approve", authMiddleware, isAdmin, approveApplication);
router.put("/:id/reject", authMiddleware, isAdmin, rejectApplication);

export default router;
