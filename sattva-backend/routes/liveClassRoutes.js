import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isTutor } from "../middleware/tutorMiddleware.js";
import {
  createLiveClass,
  getTutorClasses,
  getUpcomingLiveClasses
} from "../controllers/liveClassController.js";

const router = express.Router();

router.get("/upcoming", getUpcomingLiveClasses);
router.post("/", authMiddleware, isTutor, createLiveClass);
router.get("/mine", authMiddleware, isTutor, getTutorClasses);

export default router;
