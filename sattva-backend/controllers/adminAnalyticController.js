
import User from "../models/User.js";
import LiveClass from "../models/LiveClass.js";
import Booking from "../models/Booking.js";
import PaymentIntent from "../models/PaymentIntent.js";

export const adminOverview = async (req, res) => {
  try {

    const users = await User.countDocuments();
    const tutors = await User.countDocuments({ role: "tutor" });
    const liveClasses = await LiveClass.countDocuments();
    const bookings = await Booking.countDocuments();

    const revenueAgg = await PaymentIntent.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: null,
          totalPayments: { $sum: "$amount" },
          platformRevenue: { $sum: "$platformFee" },
          tutorRevenue: { $sum: "$tutorEarning" }
        }
      }
    ]);

    const revenue = revenueAgg[0] || {
      totalPayments: 0,
      platformRevenue: 0,
      tutorRevenue: 0
    };

    res.json({
      users,
      tutors,
      liveClasses,
      bookings,
      totalPayments: revenue.totalPayments,
      platformRevenue: revenue.platformRevenue,
      tutorRevenue: revenue.tutorRevenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllPayments = async (req, res) => {
  try {

    const payments = await PaymentIntent.find()
      .populate("user", "name email")
      .populate("tutor", "name email")
      .populate("liveClass", "title price")
      .sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPaymentById = async (req, res) => {
  try {

    const payment = await PaymentIntent.findById(req.params.id)
      .populate("user", "name email")
      .populate("tutor", "name email")
      .populate("liveClass", "title price");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    res.json(payment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};