import PaymentIntent from "../models/PaymentIntent.js";
import Booking from "../models/Booking.js";
import { createBooking } from "../services/bookingService.js";
import LiveClass from "../models/LiveClass.js";

// Create payment intent
export const createMockPayment = async (req, res) => {
  try {
    const { classId } = req.body;

    const liveClass = await LiveClass.findById(classId);
    if (!liveClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const intent = await PaymentIntent.create({
      user: req.user.id,
      liveClass: classId,
      amount: liveClass.price
    });

    res.json({
      intentId: intent._id,
      amount: intent.amount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify mock payment


export const verifyMockPayment = async (req, res) => {
  
    console.log("🔥 VERIFY MOCK PAYMENT HIT");
  console.log("BODY:", req.body);
    try {
    const { intentId, status } = req.body;

    const intent = await PaymentIntent.findById(intentId);
    if (!intent) {
      return res.status(404).json({ message: "Payment intent not found" });
    }

    if (status !== "success") {
      intent.status = "failed";
      await intent.save();
      return res.status(400).json({ message: "Payment failed" });
    }

    intent.status = "success";
    await intent.save();

    
    const booking = await createBooking(
      intent.user,
      intent.liveClass
    );

    res.json({
      message: "Payment successful & booking confirmed",
      booking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
