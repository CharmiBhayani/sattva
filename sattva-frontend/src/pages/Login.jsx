import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { login } from "../services/auth";
import { AuthContext } from "../context/AuthContext.jsx";
import { createMockPayment, verifyMockPayment } from "../services/mockPaymentApi";
import MockCheckout from "../components/MockCheckout";


export default function Login() {
  const location = useLocation();
  const msg = location.state?.message;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { loginUser } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await login({ email, password });
    setMessage(data.message);

    if (data.token) {
      loginUser(data.token,data.user);
      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else if (data.user.role === "tutor") {
        window.location.href = "/tutor";
      } else {
        window.location.href = "/";
      }

    }
  };

  return (
    <div className="flex justify-center mt-16">
      {message && (
        <p className="mb-4 text-red-500 font-medium">
          {message}
        </p>
      )}
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/60 backdrop-blur-lg shadow-lg
                      border border-white/40">
        
        <h2 className="text-3xl font-semibold text-calmNavy text-center mb-6">
          Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl border border-calmNavy/20 bg-white/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl border border-calmNavy/20 bg-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-4 bg-calmBlue text-white py-3 rounded-xl shadow-md
                       hover:bg-calmNavy transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-calmNavy font-medium">{message}</p>
        )}

        <p className="text-center mt-3 text-sm text-calmNavy/70">
          Don't have an account?{" "}
          <a href="/signup" className="text-calmBlue hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
