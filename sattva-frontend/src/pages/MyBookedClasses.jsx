import { useEffect, useState } from "react";
import { getMyBookings } from "../services/bookingApi";

export default function MyBookedClasses() {
  const token = localStorage.getItem("token");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyBookings(token)
      .then(setBookings)
      .catch(err => setError(err.message))
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
          <p className="text-sattvaBrown/70 font-light">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">My Booked Classes</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Your upcoming yoga sessions</p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-serif text-sattvaDark mb-3">No Bookings Yet</h3>
            <p className="text-sattvaBrown/60 mb-6 font-light">
              You haven't booked any classes yet
            </p>
            <a 
              href="/live-classes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sattvaBrown text-sattvaCream rounded-xl 
                       font-medium shadow-lg hover:bg-sattvaDark hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Browse Live Classes
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        ) : (
          <>
            {/* Bookings Count */}
            <div className="mb-8 text-center">
              <p className="text-sattvaBrown/70 font-light">
                You have <span className="font-semibold text-sattvaDark">{bookings.length}</span> upcoming {bookings.length === 1 ? 'class' : 'classes'}
              </p>
            </div>

            {/* Bookings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((b) => {
                const classDate = new Date(b.liveClass.date);
                const isPast = classDate < new Date();
                
                return (
                  <div
                    key={b._id}
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                               border p-6 hover:shadow-2xl transition-all duration-500 overflow-hidden
                               ${isPast ? 'border-gray-300' : 'border-sattvaBeige/50 hover:border-sattvaBrown/30'}`}
                  >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sattvaBrown/10 to-transparent rounded-bl-full"></div>
                    
                    {/* Past class indicator */}
                    {isPast && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                          Completed
                        </span>
                      </div>
                    )}

                    {/* Class Title */}
                    <h3 className="text-2xl font-serif text-sattvaDark mb-2 pr-20">
                      {b.liveClass.title}
                    </h3>

                    {/* Tutor */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-sattvaBrown/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-sattvaBrown/70">
                        by <span className="font-medium text-sattvaDark">{b.liveClass.tutor.name}</span>
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-sattvaBrown/30 via-sattvaBrown/10 to-transparent mb-4"></div>

                    {/* Details */}
                    <div className="space-y-3 mb-5">
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

                      {/* Duration */}
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-sattvaBrown/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sattvaDark text-sm font-medium">{b.liveClass.duration} minutes</p>
                      </div>
                    </div>

                    {/* Join Button */}
                    {b.liveClass.meetLink && ( <a
                      
                        href={b.liveClass.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl 
                                  font-medium transition-all duration-300 ${
                          isPast
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-sattvaBrown text-sattvaCream hover:bg-sattvaDark hover:shadow-lg hover:scale-105 shadow-md"
                        }`}
                        onClick={(e) => isPast && e.preventDefault()}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {isPast ? "Class Ended" : "Join Class"}
                      </a>
                    )}

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