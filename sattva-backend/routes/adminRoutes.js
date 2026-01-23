import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {
  createPose,
  updatePose,
  deletePose
} from "../controllers/poseController.js";

const router = express.Router();

router.post("/poses", authMiddleware, isAdmin, createPose);
router.put("/poses/:id", authMiddleware, isAdmin, updatePose);
router.delete("/poses/:id", authMiddleware, isAdmin, deletePose);

export default router;
