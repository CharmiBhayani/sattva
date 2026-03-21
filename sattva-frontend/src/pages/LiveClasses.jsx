
import { useEffect, useState } from "react";
import { getUpcomingLiveClasses } from "../services/liveClassApi";
import { getMyBookings } from "../services/bookingApi";
import MockCheckout from "../components/MockCheckout";
import { useNavigate } from "react-router-dom";

export default function LiveClasses() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [bookedClassIds, setBookedClassIds] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getUpcomingLiveClasses().then(setClasses);

    if (token) {
      getMyBookings(token).then(data => {
        const ids = data.map(b => b.liveClass._id);
        setBookedClassIds(ids);
      });
    }
  }, [token]);

  const handlePay = (cls) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (bookedClassIds.includes(cls._id)) {
      alert("⚠️ You have already booked this class");
      return;
    }

    setSelectedClass(cls._id);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedClass(null);

    if (token) {
      getMyBookings(token).then(data => {
        const ids = data.map(b => b.liveClass._id);
        setBookedClassIds(ids);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream py-12 px-4">

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">
            Live Yoga Classes
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>

          <p className="text-sattvaBrown/70 font-light">
            Join expert instructors in real-time sessions
          </p>
        </div>

        {/* Classes */}
        <div className="space-y-6">
          {classes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sattvaBrown/60 text-lg font-light">
                No upcoming classes at the moment
              </p>
            </div>
          ) : (
            classes.map((cls) => {
              const isBooked = bookedClassIds.includes(cls._id);

              return (
                <div
                  key={cls._id}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                             border border-sattvaBeige/50 p-6 hover:shadow-2xl hover:border-sattvaBrown/30
                             transition-all duration-500 overflow-hidden"
                >

                  {/* corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sattvaBrown/10 to-transparent rounded-bl-full"></div>

                  {/* booked badge */}
                  {isBooked && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
                        Booked
                      </span>
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">

                    {/* class info */}
                    <div>
                      <h3 className="text-2xl font-serif text-sattvaDark mb-2">
                        {cls.title}
                      </h3>

                      <p className="text-sattvaBrown/70 text-sm">
                        Instructor: {cls.tutor?.name || "Expert Tutor"}
                      </p>

                      <p className="text-sattvaBrown/70 text-sm">
                        {new Date(cls.date).toLocaleString()}
                      </p>

                      <p className="text-3xl font-serif text-sattvaDark mt-3">
                        ₹{cls.price}
                      </p>
                    </div>

                    {/* button */}
                    <button
                      onClick={() => handlePay(cls)}
                      disabled={isBooked}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                      ${
                        isBooked
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                          : "bg-sattvaBrown text-sattvaCream hover:bg-sattvaDark hover:shadow-lg hover:scale-105 shadow-md"
                      }`}
                    >
                      {isBooked ? "Already Booked" : "Book This Class"}
                    </button>
                  </div>

                  {/* bottom hover accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedClass && (
        <MockCheckout
          classId={selectedClass}
          token={token}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
}

