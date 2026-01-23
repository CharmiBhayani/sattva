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
    <div className="mt-5 bg-calmLavender p-6 rounded-1xl shadow-md backdrop-blur-lg">

      <h2 className="text-3xl font-semibold text-calmNavy mb-6">Yoga Poses</h2>

      {/* FILTER SECTION */}
      <div className="text-1xl font-semibold text-calmBlue flex flex-wrap gap-4 mb-8">

        {/* Level Filter */}
        <select
          className="px-4 py-2 rounded-xl bg-white shadow-sm border border-calmNavy/20"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Goal Filter */}
        <select
          className="px-4 py-2 rounded-xl bg-white shadow-sm border border-calmNavy/20"
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

        {/* Time of Day Filter */}
        <select
          className="px-4 py-2 rounded-xl bg-white shadow-sm border border-calmNavy/20"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option>All</option>
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

      </div>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filtered.map((pose) => (
          <div
            key={pose._id}
            className="p-5 rounded-2xl bg-gradient-to-br from-white to-calmMint/20 shadow-md 
                       border border-white/40 hover:shadow-calmBlue/30 hover:shadow-lg
                       transition duration-300 transform hover:-translate-y-2"
          >
            <h3 className="text-xl font-semibold text-calmNavy flex items-center gap-2">
              {pose.name}
            </h3>

            <div className="h-px bg-calmNavy/20 my-3"></div>

            <div className="flex gap-2">
              <span className="px-3 py-1 text-sm rounded-full bg-calmBlue/20 text-calmBlue border border-calmBlue/40">
                {pose.level}
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-calmMint/20 text-calmNavy border border-calmMint/40">
                {pose.duration} min
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {pose.goals?.map((g, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-calmYellow/40 text-calmNavy border border-calmYellow/50"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <p className="text-center text-calmNavy/60 mt-8 text-lg">
          No poses match your filters 🧘‍♀️✨
        </p>
      )}
    </div>
  );
}
