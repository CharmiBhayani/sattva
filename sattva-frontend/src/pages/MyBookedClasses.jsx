import { useEffect, useState } from "react";
import { getMyBookings } from "../services/bookingApi";

export default function MyBookedClasses() {
  const token = localStorage.getItem("token");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyBookings(token)
      .then(setBookings)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        My Booked Classes 📅
      </h2>

      {bookings.length === 0 ? (
        <p>You have no upcoming bookings.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-5 bg-white rounded-xl shadow border"
            >
              <h3 className="text-xl font-semibold">
                {b.liveClass.title}
              </h3>

              <p className="text-sm text-gray-600">
                by {b.liveClass.tutor.name}
              </p>

              <p className="mt-2">
                📅 {new Date(b.liveClass.date).toLocaleString()}
              </p>

              <p>⏱ {b.liveClass.duration} minutes</p>

              <a
                href={b.liveClass.meetLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-calmBlue underline"
              >
                Join Class
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
