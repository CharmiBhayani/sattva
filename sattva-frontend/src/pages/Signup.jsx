import { useState } from "react";
import { signup } from "../services/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = await signup({ name, email, password });
    setMessage(data.message);

    if (data.message === "Signup successful") {
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/60 backdrop-blur-lg shadow-lg
                      border border-white/40">
        
        <h2 className="text-3xl font-semibold text-calmNavy text-center mb-6">
          Create Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-xl text-black border border-calmNavy/20 bg-white/70"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl text-black border border-calmNavy/20 bg-white/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl text-black border border-calmNavy/20 bg-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-4 bg-calmBlue text-white py-3 rounded-xl shadow-md
                       hover:bg-calmNavy transition"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-calmNavy font-medium">{message}</p>
        )}

        <p className="text-center mt-3 text-sm text-calmNavy/70">
          Already have an account?{" "}
          <a href="/login" className="text-calmBlue hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
