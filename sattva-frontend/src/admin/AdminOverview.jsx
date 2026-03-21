import { useEffect, useState } from "react";
import { getAdminOverview } from "../services/adminAnalyticsApi.js";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    getAdminOverview(token)
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">
          Dashboard Overview
        </h2>
        <p className="text-sattvaBrown/70 font-light">
          Platform statistics and insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <Stat title="Total Users" value={stats.users} color="blue" />

        <Stat title="Active Tutors" value={stats.tutors} color="green" />

        <Stat title="Live Classes" value={stats.liveClasses} color="purple" />

        <Stat title="Total Bookings" value={stats.bookings} color="orange" />

        <Stat
          title="Total Payments"
          value={`₹${stats.totalPayments.toLocaleString()}`}
          color="amber"
        />

        <Stat
          title="Platform Revenue"
          value={`₹${stats.platformRevenue.toLocaleString()}`}
          color="blue"
        />

        <Stat
          title="Tutor Earnings"
          value={`₹${stats.tutorRevenue.toLocaleString()}`}
          color="green"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 p-6">
        <h3 className="text-xl font-serif text-sattvaDark mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <a
            href="/admin/tutor-requests"
            className="p-4 bg-sattvaCream rounded-xl border hover:shadow-md transition text-center"
          >
            📋 Review Applications
          </a>

          <a
            href="/admin/poses"
            className="p-4 bg-sattvaCream rounded-xl border hover:shadow-md transition text-center"
          >
            🧘 Manage Poses
          </a>

          <a
            href="/admin/tutors"
            className="p-4 bg-sattvaCream rounded-xl border hover:shadow-md transition text-center"
          >
            👥 View All Tutors
          </a>

        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, color }) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
    orange: "bg-orange-50 border-orange-200 text-orange-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600"
  };

  return (
    <div
      className={`rounded-2xl border p-6 shadow-md ${colorClasses[color]}`}
    >
      <p className="text-sm text-sattvaBrown/70 mb-1 uppercase tracking-wider">
        {title}
      </p>
      <h2 className="text-4xl font-serif text-sattvaDark">{value}</h2>
    </div>
  );
}