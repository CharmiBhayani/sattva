import Session from "../models/Session.js";
import Pose from "../models/Pose.js";

export const createSession = async (req, res) => {
  try {
    const { title, goal, level, timeOfDay, maxDuration = 25 } = req.body;

    // 1️⃣ Find poses safely
    const poses = await Pose.find({
      goals: { $in: [goal] },
      level: new RegExp(`^${level}$`, "i"),
      timeOfDay: new RegExp(`^${timeOfDay}$`, "i"),
    });

    console.log("POSES FOUND:", poses.length);

    // 2️⃣ Select poses within duration
    let total = 0;
    let selectedPoses = [];

    for (let pose of poses) {
      if (total + pose.duration <= maxDuration) {
        total += pose.duration;
        selectedPoses.push(pose._id);
      }
    }

    console.log("SELECTED POSES:", selectedPoses.length);

    // 3️⃣ Create session
    const session = await Session.create({
      title,
      goal,
      level,
      timeOfDay,
      poses: selectedPoses,
      totalDuration: total,
      maxDuration,
      user: req.user.id,
    });

    // 4️⃣ Populate before sending to frontend
    const populatedSession = await Session
      .findById(session._id)
      .populate("poses");

    res.status(201).json(populatedSession);

  } catch (error) {
    console.error("CREATE SESSION ERROR ❌:", error);
    res.status(500).json({ message: error.message });
  }
};



// GET all sessions (with pose details)
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({user: req.user.id}).populate("poses");  // very important

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSession = await Session.findByIdAndDelete( {id: new RegExp(`^${id}$`,"i")});

    if (!deletedSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
