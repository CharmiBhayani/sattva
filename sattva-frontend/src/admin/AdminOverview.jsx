import { useEffect, useState } from "react";
import { getAdminStats } from "../services/adminAnalyticsApi.js";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAdminStats(token)
      .then(setStats)
      .catch(err => alert(err.message));
  }, []);

  if (!stats) return <p>Loading admin stats...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <Stat title="Users" value={stats.users} />
      <Stat title="Tutors" value={stats.tutors} />
      <Stat title="Live Classes" value={stats.liveClasses} />
      <Stat title="Bookings" value={stats.bookings} />
      <Stat title="Revenue" value={`₹ ${stats.revenue}`} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
