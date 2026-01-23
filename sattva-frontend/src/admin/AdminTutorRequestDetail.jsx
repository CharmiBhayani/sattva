import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

export default function AdminTutorRequestDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [app, setApp] = useState(null);
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/tutor-applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setApp(data);
        setLoading(false);
      });
  }, []);

  const handleAction = async (type) => {
    await fetch(
      `${BASE_URL}/tutor-applications/${id}/${type}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ remark })
      }
    );

    alert(`Application ${type}ed`);
    window.location.reload();
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (!app) return <p>Application not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Tutor Application Details
      </h2>

      {/* USER INFO */}
      <div className="mb-4">
        <p><strong>Name:</strong> {app.user.name}</p>
        <p><strong>Email:</strong> {app.user.email}</p>
        <p><strong>Status:</strong> {app.status}</p>
      </div>

      {/* BIO */}
      <div className="mb-4">
        <h3 className="font-semibold">Bio</h3>
        <p className="text-gray-700">{app.bio}</p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-4">
        <h3 className="font-semibold">Experience</h3>
        <p>{app.experience} years</p>
      </div>

      {/* CERTIFICATES */}
      <div className="mb-4">
        <h3 className="font-semibold">Certificates</h3>
        {app.certifications.map((c, i) => (
          <div key={i}>
            <a
              href={c.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-calmBlue underline"
            >
              {c.name}
            </a>
          </div>
        ))}
      </div>

      {/* ADMIN ACTIONS */}
      {app.status === "pending" && (
        <>
          <textarea
            placeholder="Admin remark (optional)"
            className="w-full p-2 border rounded mb-3"
            onChange={(e) => setRemark(e.target.value)}
          />

          <div className="flex gap-4">
            <button
              onClick={() => handleAction("approve")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => handleAction("reject")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </>
      )}
    </div>
  );
}
