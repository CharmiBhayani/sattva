import { useEffect, useState } from "react";
import { getTutorApplications } from "../services/adminTutorApi";
import { useNavigate } from "react-router-dom";

export default function AdminTutorRequests() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getTutorApplications(token)
      .then(setApplications)
      .finally(() => setLoading(false));
  }, [token]);

  const filteredApplications = filter === "All" 
    ? applications 
    : applications.filter(app => app.status === filter.toLowerCase());

  const statusCounts = {
    pending: applications.filter(app => app.status === "pending").length,
    approved: applications.filter(app => app.status === "approved").length,
    rejected: applications.filter(app => app.status === "rejected").length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">Tutor Applications</h2>
        <p className="text-sattvaBrown/70 font-light">
          {applications.length} {applications.length === 1 ? 'application' : 'applications'} received
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-light">Pending Review</p>
              <p className="text-3xl font-serif text-yellow-700">{statusCounts.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-light">Approved</p>
              <p className="text-3xl font-serif text-green-700">{statusCounts.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-light">Rejected</p>
              <p className="text-3xl font-serif text-red-700">{statusCounts.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-sattvaBeige/50 inline-flex mb-8">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === status
                ? "bg-sattvaBrown text-sattvaCream shadow-md"
                : "bg-sattvaCream text-sattvaBrown hover:bg-sattvaCream/50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50">
          <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-2xl font-serif text-sattvaDark mb-3">
            {filter === "All" ? "No Applications Yet" : `No ${filter} Applications`}
          </h3>
          <p className="text-sattvaBrown/60 font-light">
            {filter === "All" 
              ? "New tutor applications will appear here"
              : `No applications with ${filter.toLowerCase()} status`
            }
          </p>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-sattvaBrown/5 to-sattvaBeige/10 border-b border-sattvaBeige/50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-sattvaDark uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-sattvaDark uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-sattvaDark uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-sattvaDark uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-sattvaDark uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((app, idx) => (
                  <tr
                    key={app._id}
                    className={`border-b border-sattvaBeige/30 hover:bg-sattvaCream/30 transition-colors duration-200 ${
                      idx % 2 === 0 ? 'bg-white/50' : 'bg-sattvaCream/10'
                    }`}
                  >
                    {/* Applicant Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sattvaBrown/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="font-medium text-sattvaDark">{app.user.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4">
                      <span className="text-sm text-sattvaBrown/70">{app.user.email}</span>
                    </td>

                    {/* Experience */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sattvaBrown/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="text-sm text-sattvaDark font-medium">{app.experience} years</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          app.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            : app.status === "approved"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/admin/tutor-requests/${app._id}`)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sattvaBrown/10 text-sattvaBrown 
                                 rounded-lg hover:bg-sattvaBrown hover:text-sattvaCream 
                                 transition-all duration-300 text-sm font-medium"
                      >
                        View Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}