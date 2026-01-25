import mongoose from "mongoose";

const paymentIntentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  liveClass: { type: mongoose.Schema.Types.ObjectId, ref: "LiveClass", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["created", "success", "failed"],
    default: "created"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("PaymentIntent", paymentIntentSchema);
