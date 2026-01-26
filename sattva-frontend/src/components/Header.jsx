import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo-sattva-final.jpeg";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Enhanced link styling with elegant underline animation
  const linkClass = "text-sattvaBrown hover:text-sattvaDark transition-all duration-300 relative pb-1 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1.5px] after:w-0 after:bg-gradient-to-r after:from-transparent after:via-sattvaBrown after:to-transparent hover:after:w-full after:transition-all after:duration-500 font-light tracking-wide text-sm uppercase";

  return (
    <header className="bg-gradient-to-b from-sattvaCream to-sattvaBeige/30 shadow-md relative">
      {/* Subtle top accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-sattvaBrown/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* LOGO - CENTERED */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            {/* Decorative glow behind logo */}
            <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
            
            <img
              src={logo}
              alt="Sattva - A State of Wellness"
              className="h-28 relative z-10 cursor-pointer transition-all hover:scale-105 duration-500 drop-shadow-lg mix-blend-multiply"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        {/* Decorative lotus divider */}
        <div className="flex justify-center mb-5">
          <svg className="w-20 h-2 text-sattvaBrown/20" viewBox="0 0 100 12" fill="currentColor">
            <path d="M50 0C50 0 48 4 48 8C48 10 49 11 50 11C51 11 52 10 52 8C52 4 50 0 50 0Z"/>
            <path d="M42 2C42 2 40 5 40 8C40 9.5 41 11 42.5 11C44 11 45 9.5 45 8C45 5 42 2 42 2Z"/>
            <path d="M58 2C58 2 60 5 60 8C60 9.5 59 11 57.5 11C56 11 55 9.5 55 8C55 5 58 2 58 2Z"/>
          </svg>
        </div>

        {/* NAVIGATION - CENTERED BELOW LOGO */}
        <nav className="flex flex-wrap justify-center items-center gap-10 text-base">
          {!token && (
            <>
              <Link to="/" className={linkClass}>Home</Link>
              <Link to="/poses" className={linkClass}>Yoga & Practices</Link>
              <Link to="/live-classes" className={linkClass}>Live Classes</Link>
              <Link to="/login" className={linkClass}>Login</Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link to="/" className={linkClass}>Home</Link>
              <Link to="/poses" className={linkClass}>Poses</Link>
              <Link to="/live-classes" className={linkClass}>Live Classes</Link>
              <Link to="/my-bookings" className={linkClass}>My Bookings</Link>
              <Link to="/apply-tutor" className={linkClass}>Become a Tutor</Link>
              <Link to="/profile" className={linkClass}>Profile</Link>
              <button 
                onClick={handleLogout}
                className={linkClass}
              >
                Logout
              </button>
            </>
          )}

          {token && role === "tutor" && (
            <>
              <Link to="/tutor/dashboard" className={linkClass}>Dashboard</Link>
              <Link to="/tutor/my-classes" className={linkClass}>My Classes</Link>
              <Link to="/tutor/create-class" className={linkClass}>Create Class</Link>
              <button 
                onClick={handleLogout}
                className={linkClass}
              >
                Logout
              </button>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin" className={linkClass}>Admin Dashboard</Link>
              <button 
                onClick={handleLogout}
                className={linkClass}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-sattvaBeige to-transparent"></div>
    </header>
  );
}