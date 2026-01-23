import { useEffect, useState } from "react";
import { getTutorApplications } from "../services/adminTutorApi";

export default function AdminTutorRequests() {
  const token = localStorage.getItem("token");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTutorApplications(token)
      .then(setApplications)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading applications...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Tutor Registration Requests
      </h2>

      {applications.length === 0 ? (
        <p>No tutor applications found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Experience</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{app.user.name}</td>
                  <td className="p-3">{app.user.email}</td>
                  <td className="p-3">
                    {app.experience} yrs
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        app.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <a
                      href={`/admin/tutor-requests/${app._id}`}
                      className="text-calmBlue hover:underline"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
