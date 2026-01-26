import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../services/userApi";

function Profile() {
  const { token, logoutUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProfile(token)
      .then(setData)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 font-medium">Unable to load profile</p>
        </div>
      </div>
    );
  }

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
            <div className="w-24 h-24 rounded-full bg-sattvaBrown/10 flex items-center justify-center border-4 border-sattvaBrown/20">
              <svg className="w-12 h-12 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Your Profile</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-sattvaBeige/50 overflow-hidden">
          
          {/* Decorative top accent */}
          <div className="h-2 bg-gradient-to-r from-sattvaBrown via-sattvaBeige to-sattvaBrown"></div>
          
          <div className="p-8">
            
            {/* User Info Section */}
            <div className="space-y-6 mb-8">
              
              {/* Name */}
              <div className="flex items-start gap-4 p-4 bg-sattvaCream/30 rounded-xl border border-sattvaBeige/50">
                <div className="w-10 h-10 rounded-full bg-sattvaBrown/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-sattvaBrown/60 font-light mb-1">Full Name</p>
                  <p className="text-sattvaDark font-medium text-lg">{data.user.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-sattvaCream/30 rounded-xl border border-sattvaBeige/50">
                <div className="w-10 h-10 rounded-full bg-sattvaBrown/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-sattvaBrown/60 font-light mb-1">Email Address</p>
                  <p className="text-sattvaDark font-medium">{data.user.email}</p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4 p-4 bg-sattvaCream/30 rounded-xl border border-sattvaBeige/50">
                <div className="w-10 h-10 rounded-full bg-sattvaBrown/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-sattvaBrown/60 font-light mb-1">Account Type</p>
                  <span className="inline-block px-3 py-1 bg-sattvaBrown/20 text-sattvaDark rounded-full text-sm font-medium capitalize">
                    {data.user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-sattvaBrown/30 to-transparent mb-8"></div>

            {/* Stats Section */}
            <div className="mb-8">
              <h3 className="text-lg font-serif text-sattvaDark mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Your Activity
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sessions Count */}
                <div className="p-6 bg-gradient-to-br from-sattvaBrown/5 to-sattvaBeige/20 rounded-xl border border-sattvaBeige/50 text-center">
                  <div className="text-4xl font-serif text-sattvaDark mb-2">{data.sessionsCount}</div>
                  <p className="text-sm text-sattvaBrown/70 font-light">Sessions Created</p>
                </div>

                {/* Member Since (if available) */}
                {data.user.createdAt && (
                  <div className="p-6 bg-gradient-to-br from-sattvaBrown/5 to-sattvaBeige/20 rounded-xl border border-sattvaBeige/50 text-center">
                    <div className="text-lg font-serif text-sattvaDark mb-2">
                      {new Date(data.user.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                    <p className="text-sm text-sattvaBrown/70 font-light">Member Since</p>
                  </div>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logoutUser}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium
                       shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                       flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          
            <a href="/poses"
            className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-sattvaBeige/50 
                     hover:bg-white/80 hover:shadow-lg transition-all duration-300 text-center group"
          >
            <svg className="w-8 h-8 text-sattvaBrown mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-sm text-sattvaDark font-medium">Browse Poses</p>
          </a>

          
            <a href="/live-classes"
            className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-sattvaBeige/50 
                     hover:bg-white/80 hover:shadow-lg transition-all duration-300 text-center group"
          >
            <svg className="w-8 h-8 text-sattvaBrown mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-sattvaDark font-medium">Live Classes</p>
          </a>

          
           <a href="/my-bookings"
            className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-sattvaBeige/50 
                     hover:bg-white/80 hover:shadow-lg transition-all duration-300 text-center group"
          >
            <svg className="w-8 h-8 text-sattvaBrown mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-sattvaDark font-medium">My Bookings</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;