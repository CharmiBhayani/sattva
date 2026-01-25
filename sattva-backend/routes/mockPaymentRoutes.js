import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createMockPayment,
  verifyMockPayment
} from "../controllers/mockPaymentController.js";

const router = express.Router();

router.post("/create", authMiddleware, createMockPayment);
router.post("/verify", authMiddleware, verifyMockPayment);

export default router;
