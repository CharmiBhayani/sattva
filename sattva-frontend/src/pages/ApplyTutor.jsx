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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyTutorApplication(token)
      .then(setApplication)
      .catch(() => {});
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  // 🔹 STATUS VIEW
  if (application) {
    const statusConfig = {
      pending: {
        color: "bg-yellow-50 border-yellow-200",
        textColor: "text-yellow-700",
        icon: (
          <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        message: "Your application is under review",
        badge: "Under Review"
      },
      approved: {
        color: "bg-green-50 border-green-200",
        textColor: "text-green-700",
        icon: (
          <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        message: "Congratulations! Your application has been approved",
        badge: "Approved"
      },
      rejected: {
        color: "bg-red-50 border-red-200",
        textColor: "text-red-700",
        icon: (
          <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        message: "Your application was not approved",
        badge: "Not Approved"
      }
    };

    const config = statusConfig[application.status] || statusConfig.pending;

    return (
      <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream py-12 px-4">
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Application Status</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto"></div>
          </div>

          {/* Status Card */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border p-8 ${config.color}`}>
            
            {/* Icon & Badge */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {config.icon}
              </div>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${config.textColor} bg-white/50`}>
                {config.badge}
              </span>
            </div>

            {/* Message */}
            <p className={`text-center text-lg font-medium mb-6 ${config.textColor}`}>
              {config.message}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-sattvaBrown/20 to-transparent my-6"></div>

            {/* Application Details */}
            <div className="space-y-4 bg-white/50 rounded-xl p-6">
              <div>
                <p className="text-sm text-sattvaBrown/60 font-light mb-1">Bio</p>
                <p className="text-sattvaDark">{application.bio}</p>
              </div>
              
              <div>
                <p className="text-sm text-sattvaBrown/60 font-light mb-1">Experience</p>
                <p className="text-sattvaDark">{application.experience} years</p>
              </div>

              {application.adminRemark && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-sattvaBrown/60 font-light mb-1">Admin Remark</p>
                  <p className="text-red-600 font-medium">{application.adminRemark}</p>
                </div>
              )}
            </div>

            {/* Action Messages */}
            {application.status === "approved" && (
              <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl text-center">
                <p className="text-green-700 font-medium mb-2">
                  🎉 Congratulations! You're now a tutor
                </p>
                <p className="text-sm text-green-600">
                  Please logout and login again to access your Tutor Dashboard
                </p>
              </div>
            )}

            {application.status === "pending" && (
              <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-xl text-center">
                <p className="text-yellow-700 font-medium">
                  ⏳ Please be patient while we review your application
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 🔹 FORM VIEW
  return (
    <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Become a Tutor</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Share your yoga expertise with others</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-sattvaBeige/50 p-8">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            
            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                About You <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Tell us about your yoga journey, teaching philosophy, and what makes you passionate about teaching..."
                className="w-full px-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                         transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40 resize-none"
                rows={5}
                required
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
              <p className="mt-1 text-xs text-sattvaBrown/60 font-light">
                Minimum 50 characters
              </p>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="e.g., 5"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                />
              </div>
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-sm font-medium text-sattvaBrown mb-2">
                Certificate URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... or Cloudinary URL"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-sattvaCream/50 border border-sattvaBeige rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-sattvaBrown/30 focus:border-sattvaBrown 
                           transition-all duration-300 text-sattvaDark placeholder-sattvaBrown/40"
                  value={form.certifications}
                  onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                />
              </div>
              <p className="mt-1 text-xs text-sattvaBrown/60 font-light">
                Upload your certificate to Google Drive or Cloudinary and paste the public link here
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-sattvaBrown text-sattvaCream py-3 rounded-xl font-medium
                       shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-sattvaBrown/5 border border-sattvaBrown/20 rounded-2xl">
          <h3 className="font-medium text-sattvaDark mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            What happens next?
          </h3>
          <ul className="space-y-2 text-sm text-sattvaBrown/80 font-light">
            <li className="flex items-start gap-2">
              <span className="text-sattvaBrown mt-1">•</span>
              <span>Our team will review your application within 2-3 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sattvaBrown mt-1">•</span>
              <span>You'll receive an email notification once your application is reviewed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sattvaBrown mt-1">•</span>
              <span>If approved, you'll gain access to the Tutor Dashboard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}