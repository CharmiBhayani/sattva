import express from "express";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPayment, verifyPayment } from "../controllers/paymentController.js";
import { payoutTutor, getTutorWallet, getTutorPayouts, getAllTutorWallets } from "../controllers/payoutController.js";
const router = express.Router();

router.post("/create", authMiddleware, createPayment);
router.post("/verify", authMiddleware, verifyPayment);

// Payout Routes
router.post("/payout", authMiddleware, isAdmin, payoutTutor);
router.get("/payout/tutor/wallet", authMiddleware, getTutorWallet);
router.get("/payout/tutor/history", authMiddleware, getTutorPayouts);
router.get("/payout/admin/wallets", authMiddleware, isAdmin, getAllTutorWallets);

export default router;
