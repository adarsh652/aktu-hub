import { Link } from "react-router-dom";
import { BookOpen, FileText, FileSpreadsheet, Calculator } from "lucide-react";

function Resources() {
  const resources = [
    { name: "Notes", desc: "Handwritten & lecture notes", icon: BookOpen, action: () => scrollToSection("semesters") },
    { name: "PYQs", desc: "Previous year question papers", icon: FileText, action: () => scrollToSection("semesters") },
    { name: "Syllabus", desc: "Official university syllabus", icon: FileSpreadsheet, action: () => scrollToSection("semesters") },
    { name: "CGPA Calculator", desc: "Calculate your SGPA and CGPA", icon: Calculator, link: "/cgpa" }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="resources" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-20">
      <h2 className="text-3xl font-bold tracking-tight text-primary-text mb-2">
        Academic Resources
      </h2>
      <p className="text-secondary-text mb-8 text-sm md:text-base">
        Select a resource type below or browse by semester.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((res) => {
          const Icon = res.icon;
          const CardContent = (
            <div className="flex flex-col items-start p-6 text-left h-full">
              <div className="p-3 bg-bg-secondary rounded-custom-lg border border-border-light text-primary-text mb-4 transition-all-fast group-hover:bg-btn-dark group-hover:text-white">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-primary-text mb-1">{res.name}</h3>
              <p className="text-sm text-secondary-text leading-snug">{res.desc}</p>
            </div>
          );

          return res.link ? (
            <Link
              key={res.name}
              to={res.link}
              className="card-premium group cursor-pointer block h-full focus:outline-none focus:ring-2 focus:ring-btn-dark focus:ring-offset-2"
            >
              {CardContent}
            </Link>
          ) : (
            <button
              key={res.name}
              onClick={res.action}
              className="card-premium group cursor-pointer block text-left w-full h-full focus:outline-none focus:ring-2 focus:ring-btn-dark focus:ring-offset-2"
            >
              {CardContent}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Resources;