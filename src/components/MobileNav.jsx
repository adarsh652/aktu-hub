import { Link, useLocation } from "react-router-dom";
import { BookOpen, Calculator, LayoutDashboard } from "lucide-react";

function MobileNav() {
  const location = useLocation();

  const navLinks = [
    { name: "Resources", path: "/", icon: BookOpen },
    { name: "CGPA", path: "/cgpa", icon: Calculator },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-16 bg-white/95 backdrop-blur-md border-t border-border-light flex items-center justify-around pb-safe">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.path}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all-fast ${
              isActive ? "text-primary-text font-medium" : "text-secondary-text hover:text-primary-text"
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] tracking-tight">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileNav;
