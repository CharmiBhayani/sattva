import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  liveClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LiveClass",
    required: true
  },

  bookedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Booking", bookingSchema);
