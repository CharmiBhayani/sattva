import { useEffect, useState } from "react";
import { getUpcomingLiveClasses } from "../services/liveClassApi";
import { getMyBookings } from "../services/bookingApi";
import { createMockPayment, verifyMockPayment } from "../services/mockPaymentApi";
import MockCheckout from "../components/MockCheckout";
import { useNavigate } from "react-router-dom";

export default function LiveClasses() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [bookedClassIds, setBookedClassIds] = useState([]);
  const [intentId, setIntentId] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getUpcomingLiveClasses().then(setClasses);

    if (token) {
      getMyBookings(token).then(data => {
        const ids = data.map(b => b.liveClass._id);
        setBookedClassIds(ids);
      });
    }
  }, [token]);

  const handlePay = async (cls) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (bookedClassIds.includes(cls._id)) {
      alert("⚠️ You have already booked this class");
      return;
    }

    const data = await createMockPayment(cls._id, token);
    setIntentId(data.intentId);
    setShowCheckout(true);
  };

  const handleSuccess = async () => {
    await verifyMockPayment(intentId, "success", token);
    alert("Booking confirmed 🎉");
    setShowCheckout(false);
    // Refresh bookings
    getMyBookings(token).then(data => {
      const ids = data.map(b => b.liveClass._id);
      setBookedClassIds(ids);
    });
  };

  const handleFail = async () => {
    await verifyMockPayment(intentId, "failed", token);
    alert("Payment failed ❌");
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-sattvaBrown/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaBeige/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Live Yoga Classes</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Join expert instructors in real-time sessions</p>
        </div>

        {/* Classes Grid */}
        <div className="space-y-6">
          {classes.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-20 h-20 text-sattvaBrown/20 mx-auto mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-sattvaBrown/60 text-lg font-light mb-2">
                No upcoming classes at the moment
              </p>
              <p className="text-sattvaBrown/40 text-sm">Check back soon for new sessions</p>
            </div>
          ) : (
            classes.map((cls) => {
              const isBooked = bookedClassIds.includes(cls._id);
              
              return (
                <div 
                  key={cls._id} 
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                             border border-sattvaBeige/50 p-6 hover:shadow-2xl hover:border-sattvaBrown/30
                             transition-all duration-500 overflow-hidden"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sattvaBrown/10 to-transparent rounded-bl-full"></div>
                  
                  {/* Booked Badge */}
                  {isBooked && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Booked
                      </span>
                    </div>
                  )}

                  <div className="relative z-10">
                    
                    {/* Class Info */}
                    <div className={isBooked ? "pr-32" : ""}>
                      <h3 className="text-2xl font-serif text-sattvaDark mb-3">
                        {cls.title}
                      </h3>

                      {/* Tutor */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-sattvaBrown/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-sattvaBrown/60 font-light">Instructor</p>
                          <p className="text-sattvaDark font-medium">{cls.tutor?.name || "Expert Tutor"}</p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-sattvaBrown/30 via-sattvaBrown/10 to-transparent mb-4"></div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Date & Time */}
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-sattvaBrown/60 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs text-sattvaBrown/60 font-light">Date & Time</p>
                            <p className="text-sattvaDark text-sm font-medium">
                              {new Date(cls.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-sattvaBrown/70 text-sm">
                              {new Date(cls.date).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-sattvaBrown/60 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-xs text-sattvaBrown/60 font-light">Duration</p>
                            <p className="text-sattvaDark text-sm font-medium">{cls.duration} minutes</p>
                          </div>
                        </div>
                      </div>

                      {/* Description if available */}
                      {cls.description && (
                        <p className="text-sm text-sattvaBrown/70 font-light leading-relaxed mb-6">
                          {cls.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Section - Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-sattvaBeige/50">
                      {/* Price */}
                      <div>
                        <p className="text-sm text-sattvaBrown/60 font-light mb-1">Class Fee</p>
                        <p className="text-3xl font-serif text-sattvaDark">
                          ₹{cls.price}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handlePay(cls)}
                        disabled={isBooked}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap
                                  ${isBooked 
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                                    : "bg-sattvaBrown text-sattvaCream hover:bg-sattvaDark hover:shadow-lg hover:scale-105 shadow-md"
                                  }`}
                      >
                        {isBooked ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Already Booked
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Book This Class
                          </span>
                        )}
                      </button>

                      {!token && (
                        <p className="text-xs text-sattvaBrown/60 text-center font-light w-full sm:w-auto">
                          Login to book classes
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom hover accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <MockCheckout onSuccess={handleSuccess} onFail={handleFail} />
      )}
    </div>
  );
}