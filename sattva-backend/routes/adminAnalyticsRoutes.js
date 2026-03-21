import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {adminOverview, getAllPayments, getPaymentById} from "../controllers/adminAnalyticController.js";

const router = express.Router();

router.get("/overview", authMiddleware, isAdmin, adminOverview);
router.get("/payments", authMiddleware, isAdmin, getAllPayments);
router.get("/payments/:id", authMiddleware, isAdmin, getPaymentById);

export default router;