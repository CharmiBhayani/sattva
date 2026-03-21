import TutorWallet from "../models/TutorWallet.js";
import Payout from "../models/Payout.js";

export const payoutTutor = async (req, res) => {
  try {

    const { tutorId, amount } = req.body;

    const wallet = await TutorWallet.findOne({ tutor: tutorId });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({
        message: "Insufficient tutor balance"
      });
    }

    wallet.balance -= amount;
    await wallet.save();

    const payout = await Payout.create({
      tutor: tutorId,
      amount
    });

    res.json({
      message: "Payout successful",
      payout
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorWallet = async (req, res) => {
  try {
    const tutorId = req.user?.id || req.user?._id;
    if (!tutorId) {
      throw new Error(`DEBUG_NO_TUTOR_ID: req.user is ${JSON.stringify(req.user)}`);
    }

    let wallet = await TutorWallet.findOne({ tutor: tutorId });
    if (!wallet) {
      wallet = await TutorWallet.create({ tutor: tutorId, balance: 0 });
    }
    // Calculate total earnings
    const payouts = await Payout.find({ tutor: tutorId });
    const totalEarnings = payouts.reduce((sum, p) => sum + p.amount, 0) + wallet.balance;

    res.json({
      wallet,
      totalEarnings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorPayouts = async (req, res) => {
  try {
    const tutorId = req.user?.id || req.user?._id;
    if (!tutorId) {
      throw new Error(`DEBUG_NO_TUTOR_ID: req.user is ${JSON.stringify(req.user)}`);
    }

    const payouts = await Payout.find({ tutor: tutorId }).sort({ createdAt: -1 });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTutorWallets = async (req, res) => {
  try {
    const wallets = await TutorWallet.find().populate("tutor", "name email");
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};