import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllPosesAdmin, deletePose } from "../services/adminApi";

export default function ManagePoses() {
  const { token } = useContext(AuthContext);
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadPoses();
  }, []);

  const loadPoses = async () => {
    try {
      const data = await getAllPosesAdmin(token);
      setPoses(data);
    } catch (err) {
      console.error("Failed to fetch poses", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this pose? This action cannot be undone.");
    if (!confirm) return;

    try {
      await deletePose(id, token);
      setPoses((prev) => prev.filter((pose) => pose._id !== id));
    } catch (err) {
      alert("Failed to delete pose: " + err.message);
    }
  };

  const filteredPoses = filter === "All" 
    ? poses 
    : poses.filter(pose => pose.level === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading poses...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif text-white mb-2">Manage Poses</h1>
            <p className="text-white/40 font-light">
              {poses.length} {poses.length === 1 ? 'pose' : 'poses'} in library
            </p>
          </div>
          
           <a href="/admin/add-pose"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sattvaBrown text-sattvaCream rounded-xl 
                     font-medium shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Pose
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-sattvaBeige/50 inline-flex">
          {["All", "Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === level
                  ? "bg-sattvaBrown text-sattvaCream shadow-md"
                  : "text-sattvaBrown hover:bg-sattvaCream/50"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    
      {/* Empty State */}
      {filteredPoses.length === 0 ? (
        <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50">
          <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-2xl font-serif text-sattvaDark mb-3">
            {filter === "All" ? "No Poses Found" : `No ${filter} Poses`}
          </h3>
          <p className="text-sattvaBrown/60 mb-6 font-light">
            {filter === "All" 
              ? "Add your first pose to get started"
              : `Try changing the filter or add a new ${filter.toLowerCase()} pose`
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPoses.map((pose) => (
            <div
              key={pose._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md 
                       border border-sattvaBeige/50 p-6 hover:shadow-xl hover:border-sattvaBrown/30
                       transition-all duration-500 overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sattvaBrown/10 to-transparent rounded-bl-full"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                
                {/* Left - Pose Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-serif text-sattvaDark mb-2">
                    {pose.name}
                  </h2>
                  
                  {/* Badges - All using Sattva colors */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-sattvaBrown/10 text-sattvaDark border border-sattvaBrown/20 font-medium">
                      {pose.level}
                    </span>
                    
                    <span className="px-3 py-1 text-xs rounded-full bg-sattvaBeige/50 text-sattvaBrown border border-sattvaBeige font-medium">
                      {pose.timeOfDay}
                    </span>
                    
                    <span className="px-3 py-1 text-xs rounded-full bg-sattvaCream/80 text-sattvaDark border border-sattvaBeige/80 font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {pose.duration} min
                    </span>

                    {pose.priority && (
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        pose.priority === "Core"
                          ? "bg-sattvaDark/10 text-sattvaDark border border-sattvaDark/20"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}>
                        {pose.priority}
                      </span>
                    )}
                  </div>
                  
                  {/* Goals */}
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-sattvaBrown/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <div className="flex flex-wrap gap-1">
                      {pose.goals.map((goal, idx) => (
                        <span key={idx} className="text-sm text-sattvaBrown/70 font-light">
                          {goal}{idx < pose.goals.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right - Delete Button */}
                <button
                  onClick={() => handleDelete(pose._id)}
                  className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium 
                           hover:bg-red-600 hover:shadow-lg hover:scale-105 
                           transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>

              {/* Bottom hover accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}