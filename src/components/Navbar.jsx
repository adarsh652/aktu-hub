import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, Calculator, LayoutDashboard, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: "Resources", path: "/", icon: BookOpen },
    { name: "CGPA Calculator", path: "/cgpa", icon: Calculator },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 w-full">
      <nav className="max-w-5xl mx-auto glass-panel rounded-full h-16 flex items-center justify-between px-6 md:px-8 border border-border-light shadow-md dark:border-slate-800/80 transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-all-fast select-none">
          <img src="/logo.png" alt="AKTU HUB" className="h-7 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-semibold uppercase tracking-wider transition-all-fast hover:text-btn-dark ${
                  isActive ? "text-btn-dark" : "text-secondary-text"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-bg-light text-secondary-text hover:text-primary-text transition-all-fast cursor-pointer border-0 bg-transparent"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Status / Login Button */}
          {user ? (
            <button
              onClick={signOut}
              className="bg-btn-dark text-white px-5 py-2 rounded-full font-semibold text-xs hover:bg-btn-dark-hover hover:shadow-sm active:scale-95 transition-all cursor-pointer border-0"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-btn-dark text-white px-5 py-2 rounded-full font-semibold text-xs hover:bg-btn-dark-hover hover:shadow-sm active:scale-95 transition-all cursor-pointer text-center block"
            >
              Sign In
            </Link>
          )}

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-primary-text hover:bg-bg-light rounded-full transition-all-fast border-0 bg-transparent md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto glass-panel rounded-2xl p-4 border border-border-light shadow-lg flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all-fast ${
                  isActive
                    ? "bg-bg-light text-btn-dark font-bold"
                    : "text-secondary-text hover:bg-bg-light hover:text-primary-text"
                }`}
              >
                <Icon size={16} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default Navbar;