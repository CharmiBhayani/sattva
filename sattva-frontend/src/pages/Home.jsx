import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sattvaDark via-sattvaBrown to-sattvaDark -z-10"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-sattvaBrown/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sattvaCream/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-6 pt-20 pb-32">
        
        {/* Decorative lotus icon */}
        <div className="mb-8 animate-pulse">
          <svg className="w-20 h-20 text-sattvaCream/60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2C12 2 8 6 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 6 12 2 12 2Z" strokeWidth="1.5"/>
            <path d="M12 16C12 16 8 18 6 20M12 16C12 16 16 18 18 20M6 20C6 20 4 18 4 16M18 20C18 20 20 18 20 16" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-serif text-sattvaCream mb-6 tracking-wide leading-tight">
          Welcome to <span className="text-sattvaBeige">Sattva</span>
        </h1>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sattvaBeige to-transparent mb-8"></div>

        {/* Subtitle */}
        <p className="text-sattvaCream/80 text-lg md:text-xl mb-4 max-w-2xl leading-relaxed font-light">
          Build mindful yoga sessions tailored for your energy, time of day, and goals.
        </p>
        <p className="text-sattvaBeige/90 text-xl md:text-2xl font-light italic">
          Relax, breathe & grow.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12">
          <Link
            to="/poses"
            className="group relative px-8 py-4 rounded-2xl bg-sattvaCream text-sattvaDark font-medium shadow-lg 
                     hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Poses
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-sattvaBeige opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link  
            to="/create"
            className="group relative px-8 py-4 rounded-2xl bg-transparent border-2 border-sattvaCream text-sattvaCream font-medium 
                     hover:bg-sattvaCream hover:text-sattvaDark hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Create a Session
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Additional feature hints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl">
          
          {/* Feature 1 */}
          <div className="group p-6 bg-sattvaCream/5 backdrop-blur-sm rounded-2xl border border-sattvaCream/10 hover:border-sattvaCream/30 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🧘‍♀️</div>
            <h3 className="text-sattvaCream font-semibold mb-2 text-lg">Personalized Practice</h3>
            <p className="text-sattvaCream/70 text-sm font-light">
              Tailored yoga sessions for your unique needs and goals
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-6 bg-sattvaCream/5 backdrop-blur-sm rounded-2xl border border-sattvaCream/10 hover:border-sattvaCream/30 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🌸</div>
            <h3 className="text-sattvaCream font-semibold mb-2 text-lg">Mindful Living</h3>
            <p className="text-sattvaCream/70 text-sm font-light">
              Cultivate awareness through conscious practices
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-6 bg-sattvaCream/5 backdrop-blur-sm rounded-2xl border border-sattvaCream/10 hover:border-sattvaCream/30 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-sattvaCream font-semibold mb-2 text-lg">Inner Balance</h3>
            <p className="text-sattvaCream/70 text-sm font-light">
              Find harmony between body, mind, and spirit
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}