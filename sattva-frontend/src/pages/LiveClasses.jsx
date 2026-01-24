import { useEffect, useState } from "react";
import { getUpcomingLiveClasses } from "../services/liveClassApi";
import { bookLiveClass } from "../services/bookingApi";

export default function LiveClasses() {
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    getUpcomingLiveClasses().then(setClasses);
  }, []);

  const handleBook = async (classId) => {
    try {
      if (!token) {
        alert("Please login to book a class");
        return;
      }

      await bookLiveClass(classId, token);
      alert("Class booked successfully 🎉");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Upcoming Live Yoga Classes 🧘‍♀️
      </h2>

      {classes.map((cls) => (
        <div key={cls._id} className="p-5 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">{cls.title}</h3>
          <p>by {cls.tutor?.name}</p>
          <p>{new Date(cls.date).toLocaleString()}</p>
          <p>{cls.duration} minutes</p>
          <p>₹ {cls.price}</p>

          <button
            onClick={() => handleBook(cls._id)}
            className="mt-3 bg-calmBlue text-white px-4 py-2 rounded"
          >
            Book Class
          </button>
        </div>
      ))}
    </div>
  );
}
