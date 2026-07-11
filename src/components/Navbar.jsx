import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Calculator, Info, LayoutDashboard } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Resources", path: "/", icon: BookOpen },
    { name: "CGPA Calculator", path: "/cgpa", icon: Calculator },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-border-light">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-all-fast select-none">
          <img src="/logo.png" alt="AKTU HUB" className="h-8 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all-fast hover:text-primary-text ${
                  isActive ? "text-primary-text font-semibold" : "text-secondary-text"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 md:hidden text-primary-text hover:bg-bg-secondary rounded-lg transition-all-fast"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer (Collapsible Menu) */}
      {isOpen && (
        <div className="md:hidden border-b border-border-light bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 text-sm py-2.5 px-3 rounded-lg transition-all-fast ${
                  isActive
                    ? "bg-bg-secondary text-primary-text font-semibold"
                    : "text-secondary-text hover:bg-bg-secondary hover:text-primary-text"
                }`}
              >
                <Icon size={18} />
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