import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

function Semesters() {
  const semesters = [
    { num: 1, label: "Semester 1", desc: "Foundational science and mathematics core" },
    { num: 2, label: "Semester 2", desc: "Applied sciences and specialized lab work" },
    { num: 3, label: "Semester 3", desc: "Core departmental engineering subjects" },
    { num: 4, label: "Semester 4", desc: "Advanced technical concepts and theories" },
    { num: 5, label: "Semester 5", desc: "Advanced departmental core modules" },
    { num: 6, label: "Semester 6", desc: "Electives and project initialization phase" },
    { num: 7, label: "Semester 7", desc: "Specialized electives and major projects" },
    { num: 8, label: "Semester 8", desc: "Final semester and professional readiness" },
  ];

  return (
    <section id="semesters" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
      {/* Header with Navigation arrows */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-text mb-3">
            Browse by Semester
          </h2>
          <p className="text-secondary-text text-sm md:text-base leading-relaxed">
            Select your semester to discover a tailored repository of study materials, reference books, and academic tools.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            className="p-3 border border-border-light rounded-full bg-bg-secondary hover:bg-bg-light transition-colors text-secondary-text cursor-pointer"
            aria-label="Previous Page"
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            className="p-3 border border-border-light rounded-full bg-bg-secondary hover:bg-bg-light transition-colors text-secondary-text cursor-pointer"
            aria-label="Next Page"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Grid of Semesters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {semesters.map((sem) => (
          <Link
            key={sem.num}
            to={`/semester/${sem.num}`}
            className="bg-bg-secondary border border-border-light p-8 rounded-custom-xl hover:bg-white dark:hover:bg-slate-800/20 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between min-h-[190px] focus:outline-none focus:ring-2 focus:ring-btn-dark focus:ring-offset-2"
          >
            {/* Curved top-right decoration shape */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-btn-dark/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500 ease-out"></div>

            {/* Top row with badge and arrow button */}
            <div className="flex justify-between items-start mb-6 relative z-10 w-full">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-btn-dark/10 text-btn-dark transition-colors duration-200">
                Semester {sem.num}
              </span>
              <div className="w-8 h-8 rounded-full bg-bg-light text-secondary-text flex items-center justify-center group-hover:bg-btn-dark group-hover:text-white transition-all duration-300 ease-out">
                <ArrowUpRight size={16} />
              </div>
            </div>

            {/* Title and Description */}
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-primary-text mb-2 transition-colors duration-200">
                Semester {sem.num}
              </h4>
              <p className="text-sm text-secondary-text leading-relaxed">
                {sem.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Semesters;