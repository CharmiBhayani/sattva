import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../services/auth";
import { Mail, KeyRound, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // Step 1: Request OTP | Step 2: Enter OTP & New Password | Step 3: Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Step 1: Handle Send OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await forgotPassword({ email });
      setMessage(data.message || "OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send reset OTP. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword({
        email,
        otp: otp.trim(),
        newPassword
      });
      setMessage(data.message || "Password reset successfully!");
      setStep(3);

      setTimeout(() => {
        navigate("/login", { state: { message: "Password updated successfully. Please sign in." } });
      }, 2500);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please verify the OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP in Step 2
  const handleResend = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await forgotPassword({ email });
      setMessage(data.message || "A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sattvaCream via-sattvaBeige/30 to-sattvaCream flex items-center justify-center py-12 px-4">
      {/* Background ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-sattvaBeige/50">
          
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-sattvaBrown/10 flex items-center justify-center text-sattvaBrown shadow-inner">
              {step === 3 ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : step === 2 ? (
                <KeyRound className="w-7 h-7" />
              ) : (
                <Mail className="w-7 h-7" />
              )}
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-serif text-sattvaDark mb-2">
              {step === 3
                ? "Password Reset Complete"
                : step === 2
                ? "Reset Your Password"
                : "Forgot Password"}
            </h2>
            <p className="text-sm text-sattvaBrown/70 font-light">
              {step === 3
                ? "Redirecting you to the sign in page..."
                : step === 2
                ? `Enter the 6-digit code sent to ${email}`
                : "Enter your registered email to receive a password reset code."}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl text-sm text-center bg-red-50 border border-red-200 text-red-600 animate-fadeIn">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-5 p-3.5 rounded-xl text-sm text-center bg-green-50 border border-green-200 text-green-700 animate-fadeIn">
              {message}
            </div>
          )}

          {/* STEP 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleRequestOTP} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-sattvaBrown mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sattvaBrown/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                             transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sattvaBrown text-sattvaCream py-3 rounded-xl font-medium
                         shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? "Sending Code..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {/* STEP 2: Enter OTP & New Password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sattvaBrown mb-1.5">
                  Verification Code (OTP)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full py-3 px-4 bg-sattvaCream/50 border border-sattvaBeige rounded-xl text-center 
                             tracking-widest text-lg font-semibold focus:outline-none focus:ring-2 
                             focus:ring-sattvaBrown/30 focus:border-sattvaBrown text-sattvaDark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sattvaBrown mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sattvaBrown/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                             transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sattvaBrown/40 hover:text-sattvaDark"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sattvaBrown mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sattvaBrown/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your new password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                             transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sattvaBrown/40 hover:text-sattvaDark"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-sattvaBrown text-sattvaCream py-3 rounded-xl font-medium
                         shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? "Updating Password..." : "Reset Password"}
              </button>

              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sattvaBrown hover:underline"
                >
                  Change email
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-sattvaBrown font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Completed */}
          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <p className="text-sattvaBrown/80 text-sm">
                Your password has been changed. You can now use your new password to sign in.
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-2.5 bg-sattvaBrown text-sattvaCream rounded-xl font-medium
                         hover:bg-sattvaDark transition shadow-md"
              >
                Go to Sign In
              </Link>
            </div>
          )}

          {/* Back to Login link */}
          <div className="mt-6 pt-5 border-t border-sattvaBeige/60 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-sattvaBrown hover:text-sattvaDark transition font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
