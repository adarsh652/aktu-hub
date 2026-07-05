import { useParams, Link } from "react-router-dom";
import { ChevronRight, BookOpen, AlertCircle } from "lucide-react";
import SemesterData from "../Data/SemesterData";
import resources from "../Data/resources";

function Semester() {
  const { id } = useParams();
  const semesterNumber = Number(id);

  if (isNaN(semesterNumber) || semesterNumber < 1 || semesterNumber > 8) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <AlertCircle size={48} className="text-error mb-4" />
        <h1 className="text-3xl font-bold text-primary-text mb-2">Semester Not Found</h1>
        <p className="text-secondary-text mb-6">The semester you are looking for does not exist.</p>
        <Link to="/" className="px-5 py-2.5 bg-btn-dark text-white rounded-custom-lg hover:bg-neutral-800 transition-all-fast font-medium">
          Back to Home
        </Link>
      </div>
    );
  }

  const subjects = SemesterData[id] || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-secondary-text">
        <Link to="/" className="hover:text-primary-text transition-all-fast">Home</Link>
        <ChevronRight size={14} />
        <span className="text-primary-text font-medium">Semester {id}</span>
      </div>

      <div className="border-b border-border-light pb-6 mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary-text mb-2">
          Semester {id} Curriculum
        </h1>
        <p className="text-secondary-text text-sm md:text-base">
          Choose a subject to access study notes, previous year question papers (PYQs), and syllabus.
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-16 bg-bg-secondary border border-border-light rounded-custom-xl">
          <span className="text-4xl">📂</span>
          <h3 className="text-lg font-semibold text-primary-text mt-4">No subjects listed</h3>
          <p className="text-secondary-text text-sm mt-1">We are adding curriculum details for this semester soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const rawSlug = subject.toLowerCase().replaceAll(" ", "-");
            const cleanSlug = rawSlug.replace(/[^a-z0-9-]/g, "");
            const subjectResources = resources[cleanSlug] || resources[rawSlug];
            let resourceCount = 0;
            if (subjectResources) {
              resourceCount = Object.values(subjectResources).filter(val => val && val.trim() !== "").length;
            }

            return (
              <Link
                key={subject}
                to={`/semester/${id}/${rawSlug}`}
                className="card-premium group p-6 flex flex-col justify-between min-h-[140px] hover:border-btn-dark focus:outline-none focus:ring-2 focus:ring-btn-dark focus:ring-offset-2"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="p-2 bg-bg-secondary rounded-lg text-secondary-text group-hover:bg-btn-dark group-hover:text-white transition-all-fast">
                      <BookOpen size={16} />
                    </div>
                    <ChevronRight size={16} className="text-secondary-text group-hover:text-primary-text transition-all-fast transform group-hover:translate-x-1 mt-1" />
                  </div>
                  <h3 className="text-base font-bold text-primary-text group-hover:text-black leading-snug mb-2">
                    {subject}
                  </h3>
                </div>
                <span className="text-xs font-medium text-secondary-text">
                  {resourceCount > 0 ? `${resourceCount} Resources available` : "Resources coming soon"}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Semester;
