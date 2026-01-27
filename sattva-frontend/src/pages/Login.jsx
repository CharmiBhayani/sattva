import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { login } from "../services/auth";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const location = useLocation();
  const msg = location.state?.message;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(AuthContext);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await login({ email, password });
      setMessage(data.message);

      if (data.token) {
        loginUser(data.token, data.user);
        if (data.user.role === "admin") {
          window.location.href = "/admin";
        } else if (data.user.role === "tutor") {
          window.location.href = "/tutor/dashboard";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      setMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sattvaCream via-sattvaBeige/30 to-sattvaCream flex items-center justify-center py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        
        {/* Decorative lotus at top */}
        <div className="flex justify-center mb-8">
          <svg className="w-16 h-16 text-sattvaBrown/40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2C12 2 8 6 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 6 12 2 12 2Z" strokeWidth="1.5"/>
            <path d="M12 16C12 16 8 18 6 20M12 16C12 16 16 18 18 20M6 20C6 20 4 18 4 16M18 20C18 20 20 18 20 16" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-sattvaBeige/50">
          
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-sattvaDark mb-2">Welcome Back</h2>
            <p className="text-sm text-sattvaBrown/70 font-light">Sign in to continue your journey</p>
          </div>

          {/* Message from redirect (e.g., "Please login first") */}
          {msg && (
            <div className="mb-6 p-4 bg-sattvaBrown/10 border border-sattvaBrown/20 rounded-xl text-sattvaBrown text-sm text-center">
              {msg}
            </div>
          )}

          {/* Error/Success Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm text-center ${
              message.includes("success") || message.includes("successful")
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-600"
            }`}>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-sattvaBrown text-sattvaCream py-3 rounded-xl font-medium
                       shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sattvaBeige/60"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-sattvaBrown/60 font-light">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-sattvaBrown/70 font-light">
            Don't have an account?{" "}
            <a 
              href="/signup" 
              className="text-sattvaBrown font-medium hover:text-sattvaDark transition-colors duration-300 relative
                       after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-sattvaBrown 
                       hover:after:w-full after:transition-all after:duration-300"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Bottom decorative text */}
        <p className="text-center mt-6 text-sm text-sattvaBrown/50 font-light italic">
          Continue your wellness journey
        </p>
      </div>
    </div>
  );
}