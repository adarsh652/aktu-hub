import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-text mb-3">
          Browse by Semester
        </h2>
        <p className="text-secondary-text text-sm md:text-base leading-relaxed">
          Select your semester to discover a tailored repository of study materials, reference books, and academic tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {semesters.map((sem) => (
          <Link
            key={sem.num}
            to={`/semester/${sem.num}`}
            className="bg-white/80 dark:bg-slate-900/40 border border-border-light p-8 rounded-custom-xl hover:bg-white dark:hover:bg-slate-800/80 group transition-all-fast hover:shadow-md hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between min-h-[180px] focus:outline-none focus:ring-2 focus:ring-btn-dark focus:ring-offset-2"
          >
            {/* Top right corner decorative circle */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary-text/5 dark:bg-white/5 rounded-bl-full translate-x-6 -translate-y-6 group-hover:scale-125 transition-transform duration-300"></div>

            <div className="flex justify-between items-center mb-6 relative z-10 w-full">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-bg-secondary text-primary-text border border-border-light dark:bg-slate-800">
                Semester {sem.num}
              </span>
              <div className="w-8 h-8 rounded-full bg-bg-secondary border border-border-light dark:bg-slate-800 flex items-center justify-center group-hover:bg-btn-dark group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors duration-200">
                <ArrowUpRight size={14} />
              </div>
            </div>

            <div className="relative z-10">
              <h4 className="text-lg font-bold text-primary-text mb-2">
                Semester {sem.num}
              </h4>
              <p className="text-xs text-secondary-text leading-relaxed">
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