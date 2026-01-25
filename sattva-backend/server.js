
import dotenv from "dotenv";
dotenv.config();

console.log("JWT_SECRET IN SERVER:", process.env.JWT_SECRET);


import express from "express";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import poseRoutes from "./routes/poseRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tutorApplicationRoutes from "./routes/tutorApplicationRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import mockPaymentRoutes from "./routes/mockPaymentRoutes.js";

connectDB();

const app = express();
app.use(cors()); 
console.log("SERVER FILE LOADED");

app.use(express.json());
app.use("/user", userRoutes);

// Use routes
app.use("/admin",adminRoutes);
app.use("/auth",authRoutes);

app.use("/poses", poseRoutes);
app.use("/session",sessionRoutes);

app.use("/tutor-applications", tutorApplicationRoutes);
app.use("/live-classes", liveClassRoutes);
app.use("/bookings", bookingRoutes);
app.use("/mock-payments", mockPaymentRoutes);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
