import mongoose from "mongoose";

const paymentIntentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  liveClass: { type: mongoose.Schema.Types.ObjectId, ref: "LiveClass", required: true },
  amount: { type: Number, required: true },
  platformFee: {type: Number},
  tutorEarning: {type: Number},
  tutor: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  status: {
    type: String,
    enum: ["created", "success", "failed"],
    default: "created"
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("PaymentIntent", paymentIntentSchema);
