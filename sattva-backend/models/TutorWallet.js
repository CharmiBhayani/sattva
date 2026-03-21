import mongoose from "mongoose";

const tutorWalletSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  balance: {
    type: Number,
    default: 0
  }

});

export default mongoose.model("TutorWallet", tutorWalletSchema);