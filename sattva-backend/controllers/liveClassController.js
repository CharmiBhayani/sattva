import LiveClass from "../models/LiveClass.js";


export const getUpcomingLiveClasses = async (req, res) => {
  try {
    const now = new Date();

    const classes = await LiveClass.find({
      date: { $gte: now },
      isActive: true
    })
      .populate("tutor", "name email")
      .sort({ date: 1 }); // nearest class first

    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.create({
      ...req.body,
      tutor: req.user.id
    });

    res.status(201).json(liveClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTutorClasses = async (req, res) => {
  const classes = await LiveClass.find({ tutor: req.user.id });
  res.json(classes);
};
