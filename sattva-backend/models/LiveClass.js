import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  goal: String,

  level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  duration: {
    type: Number, // minutes
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  meetLink: {
    type: String,
    required: true
  },

  maxParticipants: {
    type: Number,
    default: 10
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("LiveClass", liveClassSchema);
