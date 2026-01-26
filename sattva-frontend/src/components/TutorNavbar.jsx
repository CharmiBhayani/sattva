import { Link, useNavigate } from "react-router-dom";

export default function TutorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-calmBlue text-white px-6 py-3 flex justify-between items-center shadow">
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate("/tutor/dashboard")}
      >
        Tutor Panel
      </h1>

      <div className="flex gap-6 items-center text-sm">
        <Link to="/tutor/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/tutor/create-class" className="hover:underline">Create Class</Link>
        <Link to="/tutor/my-classes" className="hover:underline">My Classes</Link>
        <Link to="/tutor/enrolled-users" className="hover:underline">Students</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
