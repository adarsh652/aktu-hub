import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full border-t border-border-light bg-bg-light py-16 mt-auto transition-colors duration-300">
      {/* Top section: Two columns */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-10">
        {/* Left Column: Logo & Tagline */}
        <div className="flex flex-col items-start gap-3">
          <Link to="/" className="flex items-center select-none">
            <img src="/logo.png" alt="AKTU HUB" className="h-6 w-auto object-contain" />
          </Link>
          <p className="text-sm text-secondary-text font-medium">Study smarter.</p>
          <p className="text-xs text-secondary-text mt-1">
            Developed by <span className="font-semibold text-primary-text">Adarsh</span>
          </p>
        </div>

        {/* Right Column: Navigation Links */}
        <div className="flex flex-col md:items-end justify-start gap-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-text opacity-70">
            Navigation
          </span>
          <div className="flex flex-col gap-2.5 text-sm font-medium">
            <Link to="/" className="text-secondary-text hover:text-primary-text transition-colors duration-200 text-left md:text-right">
              Resources
            </Link>
            <Link to="/cgpa" className="text-secondary-text hover:text-primary-text transition-colors duration-200 text-left md:text-right">
              CGPA Calculator
            </Link>
            <a href="#about" className="text-secondary-text hover:text-primary-text transition-colors duration-200 text-left md:text-right">
              About
            </a>
            <a href="#contact" className="text-secondary-text hover:text-primary-text transition-colors duration-200 text-left md:text-right">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section: Divider & Copyright */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-border-light/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-secondary-text">
        <span>© 2026 AKTU Hub • Version 1.0</span>
        <div className="flex items-center gap-3">
          <a href="#privacy" className="hover:text-primary-text transition-colors duration-200">
            Privacy Policy
          </a>
          <span className="text-border-light/60 select-none">•</span>
          <a href="#terms" className="hover:text-primary-text transition-colors duration-200">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;