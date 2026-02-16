import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail, resendOTP } from "../services/auth";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const resent = searchParams.get("resent");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🌿 Show message if OTP was auto-resent from login
  useEffect(() => {
    if (resent) {
      setMessage("A new OTP has been sent to your email 🌿");
    }
  }, [resent]);

  // ❗ Prevent direct access without email
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sattvaBrown">Invalid access. Please sign up again.</p>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await verifyEmail({ email, otp });
      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const data = await resendOTP({ email });
      setMessage(data.message);
    } catch (err) {
      setMessage(err.message || "Resend failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sattvaCream via-sattvaBeige/30 to-sattvaCream flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-sattvaBeige/50">

        <h2 className="text-3xl font-serif text-sattvaDark mb-4 text-center">
          Verify Your Email 🌿
        </h2>

        <p className="text-center text-sm text-sattvaBrown/70 mb-6">
          Enter the OTP sent to <br />
          <span className="font-medium text-sattvaDark">{email}</span>
        </p>

        {message && (
          <div className="mb-4 p-3 rounded-xl text-sm text-center bg-green-50 border border-green-200 text-green-700">
            {message}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full py-3 px-4 border border-sattvaBeige rounded-xl text-center tracking-widest text-lg
                       bg-white text-sattvaDark placeholder-sattvaBrown/40
                       focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sattvaBrown text-sattvaCream py-3 rounded-xl font-medium
                       shadow-lg hover:bg-sattvaDark hover:shadow-xl transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-xs text-sattvaBrown/60 mt-4">
          Didn’t receive the OTP?
        </p>

        <button
          onClick={handleResend}
          className="mt-2 w-full py-3 rounded-xl bg-sattvaBeige text-sattvaBrown font-medium
                     hover:bg-sattvaBrown hover:text-sattvaCream transition-all duration-300"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}
