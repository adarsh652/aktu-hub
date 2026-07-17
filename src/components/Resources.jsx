import { Link } from "react-router-dom";
import { BookOpen, FileText, FileSpreadsheet, Calculator as CalcIcon, ArrowRight } from "lucide-react";

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
        <div
          className="md:col-span-2 md:row-span-2 bento-card rounded-custom-xl p-8 flex flex-col justify-between text-left group min-h-[280px] md:min-h-[400px] overflow-hidden"
        >
          {/* Top content: Icon and Description */}
          <div>
            <div className="bento-icon-container w-12 h-12 bg-btn-dark rounded-custom-lg flex items-center justify-center text-btn-text mb-6 shadow-sm">
              <BookOpen size={24} strokeWidth={1.5} />
            </div>
            <h3 className="bento-title text-2xl font-bold text-primary-text mb-3">Notes</h3>
            <p className="text-secondary-text text-sm leading-relaxed">
              Access high-quality handwritten and standard lecture notes curated specifically for your university curriculum.
            </p>
          </div>

          {/* Bottom content: Divider, Stats, Grid, and CTA */}
          <div className="mt-6 pt-5 border-t border-border-light/60">
            {/* Statistic badge */}
            <div className="text-xs font-semibold text-secondary-text mb-4 flex items-center gap-1.5">
              <span>📚</span>
              <span>2500+ Notes Available</span>
            </div>

            {/* Grid of semesters and Browse CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-secondary-text block">
                  Quick Access by Semester
                </span>
                <div className="grid grid-cols-4 gap-1.5 w-64 max-w-full">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <button
                      key={sem}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSection("semesters");
                      }}
                      className="py-1 text-[10px] font-bold rounded bg-bg-light border border-border-light text-primary-text hover:bg-btn-dark hover:text-btn-text hover:border-transparent transition-all duration-200 cursor-pointer text-center"
                    >
                      Sem {sem}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollToSection("semesters")}
                className="flex items-center gap-1 text-xs font-bold text-btn-dark hover:underline group/cta cursor-pointer shrink-0 self-end mb-1 border-0 bg-transparent"
              >
                <span>Browse Notes</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </div>
        </div>

        {/* PYQs (Tall/Medium) */}
        <button
          onClick={() => scrollToSection("semesters")}
          className="md:col-span-2 md:row-span-1 bento-card rounded-custom-xl p-8 flex items-center gap-6 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-btn-dark"
        >
          <div className="bento-icon-container w-12 h-12 bg-btn-dark rounded-custom-lg flex items-center justify-center text-btn-text shrink-0 shadow-sm">
            <FileText size={22} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="bento-title text-xl font-bold text-primary-text mb-1">Previous Year Papers</h3>
            <p className="text-secondary-text text-xs md:text-sm">
              Organized by year and subject for efficient semester exam preparation.
            </p>
          </div>
        </button>

        {/* Syllabus */}
        <button
          onClick={() => scrollToSection("semesters")}
          className="md:col-span-1 md:row-span-1 bento-card rounded-custom-xl p-8 flex flex-col justify-between text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-btn-dark min-h-[180px]"
        >
          <div className="bento-icon-container w-10 h-10 bg-bg-tertiary rounded-custom-lg flex items-center justify-center text-primary-text mb-4 border border-border-light">
            <FileSpreadsheet size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="bento-title text-lg font-bold text-primary-text mb-1">Syllabus</h3>
            <p className="text-secondary-text text-xs leading-snug">
              Latest session engineering curriculum guides.
            </p>
          </div>
        </button>

        {/* Calculator */}
        <Link
          to="/cgpa"
          className="md:col-span-1 md:row-span-1 bento-card rounded-custom-xl p-8 flex flex-col justify-between text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-btn-dark min-h-[180px]"
        >
          <div className="bento-icon-container w-10 h-10 bg-bg-tertiary rounded-custom-lg flex items-center justify-center text-primary-text mb-4 border border-border-light">
            <CalcIcon size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="bento-title text-lg font-bold text-primary-text mb-1">Calculator</h3>
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