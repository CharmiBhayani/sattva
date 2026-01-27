import { useEffect, useState } from "react";
import { getMyLiveClasses } from "../services/liveClassApi";

export default function MyLiveClasses() {
  const token = localStorage.getItem("token");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyLiveClasses(token)
      .then(setClasses)
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
          <p className="text-sattvaBrown/70 font-light">Loading your classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">My Live Classes</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Classes you've created for students</p>
        </div>

        {/* Empty State */}
        {classes.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-serif text-sattvaDark mb-3">No Classes Yet</h3>
            <p className="text-sattvaBrown/60 mb-6 font-light">
              You haven't created any live classes yet
            </p>
            <a 
              href="/tutor/create-class"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sattvaBrown text-sattvaCream rounded-xl 
                       font-medium shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Create Your First Class
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </a>
          </div>
        ) : (
          <>
            {/* Classes Count */}
            <div className="mb-8 text-center">
              <p className="text-sattvaBrown/70 font-light">
                You have <span className="font-semibold text-sattvaDark">{classes.length}</span> {classes.length === 1 ? 'class' : 'classes'}
              </p>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classes.map((cls) => {
                const classDate = new Date(cls.date);
                const isPast = classDate < new Date();

                return (
                  <div
                    key={cls._id}
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                               border p-6 hover:shadow-2xl transition-all duration-500 overflow-hidden
                               ${isPast ? 'border-gray-300' : 'border-sattvaBeige/50 hover:border-sattvaBrown/30'}`}
                  >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sattvaBrown/10 to-transparent rounded-bl-full"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isPast 
                          ? 'bg-gray-100 text-gray-500 border border-gray-200'
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        {isPast ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>

                    {/* Class Title */}
                    <h3 className="text-2xl font-serif text-sattvaDark mb-2 pr-24">
                      {cls.title}
                    </h3>

                    {/* Description */}
                    {cls.description && (
                      <p className="text-sm text-sattvaBrown/70 font-light leading-relaxed mb-4">
                        {cls.description}
                      </p>
                    )}

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-sattvaBrown/30 via-sattvaBrown/10 to-transparent mb-4"></div>

                    {/* Details */}
                    <div className="space-y-3">
                      {/* Date & Time */}
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-sattvaBrown/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sattvaDark text-sm font-medium">
                            {classDate.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-sattvaBrown/70 text-sm">
                            {classDate.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Duration & Price */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-sattvaBrown/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sattvaDark text-sm font-medium">{cls.duration} min</p>
                        </div>

                        <div className="flex items-center gap-2">
                          
                          <p className="text-sattvaDark text-sm font-medium">₹{cls.price}</p>
                        </div>
                      </div>

                      {/* Meet Link */}
                      {cls.meetLink && (
                        <div className="pt-3 border-t border-sattvaBeige/50">
                          
                           <a href={cls.meetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sattvaBrown hover:text-sattvaDark transition-colors duration-300 text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Meeting Link
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Bottom hover accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}