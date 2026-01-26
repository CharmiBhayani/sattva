import { useEffect, useState, useContext } from "react";
import { getAllSessions } from "../services/api";
import { AuthContext } from "../context/AuthContext.jsx";

export default function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getAllSessions(token)
      .then(data => setSessions(data))
      .finally(() => setLoading(false));
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Color themes based on timeOfDay
  const theme = {
    Morning: {
      bg: "from-amber-50 to-white",
      border: "border-amber-200",
      icon: "☀️"
    },
    Evening: {
      bg: "from-orange-50 to-white",
      border: "border-orange-200",
      icon: "🌅"
    },
    Night: {
      bg: "from-indigo-50 to-white",
      border: "border-indigo-200",
      icon: "🌙"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading your sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Your Sessions</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Personalized yoga practices you've created</p>
        </div>

        {/* Empty State */}
        {sessions.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-2xl font-serif text-sattvaDark mb-3">No Sessions Yet</h3>
            <p className="text-sattvaBrown/60 mb-6 font-light">
              Create your first personalized yoga session
            </p>
            <a 
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sattvaBrown text-sattvaCream rounded-xl 
                       font-medium shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Create Session
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </a>
          </div>
        ) : (
          <>
            {/* Sessions Count */}
            <div className="mb-8 text-center">
              <p className="text-sattvaBrown/70 font-light">
                You have <span className="font-semibold text-sattvaDark">{sessions.length}</span> {sessions.length === 1 ? 'session' : 'sessions'}
              </p>
            </div>

            {/* Sessions List */}
            <div className="space-y-6">
              {sessions.map((session) => {
                const timeTheme = theme[session.timeOfDay] || theme.Morning;
                const isExpanded = expandedCard === session._id;

                return (
                  <div
                    key={session._id}
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                               border ${timeTheme.border} hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                  >
                    {/* Decorative corner accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${timeTheme.bg} rounded-bl-full opacity-50`}></div>
                    
                    {/* Header Section */}
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => toggleExpand(session._id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{timeTheme.icon}</span>
                            <h3 className="text-2xl font-serif text-sattvaDark">
                              {session.title}
                            </h3>
                          </div>
                          <p className="text-sm text-sattvaBrown/60 font-light">
                            {session.timeOfDay} practice
                          </p>
                        </div>

                        {/* Expand/Collapse Button */}
                        <button className="w-10 h-10 rounded-full bg-sattvaBrown/10 hover:bg-sattvaBrown/20 
                                         flex items-center justify-center transition-all duration-300">
                          <svg 
                            className={`w-5 h-5 text-sattvaBrown transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-sattvaBrown/30 via-sattvaBrown/10 to-transparent mb-4"></div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 text-sm rounded-full bg-sattvaBrown/10 text-sattvaDark border border-sattvaBrown/20 font-medium">
                          {session.goal}
                        </span>
                        <span className="px-3 py-1.5 text-sm rounded-full bg-sattvaBeige/50 text-sattvaBrown border border-sattvaBeige font-medium">
                          {session.level}
                        </span>
                        <span className="px-3 py-1.5 text-sm rounded-full bg-sattvaCream/80 text-sattvaDark border border-sattvaBeige/80 font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {session.totalDuration} min
                        </span>
                        <span className="px-3 py-1.5 text-sm rounded-full bg-white/60 text-sattvaBrown border border-sattvaBeige font-medium">
                          {session.poses.length} poses
                        </span>
                      </div>
                    </div>

                    {/* Expandable Section */}
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="bg-sattvaCream/30 p-5 rounded-xl border border-sattvaBeige/50">
                          <h4 className="text-lg font-semibold text-sattvaDark mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Poses in this Session
                          </h4>

                          <ul className="space-y-3">
                            {session.poses.map((p, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-sattvaBeige/50 
                                         hover:bg-white hover:shadow-md transition-all duration-300"
                              >
                                <div className="w-8 h-8 rounded-full bg-sattvaBrown/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-sattvaBrown font-medium text-sm">{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sattvaDark font-medium">{p.name}</p>
                                  <p className="text-xs text-sattvaBrown/60 font-light">{p.level}</p>
                                </div>
                                <span className="px-3 py-1 bg-sattvaBeige/50 text-sattvaBrown rounded-full text-sm font-medium">
                                  {p.duration} min
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Bottom hover accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}