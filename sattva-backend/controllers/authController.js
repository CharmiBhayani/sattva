import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPEmail, sendResetPasswordOTPEmail } from "../utils/sendEmail.js";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: "Email already registered" });
      } else {
        // Update unverified user to allow them to retry
        user.name = name;
        user.password = hashedPassword;
        user.emailOTP = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        isVerified: false,
        emailOTP: otp,
        otpExpires: Date.now() + 10 * 60 * 1000,
      });
    }

    // 📩 Send OTP email
    try {
      await sendOTPEmail(normalizedEmail, otp);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
      return res.status(500).json({ 
        message: "Failed to send email. Check configuration.",
        error: emailError.message // Temporary for debugging
      });
    }

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "Signup successful. Please verify your email with the OTP sent.",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🚫 Block login if not verified
    if (!user.isVerified) {
  return res.status(403).json({ 
    message: "Please verify your email first" 
  });
}

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // 🔁 Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.emailOTP = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // 📩 Send email again
    await sendOTPEmail(user.email, otp);

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= VERIFY EMAIL =================
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.emailOTP || !user.otpExpires) {
      return res.status(400).json({ message: "No OTP found. Please request a new one." });
    }

    if (user.emailOTP !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.emailOTP = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email address" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    try {
      await sendResetPasswordOTPEmail(normalizedEmail, otp);
    } catch (emailError) {
      console.error("Failed to send reset password email:", emailError.message);
      return res.status(500).json({ message: "Failed to send reset email. Please try again later." });
    }

    res.json({ message: "Password reset OTP has been sent to your email." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
      return res.status(400).json({ message: "No password reset request found. Please request a new OTP." });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    if (user.resetPasswordOTP !== otp.trim()) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    // Also mark verified if not already verified
    user.isVerified = true;

    await user.save();

    res.json({ message: "Password reset successfully. You can now log in with your new password." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 