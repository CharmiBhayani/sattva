import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();   // remove token + role
    navigate("/login");     // go to login page
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded ${
      isActive
        ? "bg-calmBlue text-white"
        : "text-white hover:bg-calmBlue/30"
    }`;

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-calmNavy text-white p-5 flex flex-col justify-between">
        
        {/* Top Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

          <NavLink to="/admin" end className={linkClass}>
            Overview
          </NavLink>

          <NavLink to="/admin/poses" className={linkClass}>
            Manage Poses
          </NavLink>

          <NavLink to="/admin/add-pose" className={linkClass}>
            Add Poses
          </NavLink>

          <NavLink to="/admin/tutor-requests" className={linkClass}>
            Tutor Requests
          </NavLink>

          <NavLink to="/admin/tutors" className={linkClass}>
            Tutors
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
