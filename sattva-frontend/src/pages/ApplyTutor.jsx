import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  applyTutor,
  getMyTutorApplication
} from "../services/tutorApplicationApi";

export default function ApplyTutor() {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    bio: "",
    experience: 1,
    certifications: ""
  });

  const [application, setApplication] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyTutorApplication(token)
      .then(setApplication)
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        bio: form.bio,
        experience: Number(form.experience),
        certifications: [
          {
            name: "Certificate",
            fileUrl: form.certifications
          }
        ]
      };

      const data = await applyTutor(payload, token);
      setApplication(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 STATUS VIEW
  if (application) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Tutor Application Status</h2>

        <p className="mb-2">
          <strong>Status:</strong>{" "}
          <span className="capitalize">{application.status}</span>
        </p>

        {application.adminRemark && (
          <p className="mt-2 text-red-500">
            <strong>Admin Remark:</strong> {application.adminRemark}
          </p>
        )}

        {application.status === "approved" && (
          <p className="mt-4 text-green-600 font-medium">
            🎉 Approved! Please logout and login again to access Tutor Dashboard.
          </p>
        )}

        {application.status === "pending" && (
          <p className="mt-4 text-yellow-600">
            ⏳ Your application is under review.
          </p>
        )}
      </div>
    );
  }

  // 🔹 FORM VIEW
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Apply to Become a Tutor</h2>

      {error && (
        <p className="mb-3 text-red-500 font-medium">{error}</p>
      )}

      <form onSubmit={submit} className="space-y-4">
        <textarea
          placeholder="Tell us about yourself"
          className="w-full p-3 border rounded"
          rows={4}
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
        />

        <input
          type="number"
          min="1"
          placeholder="Years of experience"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
        />

        <input
          placeholder="Certificate URL (Drive / Cloudinary)"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, certifications: e.target.value })
          }
        />

        <button
          className="w-full bg-calmBlue text-white py-2 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
