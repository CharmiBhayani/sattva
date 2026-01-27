import { Link } from "react-router-dom";

export default function TutorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

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
            <div className="w-20 h-20 rounded-full bg-sattvaBrown/10 flex items-center justify-center border-4 border-sattvaBrown/20">
              <svg className="w-10 h-10 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-sattvaDark mb-3">
            Welcome, {user?.name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent mx-auto mb-4"></div>
          <p className="text-sattvaBrown/70 font-light text-lg">
            Tutor Dashboard - Share your yoga expertise with the community
          </p>
        </div>

        {/* Role Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-sattvaBrown/10 border border-sattvaBrown/20 rounded-full">
            <svg className="w-5 h-5 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sattvaDark font-medium">Certified Yoga Tutor</span>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* CREATE LIVE CLASS */}
          <Link
            to="/tutor/create-class"
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                     border border-sattvaBeige/50 p-8 hover:shadow-2xl hover:border-sattvaBrown/30
                     transition-all duration-500 overflow-hidden"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full"></div>
            
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-serif text-sattvaDark mb-2">
              Create Live Class
            </h3>
            <p className="text-sm text-sattvaBrown/70 font-light leading-relaxed">
              Schedule a new live yoga class for users to join
            </p>

            {/* Arrow */}
            <div className="mt-4 flex items-center gap-2 text-green-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
              <span>Get Started</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Bottom hover accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>

          {/* MY CLASSES */}
          <Link
            to="/tutor/my-classes"
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                     border border-sattvaBeige/50 p-8 hover:shadow-2xl hover:border-sattvaBrown/30
                     transition-all duration-500 overflow-hidden"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full"></div>
            
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-serif text-sattvaDark mb-2">
              My Live Classes
            </h3>
            <p className="text-sm text-sattvaBrown/70 font-light leading-relaxed">
              View and manage your upcoming sessions
            </p>

            {/* Arrow */}
            <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
              <span>View Classes</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Bottom hover accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>

          {/* ENROLLED USERS */}
          <Link
            to="/tutor/enrolled-users"
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg 
                     border border-sattvaBeige/50 p-8 hover:shadow-2xl hover:border-sattvaBrown/30
                     transition-all duration-500 overflow-hidden"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full"></div>
            
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-serif text-sattvaDark mb-2">
              Enrolled Users
            </h3>
            <p className="text-sm text-sattvaBrown/70 font-light leading-relaxed">
              See who enrolled for your classes
            </p>

            {/* Arrow */}
            <div className="mt-4 flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
              <span>View Students</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Bottom hover accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>

        
        
      
      </div>
    </div>
  );
}