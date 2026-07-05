import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Semesters() {
  const semesters = [
    { num: 1, label: "First Semester", desc: "Common Foundation courses" },
    { num: 2, label: "Second Semester", desc: "Common Foundation courses" },
    { num: 3, label: "Third Semester", desc: "Core departmental subjects" },
    { num: 4, label: "Fourth Semester", desc: "Core departmental subjects" },
    { num: 5, label: "Fifth Semester", desc: "Advanced core & electives" },
    { num: 6, label: "Sixth Semester", desc: "Advanced core & electives" },
    { num: 7, label: "Seventh Semester", desc: "Specialization & project phase" },
    { num: 8, label: "Eighth Semester", desc: "Specialization & final project" },
  ];

  return (
    <section id="semesters" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-20">
      <h2 className="text-3xl font-bold tracking-tight text-primary-text mb-2">
        Browse by Semester
      </h2>
      <p className="text-secondary-text mb-8 text-sm md:text-base">
        Access year-wise subject listings, syllabi, notes, and question papers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {semesters.map((sem) => (
          <Link
            key={sem.num}
            to={`/semester/${sem.num}`}
            className="card-premium group p-6 flex flex-col justify-between min-h-[140px] hover:border-btn-dark focus:outline-none focus:ring-2 focus:ring-btn-dark focus:ring-offset-2"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-secondary-text">
                  Semester 0{sem.num}
                </span>
                <ChevronRight size={16} className="text-secondary-text group-hover:text-primary-text transition-all-fast transform group-hover:translate-x-1" />
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-1">
                {sem.label}
              </h3>
              <p className="text-xs text-secondary-text leading-snug">
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