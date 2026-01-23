import User from "../models/User.js";
import Session from "../models/Session.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const sessionsCount = await Session.countDocuments({ user: req.user.id });

    res.json({
      user,
      sessionsCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
