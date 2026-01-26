import { useState, useContext } from "react";
import { createSession } from "../services/api";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function CreateSession() {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("Digestion");
  const [level, setLevel] = useState("Easy");
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createSession(
        {
          title,
          goal,
          level,
          timeOfDay,
          maxDuration: 25
        },
        token
      );

      alert("✨ Session created successfully!");
      navigate("/sessions");
    } catch (err) {
      setError(err.message || "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream flex items-center justify-center py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Create Session</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Build your personalized yoga practice</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-sattvaBeige/50 p-8">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Session Title */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Session Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="e.g., Morning Energy Flow"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Primary Goal <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark appearance-none cursor-pointer"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option>Digestion</option>
                  <option>Energy</option>
                  <option>Flexibility</option>
                  <option>Relaxation</option>
                  <option>Sleep</option>
                  <option>Posture</option>
                  <option>Balance</option>
                  <option>Strength</option>
                  <option>Focus</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Two Column Layout for Level & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-sattvaBrown mb-2">
                  Difficulty Level <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                             transition-all duration-300 text-sattvaDark appearance-none cursor-pointer"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Time of Day */}
              <div>
                <label className="block text-sm font-medium text-sattvaBrown mb-2">
                  Time of Day <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                             transition-all duration-300 text-sattvaDark appearance-none cursor-pointer"
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                  >
                    <option>Morning</option>
                    <option>Evening</option>
                    <option>Night</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Info */}
            <div className="p-4 bg-sattvaBrown/5 border border-sattvaBrown/20 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sattvaBrown flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-sattvaDark font-medium mb-1">Session Duration</p>
                  <p className="text-xs text-sattvaBrown/70 font-light">
                    Your session will be optimized for approximately 25 minutes based on your preferences
                  </p>
                </div>
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
                  Creating Session...
                </>
              ) : (
                <>
                  Create Session
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-sattvaBrown/5 border border-sattvaBrown/20 rounded-2xl">
          <h3 className="font-medium text-sattvaDark mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            How it works
          </h3>
          <ul className="space-y-2 text-sm text-sattvaBrown/80 font-light">
            <li className="flex items-start gap-2">
              <span className="text-sattvaBrown mt-1">•</span>
              <span>We will curate the perfect sequence of poses based on your preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sattvaBrown mt-1">•</span>
              <span>Poses are selected to match your goal, level, and time of day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sattvaBrown mt-1">•</span>
              <span>View your created sessions anytime from the Sessions page</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreateSession;