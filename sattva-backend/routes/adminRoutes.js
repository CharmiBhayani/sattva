import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {
  createPose,
  updatePose,
  deletePose
} from "../controllers/poseController.js";
import { degradeTutor,getAllTutors } from "../controllers/adminUserController.js";


const router = express.Router();

router.post("/poses", authMiddleware, isAdmin, createPose);
router.put("/poses/:id", authMiddleware, isAdmin, updatePose);
router.delete("/poses/:id", authMiddleware, isAdmin, deletePose);
router.get("/tutors", authMiddleware, isAdmin, getAllTutors);
router.patch("/users/:id/degrade", authMiddleware, isAdmin, degradeTutor);

export default router;
