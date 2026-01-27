import { useEffect, useState } from "react";
import { getTutorEnrollments } from "../services/bookingApi";

export default function EnrolledUsers() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTutorEnrollments(token)
      .then(setData)
      .finally(() => setLoading(false));
  }, [token]);

  // Group enrollments by class
  const groupedByClass = data.reduce((acc, enrollment) => {
    const classId = enrollment.liveClass._id;
    if (!acc[classId]) {
      acc[classId] = {
        class: enrollment.liveClass,
        students: []
      };
    }
    acc[classId].students.push(enrollment.user);
    return acc;
  }, {});

  const classes = Object.values(groupedByClass);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sattvaCream via-sattvaBeige/20 to-sattvaCream flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading enrollments...</p>
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

      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-sattvaBrown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">Enrolled Students</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light">Students who have enrolled in your classes</p>
        </div>

        {/* Empty State */}
        {data.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-2xl font-serif text-sattvaDark mb-3">No Enrollments Yet</h3>
            <p className="text-sattvaBrown/60 mb-6 font-light">
              Students will appear here once they enroll in your classes
            </p>
          </div>
        ) : (
          <>
            {/* Total Stats */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-sattvaBeige/50 p-6 text-center">
                <div className="text-4xl font-serif text-sattvaDark mb-2">{classes.length}</div>
                <p className="text-sm text-sattvaBrown/70 font-light">Classes with Enrollments</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-sattvaBeige/50 p-6 text-center">
                <div className="text-4xl font-serif text-sattvaDark mb-2">{data.length}</div>
                <p className="text-sm text-sattvaBrown/70 font-light">Total Students Enrolled</p>
              </div>
            </div>

            {/* Enrollments by Class */}
            <div className="space-y-6">
              {classes.map((item, idx) => {
                const classDate = new Date(item.class.date);
                
                return (
                  <div
                    key={idx}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                             border border-sattvaBeige/50 hover:shadow-2xl hover:border-sattvaBrown/30
                             transition-all duration-500 overflow-hidden"
                  >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sattvaBrown/10 to-transparent rounded-bl-full"></div>
                    
                    {/* Class Header */}
                    <div className="p-6 border-b border-sattvaBeige/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-serif text-sattvaDark mb-2">
                            {item.class.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-sattvaBrown/70">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {classDate.toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {classDate.toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>
                        
                        {/* Student Count Badge */}
                        <div className="px-4 py-2 bg-sattvaBrown/10 border border-sattvaBrown/20 rounded-full flex items-center gap-2">
                          <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-medium text-sattvaDark">{item.students.length} {item.students.length === 1 ? 'Student' : 'Students'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Students List */}
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-sattvaBrown mb-4 uppercase tracking-wider">
                        Enrolled Students
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.students.map((student, studentIdx) => (
                          <div
                            key={studentIdx}
                            className="flex items-center gap-3 p-4 bg-sattvaCream/30 rounded-xl border border-sattvaBeige/50
                                     hover:bg-sattvaCream/50 transition-all duration-300"
                          >
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-sattvaBrown/10 flex items-center justify-center flex-shrink-0">
                              <svg className="w-6 h-6 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            
                            {/* Student Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sattvaDark font-medium truncate">
                                {student.name}
                              </p>
                              <p className="text-sm text-sattvaBrown/70 truncate">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
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