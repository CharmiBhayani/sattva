import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../services/userApi";

function Profile() {
  const { token, logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfile(token).then(setData);
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <p><strong>Name:</strong> {data.user.name}</p>
      <p><strong>Email:</strong> {data.user.email}</p>
      <p><strong>Sessions Created:</strong> {data.sessionsCount}</p>

      <button
        onClick={logoutUser}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
