// controllers/adminAnalyticsController.js
import User from "../models/User.js";
import LiveClass from "../models/LiveClass.js";
import Booking from "../models/Booking.js";
import PaymentIntent from "../models/PaymentIntent.js";

export const adminOverview = async (req, res) => {
 const users = await User.countDocuments();
  const tutors = await User.countDocuments({ role: "tutor" });
  const liveClasses = await LiveClass.countDocuments();
  const bookings = await Booking.countDocuments();

  const revenueAgg = await PaymentIntent.aggregate([
    { $match: { status: "success" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const revenue = revenueAgg[0]?.total || 0;

  res.json({
    users,
    tutors,
    liveClasses,
    bookings,
    revenue
  });
};
