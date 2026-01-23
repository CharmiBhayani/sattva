import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { createPose } from "../services/adminApi";

export default function AddPose() {
  // const { token } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    level: "Easy",
    duration: 5,
    goals: [],
    timeOfDay: "Morning",
    priority: "Core"
  });

  const toggleGoal = (goal) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(form);
    if(!token){
      alert("Admin is not authenticated");
      return;
    }
    await createPose(form, token);
    alert("Pose added");
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Add Pose</h2>

      <input
        placeholder="Pose Name"
        className="w-full p-3 border rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, level: e.target.value })}
        className="w-full p-3 border rounded"
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      {/* PRIORITY SELECT */}
     
<select
  value={form.priority}
  onChange={(e) =>
    setForm({ ...form, priority: e.target.value })
  }
  className="w-full p-3 border rounded"
>
  <option value="Core">Core</option>
  <option value="Optional">Optional</option>
</select>


      <input
        type="number"
        placeholder="Duration (min)"
        className="w-full p-3 border rounded"
        onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
      />

      <div className="flex gap-3">
        {["Energy", "Digestion", "Flexibility", "Relaxation","Sleep","Meditation"].map(goal => (
          <button
            type="button"
            key={goal}
            onClick={() => toggleGoal(goal)}
            className={`px-3 py-1 rounded ${
              form.goals.includes(goal)
                ? "bg-calmBlue text-white"
                : "bg-gray-200"
            }`}
          >
            {goal}
          </button>
        ))}
      </div>

      <select
        onChange={(e) => setForm({ ...form, timeOfDay: e.target.value })}
        className="w-full p-3 border rounded"
      >
        <option>Morning</option>
        <option>Evening</option>
        <option>Night</option>
      </select>

      <button className="bg-calmBlue text-white px-6 py-2 rounded">
        Save Pose
      </button>
    </form>
  );
}
