import { useEffect, useState } from "react";
import { getMyLiveClasses } from "../services/liveClassApi";

export default function MyLiveClasses() {
  const token = localStorage.getItem("token");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getMyLiveClasses(token).then(setClasses);
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">
        My Live Classes
      </h2>

      {classes.length === 0 ? (
        <p>No live classes created yet.</p>
      ) : (
        <div className="grid gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="p-5 bg-white rounded-xl shadow border"
            >
              <h3 className="text-xl font-semibold">
                {cls.title}
              </h3>

              <p className="text-gray-600 mt-1">
                {cls.description}
              </p>

              <div className="mt-3 text-sm text-gray-700">
                <p>
                  📅{" "}
                  {new Date(cls.date).toLocaleString()}
                </p>
                <p>⏱ {cls.duration} min</p>
                <p>₹ {cls.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
