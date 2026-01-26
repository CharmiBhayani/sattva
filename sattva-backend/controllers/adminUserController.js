import User from "../models/User.js";

export const degradeTutor = async (req, res) => {
  try {
    const tutorId = req.params.id;

    const user = await User.findById(tutorId);
    if (!user || user.role !== "tutor") {
      return res.status(400).json({ message: "Invalid tutor" });
    }

    user.role = "user";
    await user.save();

    res.json({ message: "Tutor degraded to normal user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTutors = async (req, res) => {
  const tutors = await User.find({ role: "tutor" }).select("name email role");
  res.json(tutors);
};


