import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, FileText, HelpCircle, FileSpreadsheet, FlaskConical, Book, ArrowUpRight } from "lucide-react";
import resources from "../Data/resources";
import { supabase } from "../supabaseClient";

function SubjectPage() {
  const { id, subject } = useParams();
  const [subjectData, setSubjectData] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Format subject name from URL slug
  const subjectName = subject
    ? subject
        .split("-")
        .map((word) => {
          const lower = word.toLowerCase();
          if (lower === "and" || lower === "of") return lower;
          if (lower === "i") return "I";
          if (lower === "ii") return "II";
          if (lower === "iii") return "III";
          if (lower === "iv") return "IV";
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ")
    : "";

  const slug = subject ? subject.toLowerCase().replaceAll(" ", "-").replace(/[^a-z0-9-]/g, "") : "";
  const rawSlug = subject ? subject.toLowerCase() : "";

  // Query resources from Supabase
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const formattedName = subject.replaceAll("-", " ");
        
        // Find subject and nested resources
        const { data: dbSubject, error } = await supabase
          .from("subjects")
          .select("*, resources(*)")
          .ilike("subject_name", formattedName)
          .maybeSingle();

        if (error) throw error;

        if (dbSubject && dbSubject.resources && dbSubject.resources.length > 0) {
          const formattedRes = {};
          dbSubject.resources.forEach(r => {
            formattedRes[r.resource_type] = r.storage_url;
          });
          setSubjectData(formattedRes);
        } else {
          // Fallback to local files list
          const localData = resources[slug] || resources[rawSlug] || {};
          setSubjectData(localData);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local files:", err.message);
        const localData = resources[slug] || resources[rawSlug] || {};
        setSubjectData(localData);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [subject, id, slug, rawSlug]);

  const resourceTypes = [
    {
      key: "notes",
      name: "Lecture Notes",
      desc: "Handwritten and typed lecture slides",
      icon: FileText,
      url: subjectData.notes,
    },
    {
      key: "pyqs",
      name: "Previous Year Papers",
      desc: "AKTU end-semester question papers",
      icon: HelpCircle,
      url: subjectData.pyqs,
    },
    {
      key: "syllabus",
      name: "Official Syllabus",
      desc: "University curriculum and structure",
      icon: FileSpreadsheet,
      url: subjectData.syllabus,
    },
    {
      key: "labFiles",
      name: "Lab Experiments",
      desc: "Lab manuals and code records",
      icon: FlaskConical,
      url: subjectData.labFiles,
    },
    {
      key: "books",
      name: "Reference Books",
      desc: "Recommended textbooks & references",
      icon: Book,
      url: subjectData.books,
      isFuture: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow mt-20 md:mt-24">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-secondary-text">
        <Link to="/" className="hover:text-primary-text transition-all-fast">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/semester/${id}`} className="hover:text-primary-text transition-all-fast">Semester {id}</Link>
        <ChevronRight size={14} />
        <span className="text-primary-text font-medium">{subjectName}</span>
      </div>

      {/* Header */}
      <div className="border-b border-border-light pb-6 mb-10">
        <span className="text-xs font-semibold tracking-wider uppercase text-secondary-text">
          Subject Resources
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-primary-text mt-1">
          {subjectName}
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-16 text-secondary-text text-sm">
          Loading file downloads...
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceTypes.map((res) => {
            const Icon = res.icon;
            const hasLink = res.url && res.url.trim() !== "";

            if (hasLink) {
              return (
                <a
                  key={res.key}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-premium group p-6 flex flex-col justify-between min-h-[160px] hover:border-btn-dark focus:outline-none focus:ring-2 focus:ring-btn-dark focus:ring-offset-2"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2.5 bg-bg-secondary rounded-lg text-primary-text group-hover:bg-btn-dark group-hover:text-white transition-all-fast">
                        <Icon size={20} />
                      </div>
                      <ArrowUpRight size={16} className="text-secondary-text group-hover:text-primary-text transition-all-fast transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <h3 className="text-lg font-bold text-primary-text mb-1">{res.name}</h3>
                    <p className="text-sm text-secondary-text leading-snug">{res.desc}</p>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-primary-text group-hover:underline flex items-center gap-1">
                    View Resource
                  </div>
                </a>
              );
            } else {
              /* Disabled / Coming soon state */
              return (
                <div
                  key={res.key}
                  className="border border-dashed border-border-light bg-bg-secondary/40 rounded-custom-lg p-6 flex flex-col justify-between min-h-[160px] opacity-75"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2.5 bg-bg-secondary rounded-lg text-secondary-text">
                        <Icon size={20} />
                      </div>
                      {res.isFuture && (
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-secondary-text bg-white px-2 py-0.5 rounded border border-border-light">
                          Future
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-secondary-text mb-1">{res.name}</h3>
                    <p className="text-sm text-secondary-text/80 leading-snug">{res.desc}</p>
                  </div>
                  <div className="mt-4 text-xs font-medium text-secondary-text/70 flex items-center gap-1.5">
                    <span>📂</span>
                    <span>Coming soon</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default SubjectPage;