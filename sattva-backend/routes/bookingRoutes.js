import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isTutor } from "../middleware/tutorMiddleware.js";
import { bookLiveClass, getMyBookings,getTutorEnrollments } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", authMiddleware, bookLiveClass);
router.get("/mine", authMiddleware, getMyBookings);
router.get("/tutor",authMiddleware,isTutor,getTutorEnrollments);
export default router;
