import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { adminOverview } from "../controllers/adminAnalyticController.js";

const router = express.Router();

router.get("/stats", authMiddleware, isAdmin, adminOverview);

export default router;
