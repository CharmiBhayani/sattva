import { useEffect, useState } from "react";
import { getTutorEnrollments } from "../services/bookingApi";

export default function EnrolledUsers() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    getTutorEnrollments(token).then(setData);
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Enrolled Users 👥
      </h2>

      {data.length === 0 ? (
        <p>No enrollments yet.</p>
      ) : (
        <div className="space-y-4">
          {data.map((b) => (
            <div
              key={b._id}
              className="p-4 bg-white rounded-lg shadow border"
            >
              <h3 className="font-semibold">
                {b.liveClass.title}
              </h3>

              <p className="text-sm text-gray-600">
                📅 {new Date(b.liveClass.date).toLocaleString()}
              </p>

              <p className="mt-2">
                👤 {b.user.name} ({b.user.email})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

