import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

export default function AdminTutorRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [app, setApp] = useState(null);
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

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
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, token]);

  const handleAction = async (type) => {
    if (!window.confirm(`Are you sure you want to ${type} this application?`)) {
      return;
    }

    setActionLoading(true);
    try {
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

      alert(`✨ Application ${type}d successfully!`);
      navigate("/admin/tutor-requests");
    } catch (err) {
      alert(`Failed to ${type} application: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-20">
        <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-2xl font-serif text-sattvaDark mb-3">Application Not Found</h3>
        <p className="text-sattvaBrown/60 mb-6 font-light">
          The application you're looking for doesn't exist
        </p>
        <button
          onClick={() => navigate("/admin/tutor-requests")}
          className="px-6 py-3 bg-sattvaBrown text-sattvaCream rounded-xl font-medium 
                   shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  const statusConfig = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200"
    },
    approved: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200"
    },
    rejected: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200"
    }
  };

  const status = statusConfig[app.status] || statusConfig.pending;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/tutor-requests")}
          className="inline-flex items-center gap-2 bg-white text-sattvaBrown hover:text-sattvaDark transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Applications
        </button>
        <h2 className="text-3xl font-serif text-white mb-2">Tutor Application Details</h2>
        <p className="text-sattvaBrown/70 font-light">Review applicant information and credentials</p>
      </div>

      {/* Main Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 overflow-hidden">
        
        {/* Status Badge */}
        <div className="bg-gradient-to-r from-sattvaBrown/5 to-sattvaBeige/10 p-6 border-b border-sattvaBeige/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-serif text-sattvaDark mb-1">{app.user.name}</h3>
              <p className="text-sm text-sattvaBrown/70">{app.user.email}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${status.bg} ${status.text} border ${status.border}`}>
              {app.status}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Bio Section */}
          <div>
            <h4 className="text-lg font-semibold text-sattvaDark mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              About the Applicant
            </h4>
            <div className="p-4 bg-sattvaCream/30 rounded-xl border border-sattvaBeige/50">
              <p className="text-sattvaBrown/80 leading-relaxed">{app.bio}</p>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h4 className="text-lg font-semibold text-sattvaDark mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Teaching Experience
            </h4>
            <div className="p-4 bg-sattvaCream/30 rounded-xl border border-sattvaBeige/50">
              <p className="text-2xl font-serif text-sattvaDark">{app.experience} Years</p>
              <p className="text-sm text-sattvaBrown/60 mt-1">of yoga teaching experience</p>
            </div>
          </div>

          {/* Certificates Section */}
          <div>
            <h4 className="text-lg font-semibold text-sattvaDark mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Certifications
            </h4>
            <div className="space-y-2">
              {app.certifications.map((c, i) => (
                <a
                  key={i}
                 
                  href={c.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 bg-sattvaCream/30 rounded-xl border border-sattvaBeige/50 
                           hover:bg-sattvaCream hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-sattvaBrown/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sattvaDark font-medium">{c.name}</p>
                    <p className="text-xs text-sattvaBrown/60">Click to view certificate</p>
                  </div>
                  <svg className="w-5 h-5 text-sattvaBrown/40 group-hover:text-sattvaBrown group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Admin Remark if exists */}
          {app.adminRemark && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <h4 className="text-sm font-semibold text-red-700 mb-2">Admin Remark</h4>
              <p className="text-red-600 text-sm">{app.adminRemark}</p>
            </div>
          )}

          {/* Admin Actions */}
          {app.status === "pending" && (
            <div className="pt-6 border-t border-sattvaBeige/50">
              <h4 className="text-lg font-semibold text-sattvaDark mb-4">Take Action</h4>
              
              <textarea
                placeholder="Add a remark (optional - will be visible to the applicant if rejected)"
                className="w-full px-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                         transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40 resize-none mb-4"
                rows={3}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />

              <div className="flex gap-4">
                <button
                  onClick={() => handleAction("approve")}
                  disabled={actionLoading}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium 
                           hover:bg-green-700 hover:shadow-lg hover:scale-105 
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve Application
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleAction("reject")}
                  disabled={actionLoading}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium 
                           hover:bg-red-700 hover:shadow-lg hover:scale-105 
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject Application
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}