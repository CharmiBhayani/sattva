import { useState } from "react";
import { createPose } from "../services/adminApi";
import { useNavigate } from "react-router-dom";

export default function AddPose() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    level: "Easy",
    duration: 5,
    goals: [],
    timeOfDay: "Morning",
    priority: "Core"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleGoal = (goal) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!token) {
      setError("Admin is not authenticated");
      return;
    }

    if (form.goals.length === 0) {
      setError("Please select at least one goal");
      return;
    }

    setLoading(true);

    try {
      await createPose(form, token);
      alert("✨ Pose added successfully!");
      navigate("/admin/poses");
    } catch (err) {
      setError(err.message || "Failed to add pose");
    } finally {
      setLoading(false);
    }
  };

  const availableGoals = [
    "Energy", 
    "Digestion", 
    "Flexibility", 
    "Relaxation", 
    "Sleep", 
    "Meditation",
    "Strength",
    "Balance",
    "Focus",
    "Posture"
  ];

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">Add New Pose</h2>
        <p className="text-sattvaBrown/70 font-light">Create a new yoga pose for the library</p>
      </div>

      {/* Form Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 p-8">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          
          {/* Pose Name */}
          <div>
            <label className="block text-sm font-medium text-sattvaBrown mb-2">
              Pose Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="e.g., Downward Dog, Tree Pose"
                required
                className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                         transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          {/* Two Column Layout */}
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
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
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

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark appearance-none cursor-pointer"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  <option value="Core">Core</option>
                  <option value="Optional">Optional</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type="number"
                  min="1"
                  max="60"
                  required
                  placeholder="5"
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Time of Day */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Best Time of Day <span className="text-red-500">*</span>
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
                  value={form.timeOfDay}
                  onChange={(e) => setForm({ ...form, timeOfDay: e.target.value })}
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

          {/* Goals */}
          <div>
            <label className="block text-sm font-medium text-sattvaBrown mb-3">
              Goals <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableGoals.map(goal => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    form.goals.includes(goal)
                      ? "bg-sattvaBrown text-sattvaCream shadow-md scale-105"
                      : "bg-sattvaCream/80 text-sattvaBrown border border-sattvaBeige hover:bg-sattvaCream hover:scale-105"
                  }`}
                >
                  {form.goals.includes(goal) && (
                    <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {goal}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-sattvaBrown/60 font-light">
              Selected: {form.goals.length > 0 ? form.goals.join(", ") : "None"}
            </p>
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
                Adding Pose...
              </>
            ) : (
              <>
                Save Pose
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}