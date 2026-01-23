import { useState } from "react";
import { createLiveClass } from "../services/liveClassApi";

export default function CreateLiveClass() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "Flexibility",
    level: "Easy",
    date: "",
    duration: 45,
    price: 299,
    meetLink: "",
    maxParticipants: 10
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createLiveClass(
        {
          ...form,
          date: new Date(form.date)
        },
        token
      );

      alert("Live class created successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Create Live Class
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Class Title"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded"
          rows={3}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, goal: e.target.value })
          }
        >
          <option>Flexibility</option>
          <option>Strength</option>
          <option>Relaxation</option>
          <option>Energy</option>
        </select>

        <select
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, level: e.target.value })
          }
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          type="datetime-local"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, duration: Number(e.target.value) })
          }
        />

        <input
          type="number"
          placeholder="Price (₹)"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
        />

        <input
          placeholder="Google Meet / Zoom Link"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, meetLink: e.target.value })
          }
        />

        <button className="w-full bg-calmBlue text-white py-2 rounded">
          Create Class
        </button>
      </form>
    </div>
  );
}
