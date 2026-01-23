import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { token, user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="w-full bg-calmLavender shadow-sm border-b">
  <div className="flex items-center gap-8">
  <div className="text-2xl font-bold text-calmBlue">
    Your Healing Place!
  </div>

  <div className="flex flex-wrap gap-4 text-calmNavy font-semibold">
    <Link to="/">Home</Link>
    <Link to="/poses">Poses</Link>
    <Link to="/sessions">Sessions</Link>
    {token && <Link to="/create">Create</Link>}
    {token && <Link to="/profile">Profile</Link>}
    {user?.role === "user" && (
  <a href="/apply-tutor">Become a Tutor</a>
  
)}
<a href="/live-classes">Live Classes</a>
  </div>


    {/* RIGHT SIDE USER SECTION */}
    <div className="flex flex-wrap items-center gap-3">
      {token ? (
        <>
          <span className="text-calmBlue font-medium">
            Hi, {user?.name || "User"}
          </span>

          <button
            onClick={logoutUser}
            className="px-4 py-2 rounded-lg bg-calmBlue text-white hover:bg-calmNavy transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link 
            to="/login" 
            className="px-4 py-2 bg-calmBlue text-white rounded-lg hover:bg-calmNavy transition"
          >
            Login
          </Link>

          <Link 
            to="/signup" 
            className="px-4 py-2 bg-calmMint text-calmNavy rounded-lg hover:bg-calmYellow transition"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>

  </div>
</nav>

  );
}
