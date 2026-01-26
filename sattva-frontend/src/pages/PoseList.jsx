import { useEffect, useState } from "react";
import { getAllPoses } from "../services/api";

export default function PoseList() {
  const [poses, setPoses] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [levelFilter, setLevelFilter] = useState("All");
  const [goalFilter, setGoalFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");

  useEffect(() => {
    getAllPoses().then(data => {
      setPoses(data);
      setFiltered(data);
    });
  }, []);

  // FILTERING LOGIC
  useEffect(() => {
    let temp = poses;

    if (levelFilter !== "All") {
      temp = temp.filter(p => p.level === levelFilter);
    }

    if (goalFilter !== "All") {
      temp = temp.filter(p => p.goals.includes(goalFilter));
    }

    if (timeFilter !== "All") {
      temp = temp.filter(p => p.timeOfDay === timeFilter);
    }

    setFiltered(temp);
  }, [levelFilter, goalFilter, timeFilter, poses]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2C12 2 8 6 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 6 12 2 12 2Z" strokeWidth="1.5"/>
              <path d="M12 16C12 16 8 18 6 20M12 16C12 16 16 18 18 20M6 20C6 20 4 18 4 16M18 20C18 20 20 18 20 16" strokeWidth="1.5"/>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Yoga Poses</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Discover poses tailored to your practice</p>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 p-6 mb-10">
          <div className="flex flex-wrap gap-4 justify-center">

            {/* Level Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-sattvaBrown/70 font-semibold">Level</label>
              <select
                className="px-5 py-3 rounded-xl bg-sattvaCream/80 shadow-sm border border-sattvaBeige 
                           text-sattvaDark font-medium focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 
                           focus:border-sattvaBrown transition-all duration-300 cursor-pointer hover:border-sattvaBrown/50"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Goal Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-sattvaBrown/70 font-semibold">Goal</label>
              <select
                className="px-5 py-3 rounded-xl bg-sattvaCream/80 shadow-sm border border-sattvaBeige 
                           text-sattvaDark font-medium focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 
                           focus:border-sattvaBrown transition-all duration-300 cursor-pointer hover:border-sattvaBrown/50"
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
              >
                <option>All</option>
                <option>Digestion</option>
                <option>Energy</option>
                <option>Flexibility</option>
                <option>Relaxation</option>
                <option>Sleep</option>
                <option>Posture</option>
                <option>Balance</option>
                <option>Focus</option>
                <option>Strength</option>
              </select>
            </div>

            {/* Time of Day Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-sattvaBrown/70 font-semibold">Time of Day</label>
              <select
                className="px-5 py-3 rounded-xl bg-sattvaCream/80 shadow-sm border border-sattvaBeige 
                           text-sattvaDark font-medium focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 
                           focus:border-sattvaBrown transition-all duration-300 cursor-pointer hover:border-sattvaBrown/50"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>All</option>
                <option>Morning</option>
                <option>Evening</option>
                <option>Night</option>
              </select>
            </div>

          </div>

          {/* Active Filters Display */}
          {(levelFilter !== "All" || goalFilter !== "All" || timeFilter !== "All") && (
            <div className="mt-4 pt-4 border-t border-sattvaBeige/50">
              <p className="text-sm text-sattvaBrown/70 font-light">
                Showing <span className="font-semibold text-sattvaDark">{filtered.length}</span> poses
              </p>
            </div>
          )}
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filtered.map((pose) => (
            <div
              key={pose._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md 
                         border border-sattvaBeige/50 p-6 hover:shadow-2xl hover:border-sattvaBrown/30
                         transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-sattvaBrown/10 to-transparent rounded-bl-full"></div>
              
              {/* Pose Name */}
              <h3 className="text-2xl font-serif text-sattvaDark mb-1 relative z-10">
                {pose.name}
              </h3>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-sattvaBrown/30 via-sattvaBrown/10 to-transparent my-4"></div>

              {/* Level & Duration Tags */}
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1.5 text-sm rounded-full bg-sattvaBrown/10 text-sattvaDark 
                                border border-sattvaBrown/20 font-medium">
                  {pose.level}
                </span>
                <span className="px-3 py-1.5 text-sm rounded-full bg-sattvaBeige/50 text-sattvaBrown 
                                border border-sattvaBeige font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {pose.duration} min
                </span>
              </div>

              {/* Goals Tags */}
              <div className="flex flex-wrap gap-2">
                {pose.goals?.map((g, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-full bg-sattvaCream/80 text-sattvaBrown 
                               border border-sattvaBeige/80 font-light"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Hover decoration */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-20 h-20 text-sattvaBrown/20 mx-auto mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2C12 2 8 6 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 6 12 2 12 2Z" strokeWidth="1.5"/>
              <path d="M12 16C12 16 8 18 6 20M12 16C12 16 16 18 18 20M6 20C6 20 4 18 4 16M18 20C18 20 20 18 20 16" strokeWidth="1.5"/>
            </svg>
            <p className="text-sattvaBrown/60 text-lg font-light mb-2">
              No poses match your filters
            </p>
            <p className="text-sattvaBrown/40 text-sm">Try adjusting your selection</p>
          </div>
        )}
      </div>
    </div>
  );
}