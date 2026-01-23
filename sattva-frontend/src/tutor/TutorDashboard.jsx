import { Link } from "react-router-dom";

export default function TutorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name} 🧘‍♂️
      </h1>

      <p className="text-gray-600 mb-8">
        You are registered as a <strong>Tutor</strong>.  
        Manage your live classes and help users achieve their goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CREATE LIVE CLASS */}
        <Link
          to="/tutor/create-class"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border"
        >
          <h3 className="text-xl font-semibold mb-2">
            ➕ Create Live Class
          </h3>
          <p className="text-gray-600">
            Schedule a new live yoga class for users.
          </p>
        </Link>

        {/* MY CLASSES */}
        <Link
          to="/tutor/classes"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border"
        >
          <h3 className="text-xl font-semibold mb-2">
            📅 My Live Classes
          </h3>
          <p className="text-gray-600">
            View and manage your upcoming sessions.
          </p>
        </Link>
      </div>
    </div>
  );
}
