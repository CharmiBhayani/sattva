import mongoose from "mongoose";
const PoseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  duration: { type: Number, required: true },
  goals: { type: [String], required: true },
  timeOfDay: { type: String, enum: ["Morning", "Evening", "Night"], required: true },
  priority: { type: String, enum: ["Core", "Optional"], required: true }
});

export default mongoose.model("Pose", PoseSchema);
