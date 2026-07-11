import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, BookOpen, AlertCircle } from "lucide-react";
import SemesterData from "../Data/SemesterData";
import resources from "../Data/resources";
import { supabase } from "../supabaseClient";

function Semester() {
  const { id } = useParams();
  const semesterNumber = Number(id);

  const [subjects, setSubjects] = useState([]);
  const [dbResources, setDbResources] = useState({});
  const [loading, setLoading] = useState(true);

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

  // Load subjects and resources
  useEffect(() => {
    const loadSubjectsAndResources = async () => {
      setLoading(true);
      try {
        // 1. Fetch subjects from Supabase
        const { data: dbSubjects, error: subError } = await supabase
          .from("subjects")
          .select("*")
          .eq("semester", semesterNumber);

        if (subError) throw subError;

        let loadedSubjects = [];
        if (dbSubjects && dbSubjects.length > 0) {
          loadedSubjects = dbSubjects.map(sub => sub.subject_name);
          setSubjects(loadedSubjects);
        } else {
          // Fallback to static local data
          loadedSubjects = SemesterData[semesterNumber] || [];
          setSubjects(loadedSubjects);
        }

        // 2. Fetch resource counts
        const { data: dbRes, error: resError } = await supabase
          .from("resources")
          .select("*, subjects!inner(*)")
          .eq("subjects.semester", semesterNumber);

        if (resError) throw resError;

        if (dbRes && dbRes.length > 0) {
          // Format counts by subject name slug
          const counts = {};
          dbRes.forEach(row => {
            const subjectName = row.subjects.subject_name;
            const slug = subjectName.toLowerCase().replaceAll(" ", "-").replace(/[^a-z0-9-]/g, "");
            const rawSlug = subjectName.toLowerCase().replaceAll(" ", "-");
            
            if (!counts[slug]) counts[slug] = 0;
            if (!counts[rawSlug]) counts[rawSlug] = 0;
            
            counts[slug]++;
            counts[rawSlug]++;
          });
          setDbResources(counts);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local files:", err.message);
        setSubjects(SemesterData[semesterNumber] || []);
      } finally {
        setLoading(false);
      }
    };

    loadSubjectsAndResources();
  }, [id, semesterNumber]);

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

      {loading ? (
        <div className="text-center py-16 text-secondary-text text-sm">
          Loading curriculum database...
        </div>
      ) : subjects.length === 0 ? (
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
            
            // Check dynamic db resources count, if empty fallback to local resources.js
            let resourceCount = dbResources[cleanSlug] || dbResources[rawSlug] || 0;
            
            if (resourceCount === 0) {
              const subjectResources = resources[cleanSlug] || resources[rawSlug];
              if (subjectResources) {
                resourceCount = Object.values(subjectResources).filter(val => val && val.trim() !== "").length;
              }
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
