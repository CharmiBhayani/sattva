import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllPosesAdmin, deletePose } from "../services/adminApi";

export default function ManagePoses() {
  const { token } = useContext(AuthContext);
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPoses();
  }, []);

  const loadPoses = async () => {
    try {
      const data = await getAllPosesAdmin(token);
      setPoses(data);
    } catch (err) {
      console.error("Failed to fetch poses", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this pose?");
    if (!confirm) return;

    await deletePose(id, token);
    setPoses((prev) => prev.filter((pose) => pose._id !== id));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading poses...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-calmNavy mb-6">
        Manage Poses
      </h1>

      {poses.length === 0 ? (
        <p className="text-gray-500">No poses found.</p>
      ) : (
        <div className="grid gap-4">
          {poses.map((pose) => (
            <div
              key={pose._id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
            >
              <div>
                <h2 className="text-lg font-semibold">{pose.name}</h2>
                <p className="text-sm text-gray-500">
                  {pose.level} · {pose.timeOfDay} · {pose.duration} min
                </p>
                <p className="text-xs text-gray-400">
                  Goals: {pose.goals.join(", ")}
                </p>
              </div>

              <button
                onClick={() => handleDelete(pose._id)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
