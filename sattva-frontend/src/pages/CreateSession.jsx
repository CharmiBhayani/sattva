import { useState, useContext } from "react";
import { createSession } from "../services/api";
import { AuthContext} from "../context/AuthContext.jsx";

function CreateSession() {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("Digestion");
  const [level, setLevel] = useState("Easy");
  const [timeOfDay, setTimeOfDay] = useState("Morning");

  const {token}= useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createSession({
      title,
      goal,
      level,
      timeOfDay,
      maxDuration: 25
    },
    token
  );

    alert("Session created");
  };

  return (
  <div className="min-h-screen flex items-center justify-center">
    
    <div
      className="w-full max-w-md p-6 rounded-2xl shadow-lg"
      style={{ backgroundColor: "#E6D8FF" }}   // calm lavender
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Create Session
      </h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 rounded border"
          placeholder="Session Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select className="w-full p-2 rounded border" value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option>Digestion</option>
          <option>Energy</option>
          <option>Flexibility</option>
          <option>Relaxation</option>
          <option>Sleep</option>
          <option>Posture</option>
          <option>Balance</option>
          <option>Strength</option>
          <option>Focus</option>
        </select>

        <select className="w-full p-2 rounded border" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select className="w-full p-2 rounded border" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 mt-2 rounded-lg bg-calmBlue text-white hover:bg-calmNavy transition"
        >
          Create
        </button>
      </form>
    </div>
  </div>
);

}

export default CreateSession;
