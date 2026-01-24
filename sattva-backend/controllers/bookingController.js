import LiveClass from "../models/LiveClass.js";
import Booking from "../models/Booking.js";

export const bookLiveClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id;

    const liveClass = await LiveClass.findById(classId);

    if (!liveClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    
    if (new Date(liveClass.date) < new Date()) {
      return res.status(400).json({ message: "Class already completed" });
    }

   
    if (
      liveClass.participants.length >= liveClass.maxParticipants
    ) {
      return res.status(400).json({ message: "Class is full" });
    }

    
    const alreadyBooked = await Booking.findOne({
      user: userId,
      liveClass: classId
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: "Already booked" });
    }

    
    const booking = await Booking.create({
      user: userId,
      liveClass: classId
    });

    
    liveClass.participants.push(userId);
    await liveClass.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getMyBookings = async (req, res) => {
  try {
    const now = new Date();

    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: "liveClass",
        match: { date: { $gte: now } }, // only upcoming
        populate: { path: "tutor", select: "name email" }
      })
      .sort({ bookedAt: -1 });

   
    const filtered = bookings.filter(b => b.liveClass);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorEnrollments = async (req, res) => {
  try {
    // find tutor's classes
    const classes = await LiveClass.find({ tutor: req.user.id });

    const classIds = classes.map(c => c._id);

    const bookings = await Booking.find({
      liveClass: { $in: classIds }
    })
      .populate("user", "name email")
      .populate("liveClass", "title date");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};