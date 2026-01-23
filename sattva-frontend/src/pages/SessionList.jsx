import { useEffect, useState, useContext } from "react";
import { getAllSessions } from "../services/api";
import { AuthContext} from "../context/AuthContext.jsx";



export default function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if(!token) return;
    getAllSessions(token).then(data => setSessions(data));
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Color themes based on timeOfDay
  const theme = {
    Morning: "from-calmYellow/40 to-white",
    Evening: "from-calmBlue/20 to-white",
    Night: "from-calmNavy/20 to-white",
  };

  return (
   
    <div className="mt-10 bg-calmLavender p-6 rounded-1xl shadow-md backdrop-blur-lg">

      <h2 className="text-3xl font-semibold text-calmNavy mb-6">Your Sessions</h2>

      <div className="flex flex-col gap-6">

        {sessions.map((session) => {
          console.log(session);
          return(
          <div
            key={session._id}
            className={`p-5 rounded-2xl bg-gradient-to-br ${theme[session.timeOfDay]} 
                        shadow-md border border-white/40 transition hover:shadow-lg`}
          >
            {/* TOP SECTION */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(session._id)}
            >
              <h3 className="text-xl font-semibold text-calmNavy">
                🧘 {session.title}
              </h3>

              <span className="text-calmBlue font-medium">
                {expandedCard === session._id ? "▲" : "▼"}
              </span>
            </div>

            {/* BADGES */}
            <div className="flex gap-3 mt-3">
              <span className="px-3 py-1 text-sm rounded-full bg-calmMint/30 text-calmNavy border">
                {session.goal}
              </span>

              <span className="px-3 py-1 text-sm rounded-full bg-calmBlue/20 text-calmBlue border">
                {session.level}
              </span>

              <span className="px-3 py-1 text-sm rounded-full bg-calmYellow/40 text-calmNavy border">
                {session.totalDuration} min
              </span>

              <span className="px-3 py-1 text-sm rounded-full bg-white/60 text-calmNavy border">
                {session.poses.length} poses
              </span>
            </div>

            {/* EXPANDABLE SECTION */}
            {expandedCard === session._id && (
              <div className="mt-5 bg-white/50 p-4 rounded-xl border border-white/40">

                <h4 className="text-lg font-semibold text-calmNavy mb-2">
                  Poses in this Session:
                </h4>

                <ul className="space-y-2">
                  {session.poses.map((p, i) => (
                    <li
                      key={i}
                      className="p-2 rounded-lg bg-calmMint/20 text-calmNavy border"
                    >
                      🧘 {p.name} — {p.duration} min
                    </li>
                  ))}
                </ul>

              </div>
            )}

          </div>
        )})}

      </div>
    </div>
  );
}
