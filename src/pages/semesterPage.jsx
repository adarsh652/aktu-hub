import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ChevronRight, 
  BookOpen, 
  AlertCircle,
  ArrowRight,
  FileText,
  FileSpreadsheet,
  Zap,
  Calculator,
  Cpu,
  Settings,
  MessageSquare,
  FlaskConical,
  Plug,
  Code,
  Heart,
  Binary,
  Lightbulb,
  Terminal
} from "lucide-react";
import SemesterData from "../Data/SemesterData";
import resources from "../Data/resources";
import { supabase } from "../supabaseClient";

// Local Subject Metadata for detailed codes, descriptions, and icon bindings
const SUBJECT_METADATA = {
  // Semester 1
  "engineering-physics": {
    code: "BAS-101",
    desc: "Relativistic mechanics, wave optics, electromagnetism, and quantum physics foundations.",
    icon: Zap
  },
  "engineering-mathematics-i": {
    code: "BAS-103",
    desc: "Matrix algebra, differential calculus, multiple integrals, and vector calculus.",
    icon: Calculator
  },
  "fundamentals-of-electronics-engineering": {
    code: "BEC-101",
    desc: "Semiconductor diodes, bipolar junction transistors, operational amplifiers, and digital logic.",
    icon: Cpu
  },
  "fundamentals-of-mechanical-engineering": {
    code: "BME-101",
    desc: "Applied mechanics, thermodynamics, fluid machinery, and engineering materials.",
    icon: Settings
  },
  "soft-skills": {
    code: "BAS-105",
    desc: "Professional communication, vocabulary building, presentation skills, and public speaking.",
    icon: MessageSquare
  },
  
  // Semester 2
  "engineering-chemistry": {
    code: "BAS-202",
    desc: "Atomic molecular structure, spectroscopic techniques, electrochemistry, and water technology.",
    icon: FlaskConical
  },
  "engineering-mathematics-ii": {
    code: "BAS-203",
    desc: "Ordinary differential equations, multivariable calculus, and Laplace transforms.",
    icon: Calculator
  },
  "fundamentals-of-electrical-engineering": {
    code: "BEE-201",
    desc: "DC circuits, AC circuits, magnetic circuits, electrical machines, and measuring instruments.",
    icon: Plug
  },
  "programming-for-problem-solving": {
    code: "BCS-201",
    desc: "Concept of algorithms, C language programming syntax, arrays, pointers, and structures.",
    icon: Code
  },
  "environment-and-ecology": {
    code: "BAS-204",
    desc: "Ecosystems, environmental pollution, solid waste management, and sustainable development.",
    icon: Settings
  },
  
  // Semester 3
  "material-science": {
    code: "KAS-301",
    desc: "Crystal structures, phase diagrams, mechanical properties, and magnetic materials.",
    icon: Settings
  },
  "technical-communication": {
    code: "KAS-302",
    desc: "Technical writing, reports, business letters, technical proposals, and group discussions.",
    icon: MessageSquare
  },
  "data-structure": {
    code: "KCS-301",
    desc: "Arrays, linked lists, stacks, queues, trees, searching/sorting, and graphs.",
    icon: Binary
  },
  "computer-organization-and-architecture": {
    code: "KCS-302",
    desc: "Bus structures, CPU design, arithmetic operations, memory organization, and I/O interface.",
    icon: Cpu
  },
  "discrete-structures-&-theory-of-logic": {
    code: "KCS-303",
    desc: "Sets, relations, functions, algebraic structures, lattices, propositional logic, and trees.",
    icon: Calculator
  },
  "discrete-structures-theory-of-logic": {
    code: "KCS-303",
    desc: "Sets, relations, functions, algebraic structures, lattices, propositional logic, and trees.",
    icon: Calculator
  },
  "cyber-security": {
    code: "KNC-301",
    desc: "Information security, database security, application security, cryptography, and cyber laws.",
    icon: Code
  },
  
  // Semester 4
  "mathematics-iv": {
    code: "KAS-401",
    desc: "Partial differential equations, statistical techniques, and numerical methods.",
    icon: Calculator
  },
  "universal-human-values-and-professional-ethics": {
    code: "KVE-401",
    desc: "Understanding harmony in self, family, society, and nature.",
    icon: Heart
  },
  "operating-system": {
    code: "KCS-401",
    desc: "Study process management, memory allocation, scheduling, and file systems.",
    icon: Binary
  },
  "theory-of-automata-and-formal-languages": {
    code: "KCS-402",
    desc: "Explore formal languages, finite automata, context-free grammars, and Turing machines.",
    icon: Lightbulb
  },
  "object-oriented-programming-with-java": {
    code: "KCS-403",
    desc: "Introduction to OOP paradigms, classes, inheritance, exception handling, and multithreading.",
    icon: Code
  },
  "python-programming": {
    code: "KCS-453",
    desc: "Practical learning of Python syntax, data structures, libraries, and scripting.",
    icon: Terminal
  }
};

