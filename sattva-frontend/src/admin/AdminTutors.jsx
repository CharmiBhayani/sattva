import { useEffect, useState } from "react";
import { getAllTutors, degradeTutor } from "../services/adminUserApi";

export default function AdminTutors() {
  const [tutors, setTutors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllTutors(token)
      .then(setTutors)
      .catch(err => alert(err.message));
  }, []);

  const handleDegrade = async (id) => {
    if (!window.confirm("Downgrade tutor to normal user?")) return;

    try {
      await degradeTutor(id, token);
      setTutors(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (tutors.length === 0) {
    return <p>No tutors found.</p>;
  }

  return (
    <div className="space-y-4">
      {tutors.map(t => (
        <div
          key={t._id}
          className="flex justify-between items-center bg-white p-4 rounded shadow"
        >
          <div>
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-gray-500">{t.email}</p>
          </div>

          <button
            onClick={() => handleDegrade(t._id)}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Downgrade
          </button>
        </div>
      ))}
    </div>
  );
}
