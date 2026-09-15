import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY ? "Loaded" : "Missing");

// Fallback nodemailer transporter (for local dev if needed)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to send email via Brevo REST API (HTTPS port 443 - never blocked on Render)
async function sendViaBrevo(to, subject, htmlContent) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Sattva Yoga",
        email: process.env.EMAIL_USER || "sattvalife4@gmail.com",
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Brevo API error (${response.status})`);
  }

  return response.json();
}

// Generic mail dispatcher
async function dispatchEmail(to, subject, htmlContent) {
  if (process.env.BREVO_API_KEY) {
    console.log(`Sending email to ${to} via Brevo HTTPS API...`);
    const result = await sendViaBrevo(to, subject, htmlContent);
    console.log("Email sent successfully via Brevo:", result.messageId || result);
    return result;
  }

  console.log(`Sending email to ${to} via Nodemailer SMTP...`);
  const info = await transporter.sendMail({
    from: `"Sattva Yoga" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
  console.log("Email sent successfully via Nodemailer:", info.messageId);
  return info;
}

export const sendOTPEmail = async (to, otp) => {
  try {
    const subject = "Sattva Email Verification 🌿";
    const html = `
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
    `;
    return await dispatchEmail(to, subject, html);
  } catch (error) {
    console.error("Critical Email Sending Error:", error.message);
    throw error;
  }
};

export const sendResetPasswordOTPEmail = async (to, otp) => {
  try {
    const subject = "Reset Your Sattva Password";
    const html = `
      <div style="font-family: sans-serif; color: #5C3A2E; max-width: 600px; margin: 0 auto; border: 1px solid #E8D8C3; border-radius: 20px; padding: 40px; background-color: #F5EFE6;">
        <h2 style="text-align: center; color: #3E2723;">Password Reset Request</h2>
        <p style="text-align: center; font-size: 16px;">We received a request to reset your Sattva account password.</p>
        <div style="background-color: white; border-radius: 15px; padding: 20px; text-align: center; margin: 30px 0;">
          <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #8B735B;">Your Password Reset OTP is:</p>
          <h1 style="margin: 10px 0; font-size: 48px; letter-spacing: 15px; color: #5C3A2E;">${otp}</h1>
        </div>
        <p style="text-align: center; font-size: 14px; color: #8B735B;">This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>
        <hr style="border: none; border-top: 1px solid #E8D8C3; margin: 30px 0;">
        <p style="text-align: center; font-size: 12px; color: #A6917C;">If you did not request a password reset, please ignore this email or contact support.</p>
      </div>
    `;
    return await dispatchEmail(to, subject, html);
  } catch (error) {
    console.error("Critical Email Sending Error during password reset:", error.message);
    throw error;
  }
};

