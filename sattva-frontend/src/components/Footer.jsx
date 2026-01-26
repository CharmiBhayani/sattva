import lotusCurve from "../assets/lotusbg.png"; // thin lotus line

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-sattvaCream to-sattvaBeige/30 mt-20 relative">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-sattvaBeige to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Decorative lotus divider at top */}
        <div className="flex justify-center mb-10">
          <svg className="w-24 h-3 text-sattvaBrown/30" viewBox="0 0 100 12" fill="currentColor">
            <path d="M50 0C50 0 48 4 48 8C48 10 49 11 50 11C51 11 52 10 52 8C52 4 50 0 50 0Z"/>
            <path d="M42 2C42 2 40 5 40 8C40 9.5 41 11 42.5 11C44 11 45 9.5 45 8C45 5 42 2 42 2Z"/>
            <path d="M58 2C58 2 60 5 60 8C60 9.5 59 11 57.5 11C56 11 55 9.5 55 8C55 5 58 2 58 2Z"/>
            <path d="M34 4C34 4 32 6 32 8.5C32 9.5 33 11 34.5 11C36 11 37 9.5 37 8.5C37 6 34 4 34 4Z"/>
            <path d="M66 4C66 4 68 6 68 8.5C68 9.5 67 11 65.5 11C64 11 63 9.5 63 8.5C63 6 66 4 66 4Z"/>
          </svg>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10">
          
          {/* Left - Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <h3 className="font-serif text-2xl text-sattvaDark tracking-wide">Sattva</h3>
            </div>
            <p className="text-sm italic text-sattvaBrown/70 mb-4 font-light">
              A state of wellness
            </p>
            <p className="text-sm leading-relaxed text-sattvaBrown/80 font-light">
              Cultivating mindful living through yoga, awareness, and conscious practices.
            </p>
          </div>

          {/* Right - Connect */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-sattvaDark mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <div className="space-y-3 text-sm">
              <div>
                <a 
                  href="mailto:sattvalife4@gmail.com" 
                  className="text-sattvaBrown hover:text-sattvaDark transition-colors duration-300 inline-flex items-center gap-2 font-light justify-center md:justify-end"
                >
                  <span className="text-base">📧</span>
                  sattvalife4@gmail.com
                </a>
              </div>
              <div className="text-sattvaBrown/80 inline-flex items-center gap-2 font-light justify-center md:justify-end">
                <span className="text-base">📍</span>
                India
              </div>
            </div>
          </div>
        </div>

        {/* Decorative divider line */}
        <div className="h-px bg-gradient-to-r from-transparent via-sattvaBeige/60 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="text-center space-y-3">
          <p className="text-xs text-sattvaBrown/70 font-light">
            © 2026 Sattva • All rights reserved
          </p>
          <p className="italic text-sattvaDark/70 text-sm pt-2 font-light">
            Made with mindfulness ♡
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-sattvaBrown/20 to-transparent"></div>
    </footer>
  );
}