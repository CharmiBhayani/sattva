import razorpay from "../utils/razorpay.js";
import PaymentIntent from "../models/PaymentIntent.js";
import LiveClass from "../models/LiveClass.js";
import TutorWallet from "../models/TutorWallet.js";
import { createBooking } from "../services/bookingService.js";
import crypto from "crypto";

export const createPayment = async (req, res) => {
  try {
    const { classId } = req.body;

    const liveClass = await LiveClass.findById(classId);

    if (!liveClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const options = {
      amount: liveClass.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    const intent = await PaymentIntent.create({
      user: req.user.id,
      liveClass: classId,
      tutor: liveClass.tutor,
      amount: liveClass.price,
      razorpayOrderId: order.id
    });

    res.json({
      orderId: order.id,
      intentId: intent._id,
      amount: liveClass.price,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {

    const {
      intentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const intent = await PaymentIntent.findById(intentId);

    if (!intent) {
      return res.status(404).json({ message: "Payment intent not found" });
    }

    if (intent.status === "success") {
      return res.json({ message: "Payment already verified" });
    }

    if (intent.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ message: "Order mismatch" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const platformFee = Math.round(intent.amount * 0.10);
    const tutorEarning = intent.amount - platformFee;

    intent.status = "success";
    intent.platformFee = platformFee;
    intent.tutorEarning = tutorEarning;
    intent.razorpayPaymentId = razorpay_payment_id;

    await intent.save();

    const booking = await createBooking(intent.user, intent.liveClass);

    let wallet = await TutorWallet.findOne({ tutor: intent.tutor });

    if (!wallet) {
      wallet = await TutorWallet.create({
        tutor: intent.tutor,
        balance: tutorEarning
      });
    } else {
      wallet.balance += tutorEarning;
      await wallet.save();
    }

    res.json({
      message: "Payment successful",
      booking,
      tutorEarned: tutorEarning
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};