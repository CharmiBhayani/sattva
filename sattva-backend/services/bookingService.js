import Booking from "../models/Booking.js";
import LiveClass from "../models/LiveClass.js";

export const createBooking = async (userId, classId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const classObjectId = new mongoose.Types.ObjectId(classId);
    const liveClass = await LiveClass.findById(classId);

  if (!liveClass) {
    throw new Error("Class not found");
  }

  if (new Date(liveClass.date) < new Date()) {
    throw new Error("Class already completed");
  }

  const alreadyBooked = await Booking.findOne({
    user: userObjectId,
    liveClass: classObjectId
  });
  if (alreadyBooked) {
    throw new Error("Already booked");
  }

  if (
    liveClass.maxParticipants &&
    liveClass.participants.length >= liveClass.maxParticipants
  ) {
    throw new Error("Class is full");
  }

  const booking = await Booking.create({
    user: userId,
    liveClass: classId
  });

  liveClass.participants.push(userId);
  await liveClass.save();

  return booking;
};
