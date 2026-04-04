import nodemailer from "nodemailer";


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,        // Changed from 587
  secure: true,     // Changed from false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (to, otp) => {
  try {
    console.log(`Attempting to send OTP email to ${to}...`);
    const info = await transporter.sendMail({
      from: `"Sattva Yoga" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Sattva Email Verification 🌿",
      html: `
        <div style="font-family: sans-serif; color: #5C3A2E; max-width: 600px; margin: 0 auto; border: 1px solid #E8D8C3; border-radius: 20px; padding: 40px; background-color: #F5EFE6;">
          <h2 style="text-align: center; color: #3E2723;">Welcome to Sattva 🧘‍♀️</h2>
          <p style="text-align: center; font-size: 16px;">Hello! Thank you for joining our community.</p>
          <div style="background-color: white; border-radius: 15px; padding: 20px; text-align: center; margin: 30px 0;">
            <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your verification OTP is:</p>
            <h1 style="margin: 10px 0; font-size: 48px; letter-spacing: 15px; color: #5C3A2E;">${otp}</h1>
          </div>
          <p style="text-align: center; font-size: 14px; color: #8B735B;">This OTP will expire in 10 minutes.</p>
          <hr style="border: none; border-top: 1px solid #E8D8C3; margin: 30px 0;">
          <p style="text-align: center; font-size: 12px; color: #A6917C;">If you didn't request this email, you can safely ignore it.</p>
        </div>
      `,
    });
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Critical SMTP Error:", error.message);
    throw error; // Re-throw to be caught in controller
  }
};
