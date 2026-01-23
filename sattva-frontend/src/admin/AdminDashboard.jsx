import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-calmNavy mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        
        <Link
          to="/admin/add-pose"
          className="p-6 rounded-xl bg-white shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">➕ Add New Pose</h2>
          <p className="text-sm text-gray-500 mt-2">
            Create yoga poses 
          </p>
        </Link>

        <Link
          to="/admin/poses"
          className="p-6 rounded-xl bg-white shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">📋 Manage Poses</h2>
          <p className="text-sm text-gray-500 mt-2">
            View / delete existing poses
          </p>
        </Link>

        <Link
          to="/admin/tutor-requests"
          className="p-6 rounded-xl bg-white shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold"> Tutor Requests </h2>
          <p className="text-sm text-gray-500 mt-2">
            Accept / Reject Tutor Registration
          </p>
        </Link>

      </div>
    </div>
  );
}
