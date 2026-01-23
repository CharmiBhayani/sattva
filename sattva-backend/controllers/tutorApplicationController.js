import TutorApplication from "../models/TutorApplication.js";
import User from "../models/User.js";

export const applyTutor = async (req, res) => {
  const { bio, experience, certifications } = req.body;

  const existing = await TutorApplication.findOne({
    user: req.user.id,
    status: "pending"
  });

  if (existing) {
    return res.status(400).json({ message: "Application already pending" });
  }

  const application = await TutorApplication.create({
    user: req.user.id,
    bio,
    experience,
    certifications
  });

  res.status(201).json(application);
};

export const getMyApplication = async (req, res) => {
  const app = await TutorApplication.findOne({ user: req.user.id });
  res.json(app);
};

/* ADMIN */

export const getAllApplications = async (req, res) => {
  const apps = await TutorApplication.find()
    .populate("user", "name email role");
  res.json(apps);
};

export const getApplicationById = async (req, res) => {
  const app = await TutorApplication.findById(req.params.id)
    .populate("user", "name email role");

  if (!app) return res.status(404).json({ message: "Not found" });

  res.json(app);
};

export const approveApplication = async (req, res) => {
  const app = await TutorApplication.findById(req.params.id);
  if (!app) return res.status(404).json({ message: "Not found" });

  app.status = "approved";
  app.adminRemark = req.body.remark || "";
  await app.save();

  await User.findByIdAndUpdate(app.user, { role: "tutor" });

  res.json({ message: "Tutor approved" });
};

export const rejectApplication = async (req, res) => {
  const app = await TutorApplication.findById(req.params.id);
  if (!app) return res.status(404).json({ message: "Not found" });

  app.status = "rejected";
  app.adminRemark = req.body.remark || "";
  await app.save();

  res.json({ message: "Tutor rejected" });
};
