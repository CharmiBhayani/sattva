import mongoose from "mongoose";

const tutorApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  bio: {
    type: String,
    required: true
  },

  experience: {
    type: Number,
    required: true
  },

  certifications: [
    {
      name: String,
      fileUrl: String
    }
  ],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  adminRemark: String
}, { timestamps: true });

export default mongoose.model("TutorApplication", tutorApplicationSchema);