function Semester() {
  const { id } = useParams();
  const semesterNumber = Number(id);

  const [subjects, setSubjects] = useState([]);
  const [dbResources, setDbResources] = useState({});
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  if (isNaN(semesterNumber) || semesterNumber < 1 || semesterNumber > 8) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center mt-12">
        <AlertCircle size={48} className="text-error mb-4" />
        <h1 className="text-3xl font-bold text-primary-text mb-2">Semester Not Found</h1>
        <p className="text-secondary-text mb-6">The semester you are looking for does not exist.</p>
        <Link to="/" className="px-5 py-2.5 bg-btn-dark text-white rounded-custom-lg hover:bg-btn-dark-hover transition-all-fast font-medium border-0">
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

        // 2. Fetch resource counts and group by type
        const { data: dbRes, error: resError } = await supabase
          .from("resources")
          .select("*, subjects!inner(*)")
          .eq("subjects.semester", semesterNumber);

        if (resError) throw resError;

        const counts = {};
        if (dbRes && dbRes.length > 0) {
          dbRes.forEach(row => {
            const subjectName = row.subjects.subject_name;
            const slug = subjectName.toLowerCase().replaceAll(" ", "-").replace(/[^a-z0-9-]/g, "");
            const rawSlug = subjectName.toLowerCase().replaceAll(" ", "-");
            const type = row.resource_type; // 'notes', 'pyqs', 'syllabus'
            
            if (!counts[slug]) counts[slug] = { notes: 0, pyqs: 0, syllabus: 0 };
            if (!counts[rawSlug]) counts[rawSlug] = { notes: 0, pyqs: 0, syllabus: 0 };
            
            if (type === "notes") {
              counts[slug].notes++;
              counts[rawSlug].notes++;
            } else if (type === "pyqs") {
              counts[slug].pyqs++;
              counts[rawSlug].pyqs++;
            } else if (type === "syllabus") {
              counts[slug].syllabus++;
              counts[rawSlug].syllabus++;
            }
          });
        }
        setDbResources(counts);
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local files:", err.message);
        setSubjects(SemesterData[semesterNumber] || []);
      } finally {
        setLoading(false);
      }
    };

    loadSubjectsAndResources();
  }, [id, semesterNumber]);

  // Filter subjects based on query input
  const filteredSubjects = subjects.filter(subject => {
    const rawSlug = subject.toLowerCase().replaceAll(" ", "-");
    const metadata = SUBJECT_METADATA[rawSlug] || {};
    const code = metadata.code || "";
    return (
      subject.toLowerCase().includes(filter.toLowerCase()) ||
      code.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow mt-20 md:mt-24">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary-text">
        <Link to="/" className="hover:text-primary-text transition-all-fast">Home</Link>
        <ChevronRight size={12} className="text-secondary-text/60" />
        <span className="hover:text-primary-text transition-all-fast">Semesters</span>
        <ChevronRight size={12} className="text-secondary-text/60" />
        <span className="text-primary-text font-bold">Semester {id}</span>
      </div>

      {/* Hero Header Banner */}
      <div className="p-8 md:p-12 rounded-2xl bg-bg-tertiary border border-border-light text-primary-text mb-12 shadow-sm text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          Semester {id} Curriculum
        </h1>
        <p className="text-secondary-text text-sm md:text-base leading-relaxed max-w-2xl">
          Access comprehensive resources for all core and elective subjects in your {semesterNumber === 1 ? "first" : semesterNumber === 2 ? "second" : semesterNumber === 3 ? "third" : semesterNumber === 4 ? "fourth" : semesterNumber === 5 ? "fifth" : semesterNumber === 6 ? "sixth" : semesterNumber === 7 ? "seventh" : "eighth"} semester. Structured syllabus, hand-written notes, and previous year papers curated for excellence.
        </p>
      </div>

      {/* Section Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-6 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-primary-text">
            Core Subjects
          </h2>
          <span className="px-2.5 py-1 rounded-full bg-btn-dark/10 text-btn-dark text-xs font-bold dark:bg-[#2563EB]/20 dark:text-[#60a5fa]">
            {filteredSubjects.length} Total
          </span>
        </div>
        <div className="max-w-xs w-full">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter subjects by name or code..."
            className="w-full px-4 py-2 border border-border-light rounded-custom-lg bg-bg-secondary text-primary-text placeholder-secondary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark focus:border-transparent transition-all-fast"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-secondary-text text-sm">
          Loading curriculum database...
        </div>
      ) : filteredSubjects.length === 0 ? (
        <div className="text-center py-20 bg-bg-secondary border border-border-light rounded-custom-xl">
          <span className="text-4xl">📂</span>
          <h3 className="text-lg font-semibold text-primary-text mt-4">No matching subjects</h3>
          <p className="text-secondary-text text-sm mt-1">We couldn't find any subjects matching your filter query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject, index) => {
            const rawSlug = subject.toLowerCase().replaceAll(" ", "-");
            const cleanSlug = rawSlug.replace(/[^a-z0-9-]/g, "");
            
            // Get local metadata helper for code, description, and icon
            const metadata = SUBJECT_METADATA[cleanSlug] || SUBJECT_METADATA[rawSlug] || {
              code: `KCS-${id}0${index + 1}`,
              desc: `Access verified curriculum guides, lecture slides, and notes for ${subject}.`,
              icon: BookOpen
            };

            const IconComponent = metadata.icon;

            // Fetch dynamic resource counts
            let notesCount = 0;
            let pyqsCount = 0;
            let syllabusCount = 0;

            const resData = dbResources[cleanSlug] || dbResources[rawSlug];
            if (resData) {
              notesCount = resData.notes || 0;
              pyqsCount = resData.pyqs || 0;
              syllabusCount = resData.syllabus || 0;
            } else {
              // Fallback to local indicator configs
              const localRes = resources[cleanSlug] || resources[rawSlug];
              if (localRes) {
                notesCount = localRes.notes ? 1 : 0;
                pyqsCount = localRes.pyqs ? 1 : 0;
                syllabusCount = localRes.syllabus ? 1 : 0;
              }
            }

            return (
              <div
                key={subject}
                className="bg-bg-secondary border border-border-light rounded-custom-xl p-6 flex flex-col justify-between min-h-[280px] relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
              >
                <div>
                  {/* Top line with Icon and Subject Code */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2.5 bg-btn-dark/10 text-btn-dark rounded-custom-lg dark:bg-[#2563EB]/10 dark:text-[#60a5fa]">
                      <IconComponent size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-bg-light border border-border-light text-secondary-text uppercase">
                      {metadata.code}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-primary-text mb-2 line-clamp-1">
                    {subject}
                  </h3>
                  <p className="text-xs text-secondary-text leading-relaxed mb-4 line-clamp-2">
                    {metadata.desc}
                  </p>
                </div>

                {/* Resource statistics and Action button */}
                <div className="mt-4 border-t border-border-light/50 pt-4 space-y-4">
                  <div className="flex justify-between items-center text-xs text-secondary-text">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-secondary-text/75" />
                      <span>{notesCount} Notes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText size={14} className="text-secondary-text/75" />
                      <span>{pyqsCount} PYQs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileSpreadsheet size={14} className="text-secondary-text/75" />
                      <span>{syllabusCount} Syllabus</span>
                    </div>
                  </div>

                  <Link
                    to={`/semester/${id}/${rawSlug}`}
                    className="w-full py-2.5 bg-btn-dark hover:bg-btn-dark-hover text-white rounded-custom-lg font-semibold text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border-0"
                  >
                    <span>View Resources</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Semester;
