import { Link } from "react-router-dom";
import { BookOpen, FileText, FileSpreadsheet, Calculator as CalcIcon } from "lucide-react";

function Resources() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="resources" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-text mb-2">
          Academic Resources
        </h2>
        <p className="text-secondary-text text-sm md:text-base">
          Discover hand-curated materials, exam papers, and GPA tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Notes (Large Bento) */}
        <button
          onClick={() => scrollToSection("semesters")}
          className="md:col-span-2 md:row-span-2 bento-card glass-panel rounded-custom-xl p-8 flex flex-col justify-end text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-btn-dark border border-border-light bg-white/45 dark:bg-slate-900/40 min-h-[280px] md:min-h-[400px]"
        >
          <div className="w-14 h-14 bg-blue-700 dark:bg-blue-600 rounded-custom-lg flex items-center justify-center text-white mb-6 shadow-md transition-all-fast group-hover:scale-105">
            <BookOpen size={28} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-primary-text mb-3">Notes</h3>
          <p className="text-secondary-text text-sm md:text-base leading-relaxed">
            Access high-quality handwritten and standard lecture notes curated specifically for your university curriculum.
          </p>
        </button>

        {/* PYQs (Tall/Medium) */}
        <button
          onClick={() => scrollToSection("semesters")}
          className="md:col-span-2 md:row-span-1 bento-card glass-panel rounded-custom-xl p-8 flex items-center gap-6 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-btn-dark border border-border-light bg-white/45 dark:bg-slate-900/40"
        >
          <div className="w-12 h-12 bg-teal-600 dark:bg-teal-500 rounded-custom-lg flex items-center justify-center text-white shrink-0 shadow-sm transition-all-fast group-hover:scale-105">
            <FileText size={22} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-text mb-1">Previous Year Papers</h3>
            <p className="text-secondary-text text-xs md:text-sm">
              Organized by year and subject for efficient semester exam preparation.
            </p>
          </div>
        </button>

        {/* Syllabus */}
        <button
          onClick={() => scrollToSection("semesters")}
          className="md:col-span-1 md:row-span-1 bento-card glass-panel rounded-custom-xl p-8 flex flex-col justify-between text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-btn-dark border border-border-light bg-white/45 dark:bg-slate-900/40 min-h-[180px]"
        >
          <div className="w-10 h-10 bg-bg-secondary rounded-custom-lg flex items-center justify-center text-primary-text mb-4 border border-border-light transition-all-fast group-hover:bg-btn-dark group-hover:text-white">
            <FileSpreadsheet size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-text mb-1">Syllabus</h3>
            <p className="text-secondary-text text-xs leading-snug">
              Latest session engineering curriculum guides.
            </p>
          </div>
        </button>

        {/* Calculator */}
        <Link
          to="/cgpa"
          className="md:col-span-1 md:row-span-1 bento-card glass-panel rounded-custom-xl p-8 flex flex-col justify-between text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-btn-dark border border-border-light bg-white/45 dark:bg-slate-900/40 min-h-[180px]"
        >
          <div className="w-10 h-10 bg-bg-secondary rounded-custom-lg flex items-center justify-center text-primary-text mb-4 border border-border-light transition-all-fast group-hover:bg-btn-dark group-hover:text-white">
            <CalcIcon size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-text mb-1">Calculator</h3>
            <p className="text-secondary-text text-xs leading-snug">
              Accurate SGPA/CGPA calculations with credit weights.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Resources;