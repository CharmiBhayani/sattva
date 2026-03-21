import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "completed"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Payout", payoutSchema);