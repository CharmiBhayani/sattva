import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isTutor } from "../middleware/tutorMiddleware.js";
import {
  createLiveClass,
  getTutorClasses
} from "../controllers/liveClassController.js";

const router = express.Router();

router.post("/", authMiddleware, isTutor, createLiveClass);
router.get("/mine", authMiddleware, isTutor, getTutorClasses);

export default router;
