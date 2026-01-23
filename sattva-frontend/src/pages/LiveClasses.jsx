import { useEffect, useState } from "react";
import { getUpcomingLiveClasses } from "../services/liveClassApi";

export default function LiveClasses() {
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUpcomingLiveClasses()
      .then(setClasses)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Upcoming Live Yoga Classes 🧘‍♀️
      </h2>

      {classes.length === 0 ? (
        <p className="text-gray-600">
          No upcoming live classes at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border"
            >
              <h3 className="text-xl font-semibold mb-1">
                {cls.title}
              </h3>

              <p className="text-sm text-gray-600 mb-2">
                by {cls.tutor?.name}
              </p>

              <div className="text-sm text-gray-700 space-y-1">
                <p>📅 {new Date(cls.date).toLocaleString()}</p>
                <p>⏱ {cls.duration} minutes</p>
                <p>🎯 {cls.level}</p>
              </div>

              <p className="mt-3 font-semibold text-lg">
                ₹ {cls.price}
              </p>

              {token ? (
                <button
                  className="mt-4 w-full bg-calmBlue text-white py-2 rounded hover:bg-calmNavy transition"
                  onClick={() =>
                    alert("Booking coming next 🚀")
                  }
                >
                  Book Class
                </button>
              ) : (
                <a
                  href="/login"
                  className="block text-center mt-4 w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
                >
                  Login to Book
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
