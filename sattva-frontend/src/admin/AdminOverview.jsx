import { useEffect, useState } from "react";
import { getAdminStats } from "../services/adminAnalyticsApi.js";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    getAdminStats(token)
      .then(setStats)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">Dashboard Overview</h2>
        <p className="text-sattvaBrown/70 font-light">Platform statistics and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Stat 
          title="Total Users" 
          value={stats.users} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="blue"
        />
        
        <Stat 
          title="Active Tutors" 
          value={stats.tutors} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
          color="green"
        />
        
        <Stat 
          title="Live Classes" 
          value={stats.liveClasses} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
          color="purple"
        />
        
        <Stat 
          title="Total Bookings" 
          value={stats.bookings} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="orange"
        />
        
        <Stat 
          title="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`} 
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="amber"
          highlight
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 p-6">
        <h3 className="text-xl font-serif text-sattvaDark mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/tutor-requests"
            className="p-4 bg-sattvaCream/50 rounded-xl border border-sattvaBeige/50 hover:bg-sattvaCream hover:shadow-md transition-all duration-300 text-center group"
          >
            <div className="text-2xl mb-2">📋</div>
            <p className="text-sm text-sattvaDark font-medium group-hover:text-sattvaBrown transition-colors">Review Applications</p>
          </a>
          
          <a
            href="/admin/poses"
            className="p-4 bg-sattvaCream/50 rounded-xl border border-sattvaBeige/50 hover:bg-sattvaCream hover:shadow-md transition-all duration-300 text-center group"
          >
            <div className="text-2xl mb-2">🧘</div>
            <p className="text-sm text-sattvaDark font-medium group-hover:text-sattvaBrown transition-colors">Manage Poses</p>
          </a>
          
          <a
            href="/admin/tutors"
            className="p-4 bg-sattvaCream/50 rounded-xl border border-sattvaBeige/50 hover:bg-sattvaCream hover:shadow-md transition-all duration-300 text-center group"
          >
            <div className="text-2xl mb-2">👥</div>
            <p className="text-sm text-sattvaDark font-medium group-hover:text-sattvaBrown transition-colors">View All Tutors</p>
          </a>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, icon, color, highlight }) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100/30 border-blue-200 text-blue-600",
    green: "from-green-50 to-green-100/30 border-green-200 text-green-600",
    purple: "from-purple-50 to-purple-100/30 border-purple-200 text-purple-600",
    orange: "from-orange-50 to-orange-100/30 border-orange-200 text-orange-600",
    amber: "from-amber-50 to-amber-100/30 border-amber-200 text-amber-600"
  };

  return (
    <div className={`group relative bg-gradient-to-br ${colorClasses[color]} rounded-2xl shadow-md border p-6 
                    hover:shadow-xl transition-all duration-500 overflow-hidden ${highlight ? 'lg:col-span-1' : ''}`}>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-bl-full"></div>
      
      {/* Icon */}
      <div className={`${colorClasses[color]} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      {/* Content */}
      <p className="text-sm text-sattvaBrown/70 font-light mb-1 uppercase tracking-wider">
        {title}
      </p>
      <h2 className="text-4xl font-serif text-sattvaDark">
        {value}
      </h2>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorClasses[color]}`}></div>
    </div>
  );
}