import { useState, useEffect } from "react";
import SubjectsData from "../Data/SubjectData";
import { Link } from "react-router-dom";
import { ChevronRight, Calculator, RefreshCw, Save, Trash2, Award, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const GRADES = [
  { label: "Select Grade", value: "", point: 0 },
  { label: "O (Outstanding) - 10", value: "O", point: 10 },
  { label: "A+ (Excellent) - 9", value: "A+", point: 9 },
  { label: "A (Very Good) - 8", value: "A", point: 8 },
  { label: "B+ (Good) - 7", value: "B+", point: 7 },
  { label: "B (Above Average) - 6", value: "B", point: 6 },
  { label: "C (Average) - 5", value: "C", point: 5 },
  { label: "P (Pass) - 4", value: "P", point: 4 },
  { label: "F (Fail) - 0", value: "F", point: 0 },
];

function CGPAPage() {
  const { user } = useAuth();
  const [branch, setBranch] = useState("CSE");
  const [selectedSem, setSelectedSem] = useState(1);
  const [courseGrades, setCourseGrades] = useState({});
  const [currentSgpa, setCurrentSgpa] = useState(null);
  const [loadingDb, setLoadingDb] = useState(false);
  
  // Direct direct input or course-wise modes
  const [calculationMode, setCalculationMode] = useState("course"); // "course" or "direct"
  const [directSgpaInputs, setDirectSgpaInputs] = useState({
    1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: ""
  });

  // Saved GPA data
  const [savedGpas, setSavedGpas] = useState({});

  // Load subject list for current semester
  const currentSubjects = SubjectsData.filter(
    (sub) => sub.semester === Number(selectedSem) && (sub.branch === branch || sub.branch === "COMMON" || sub.branch === "OPEN")
  );

  // Initialize course values when semester/branch changes
  useEffect(() => {
    const initialGrades = {};
    currentSubjects.forEach((sub) => {
      initialGrades[sub.id] = "";
    });
    setCourseGrades(initialGrades);
    setCurrentSgpa(null);
  }, [selectedSem, branch]);

  // Load GPA data on mount or user change
  useEffect(() => {
    const loadGpaData = async () => {
      if (user) {
        setLoadingDb(true);
        try {
          const { data, error } = await supabase
            .from("gpa_records")
            .select("*")
            .eq("user_id", user.id);
          
          if (error) throw error;
          
          const formatted = {};
          const directInputs = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" };
          data.forEach((row) => {
            formatted[row.semester] = {
              sgpa: parseFloat(row.sgpa),
              credits: row.credits,
              type: "calculated"
            };
            directInputs[row.semester] = row.sgpa.toFixed(2);
          });
          setSavedGpas(formatted);
          setDirectSgpaInputs(directInputs);
        } catch (err) {
          console.error("Error loading GPAs from database:", err.message);
        } finally {
          setLoadingDb(false);
        }
      } else {
        // Fallback to localStorage
        const saved = localStorage.getItem("aktu_hub_gpas");
        const parsed = saved ? JSON.parse(saved) : {};
        setSavedGpas(parsed);
        
        const directInputs = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "" };
        Object.keys(parsed).forEach((sem) => {
          directInputs[sem] = parsed[sem].sgpa.toFixed(2);
        });
        setDirectSgpaInputs(directInputs);
      }
    };

    loadGpaData();
  }, [user]);

  // Handle individual course grade selection
  const handleGradeChange = (subjectId, value) => {
    setCourseGrades((prev) => ({
      ...prev,
      [subjectId]: value,
    }));
  };

  // Compute SGPA dynamically from course grades
  const calculateSgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    currentSubjects.forEach((sub) => {
      const gradeVal = courseGrades[sub.id];
      if (gradeVal) {
        const gradeObj = GRADES.find((g) => g.value === gradeVal);
        const points = gradeObj ? gradeObj.point : 0;
        
        // Only count subjects with credits > 0 for GPA calculations
        if (sub.credits > 0) {
          totalPoints += points * sub.credits;
          totalCredits += sub.credits;
        }
      }
    });

    if (totalCredits === 0) {
      setCurrentSgpa(0);
      return;
    }

    const calculated = totalPoints / totalCredits;
    setCurrentSgpa(calculated.toFixed(2));
  };

  // Save current SGPA (or direct input) to storage
  const handleSaveSgpa = async () => {
    if (calculationMode === "course") {
      if (currentSgpa === null) return;
      const semVal = Number(selectedSem);
      const sgpaVal = parseFloat(currentSgpa);
      const semCredits = currentSubjects.reduce((acc, s) => acc + s.credits, 0);

      const updated = {
        ...savedGpas,
        [semVal]: {
          sgpa: sgpaVal,
          credits: semCredits,
          type: "calculated"
        }
      };
      setSavedGpas(updated);

      if (user) {
        try {
          const { error } = await supabase
            .from("gpa_records")
            .upsert({
              user_id: user.id,
              semester: semVal,
              sgpa: sgpaVal,
              credits: semCredits
            }, { onConflict: "user_id, semester" });
          if (error) throw error;
        } catch (err) {
          console.error("Error saving GPA to database:", err.message);
        }
      } else {
        localStorage.setItem("aktu_hub_gpas", JSON.stringify(updated));
      }
    } else {
      const updated = { ...savedGpas };
      const recordsToUpsert = [];

      Object.keys(directSgpaInputs).forEach((sem) => {
        const val = directSgpaInputs[sem];
        const semVal = Number(sem);
        if (val !== "" && !isNaN(val)) {
          const sgpaVal = parseFloat(val);
          updated[semVal] = {
            sgpa: sgpaVal,
            credits: 22, 
            type: "direct"
          };
          if (user) {
            recordsToUpsert.push({
              user_id: user.id,
              semester: semVal,
              sgpa: sgpaVal,
              credits: 22
            });
          }
        } else {
          delete updated[semVal];
        }
      });
      setSavedGpas(updated);

      if (user) {
        try {
          // Clear previous records and insert new batch for direct mode
          const { error: deleteError } = await supabase
            .from("gpa_records")
            .delete()
            .eq("user_id", user.id);
          
          if (deleteError) throw deleteError;

          if (recordsToUpsert.length > 0) {
            const { error: insertError } = await supabase
              .from("gpa_records")
              .insert(recordsToUpsert);
            if (insertError) throw insertError;
          }
        } catch (err) {
          console.error("Error syncing direct GPAs to database:", err.message);
        }
      } else {
        localStorage.setItem("aktu_hub_gpas", JSON.stringify(updated));
      }
    }
  };

  // Handle direct input values
  const handleDirectInput = (sem, value) => {
    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 10)) {
      setDirectSgpaInputs((prev) => ({
        ...prev,
        [sem]: value,
      }));
    }
  };

  // Clear specific semester
  const deleteSemesterGpa = async (sem) => {
    const semVal = Number(sem);
    const updated = { ...savedGpas };
    delete updated[semVal];
    setSavedGpas(updated);

    if (user) {
      try {
        const { error } = await supabase
          .from("gpa_records")
          .delete()
          .eq("user_id", user.id)
          .eq("semester", semVal);
        if (error) throw error;
      } catch (err) {
        console.error("Error deleting GPA from database:", err.message);
      }
    } else {
      localStorage.setItem("aktu_hub_gpas", JSON.stringify(updated));
    }

    setDirectSgpaInputs((prev) => ({
      ...prev,
      [semVal]: ""
    }));
  };

  // Clear all saved data
  const resetAllGpas = async () => {
    setSavedGpas({});
    setDirectSgpaInputs({
      1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: ""
    });
    setCurrentSgpa(null);

    if (user) {
      try {
        const { error } = await supabase
          .from("gpa_records")
          .delete()
          .eq("user_id", user.id);
        if (error) throw error;
      } catch (err) {
        console.error("Error clearing GPAs from database:", err.message);
      }
    } else {
      localStorage.removeItem("aktu_hub_gpas");
    }
  };

  // Calculate Cumulative CGPA (credit-weighted average)
  const calculateCgpa = () => {
    const semesters = Object.keys(savedGpas);
    if (semesters.length === 0) return null;

    let totalSgpaCredits = 0;
    let totalCredits = 0;

    semesters.forEach((sem) => {
      const record = savedGpas[sem];
      totalSgpaCredits += record.sgpa * record.credits;
      totalCredits += record.credits;
    });

    if (totalCredits === 0) return 0;
    return (totalSgpaCredits / totalCredits).toFixed(2);
  };

  const finalCgpa = calculateCgpa();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow mt-20 md:mt-24">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-secondary-text">
        <Link to="/" className="hover:text-primary-text transition-all-fast">Home</Link>
        <ChevronRight size={14} />
        <span className="text-primary-text font-medium">CGPA Calculator</span>
      </div>

      {/* Offline Mode Banner */}
      {!user && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-custom-lg flex justify-between items-center text-xs text-blue-800">
          <div className="flex gap-2.5 items-center">
            <Info size={16} className="flex-shrink-0" />
            <p>
              You are currently using <strong>Offline Mode</strong>. Your calculated GPAs are saved locally in this browser. <Link to="/auth" className="underline font-semibold hover:text-blue-950">Sign In</Link> to back them up to your cloud profile!
            </p>
          </div>
        </div>
      )}

      <div className="border-b border-border-light pb-6 mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary-text mb-2">
          CGPA / SGPA Calculator
        </h1>
        <p className="text-secondary-text text-sm md:text-base">
          Preloaded with standard AKTU syllabus course matrices. Track and compute your grades in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mode Switcher */}
          <div className="bg-bg-secondary p-1 rounded-custom-lg border border-border-light flex gap-1">
            <button
              onClick={() => setCalculationMode("course")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all-fast cursor-pointer ${
                calculationMode === "course"
                  ? "bg-white text-primary-text shadow-sm"
                  : "text-secondary-text hover:text-primary-text"
              }`}
            >
              Course-wise Grades
            </button>
            <button
              onClick={() => setCalculationMode("direct")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all-fast cursor-pointer ${
                calculationMode === "direct"
                  ? "bg-white text-primary-text shadow-sm"
                  : "text-secondary-text hover:text-primary-text"
              }`}
            >
              Direct SGPA Log
            </button>
          </div>

          {calculationMode === "course" ? (
            <div className="bg-white border border-border-light rounded-custom-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-secondary-text uppercase mb-2">Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full p-2.5 rounded-custom-lg border border-border-light bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark focus:border-transparent transition-all-fast"
                  >
                    <option value="CSE">Computer Science & Engineering</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-secondary-text uppercase mb-2">Semester</label>
                  <select
                    value={selectedSem}
                    onChange={(e) => setSelectedSem(e.target.value)}
                    className="w-full p-2.5 rounded-custom-lg border border-border-light bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark focus:border-transparent transition-all-fast"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject rows */}
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-semibold text-secondary-text uppercase tracking-wider mb-2 border-b border-border-light pb-2">
                  Select Grade per Course
                </h3>
                {currentSubjects.map((sub) => (
                  <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2 border-b border-border-light/60 last:border-0">
                    <div className="flex-grow">
                      <div className="text-sm font-semibold text-primary-text">{sub.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono text-secondary-text bg-bg-secondary px-1.5 py-0.5 rounded border border-border-light">
                          {sub.code}
                        </span>
                        <span className="text-[11px] text-secondary-text">
                          {sub.credits > 0 ? `${sub.credits} Credits` : "Non-credit Audit"}
                        </span>
                      </div>
                    </div>
                    <select
                      value={courseGrades[sub.id] || ""}
                      onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                      className="p-2 border border-border-light rounded-custom-lg bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark min-w-[160px] transition-all-fast"
                    >
                      {GRADES.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Action and Calculations Display */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-bg-secondary p-4 rounded-custom-lg border border-border-light">
                <div className="text-left w-full sm:w-auto">
                  <div className="text-xs font-semibold text-secondary-text uppercase">Calculated SGPA</div>
                  <div className="text-3xl font-extrabold text-primary-text mt-1">
                    {currentSgpa !== null ? currentSgpa : "—"}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={calculateSgpa}
                    className="px-4 py-2 border border-border-light bg-white text-secondary-text font-medium text-sm rounded-custom-lg hover:text-primary-text transition-all-fast flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <RefreshCw size={16} />
                    <span>Calculate</span>
                  </button>
                  <button
                    onClick={handleSaveSgpa}
                    disabled={currentSgpa === null}
                    className={`px-4 py-2 font-medium text-sm rounded-custom-lg flex items-center gap-1.5 cursor-pointer shadow-sm transition-all-fast ${
                      currentSgpa === null
                        ? "bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-200"
                        : "bg-btn-dark text-white hover:bg-neutral-800"
                    }`}
                  >
                    <Save size={16} />
                    <span>Save SGPA</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Direct SGPA Input Form */
            <div className="bg-white border border-border-light rounded-custom-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-secondary-text uppercase tracking-wider mb-4 border-b border-border-light pb-2">
                Enter SGPA directly for completed semesters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <div key={s} className="flex items-center gap-4 bg-bg-secondary p-3 rounded-custom-lg border border-border-light">
                    <span className="text-sm font-semibold text-primary-text min-w-[60px]">Sem {s}</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="Enter SGPA (e.g. 8.24)"
                      value={directSgpaInputs[s] !== undefined ? directSgpaInputs[s] : (savedGpas[s]?.sgpa || "")}
                      onChange={(e) => handleDirectInput(s, e.target.value)}
                      className="flex-grow p-2 border border-border-light rounded-md bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark transition-all-fast"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={resetAllGpas}
                  className="px-4 py-2 border border-border-light bg-white text-secondary-text font-medium text-sm rounded-custom-lg hover:text-primary-text hover:bg-bg-secondary transition-all-fast flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={16} />
                  <span>Clear All</span>
                </button>
                <button
                  onClick={handleSaveSgpa}
                  className="px-4 py-2 bg-btn-dark text-white font-medium text-sm rounded-custom-lg hover:bg-neutral-800 transition-all-fast flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Save size={16} />
                  <span>Save Values</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Dashboard Summary & CGPA */}
        <div className="bg-white border border-border-light rounded-custom-xl p-6 shadow-sm space-y-6">
          <div className="text-center p-6 bg-bg-secondary rounded-custom-lg border border-border-light flex flex-col items-center">
            <Award size={36} className="text-primary-text mb-2" />
            <span className="text-xs font-semibold text-secondary-text uppercase">Overall CGPA</span>
            <div className="text-4xl font-black text-primary-text mt-1">
              {finalCgpa !== null ? finalCgpa : "—"}
            </div>
            <p className="text-[11px] text-secondary-text mt-2 leading-tight">
              Calculated using standard university credit-weighted averages.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-border-light pb-2">
              <h3 className="text-xs font-semibold text-secondary-text uppercase tracking-wider">
                Logged Semesters
              </h3>
              {Object.keys(savedGpas).length > 0 && (
                <button
                  onClick={resetAllGpas}
                  className="text-[11px] text-secondary-text hover:text-error flex items-center gap-0.5 cursor-pointer bg-transparent border-0"
                >
                  <Trash2 size={12} />
                  <span>Reset Logs</span>
                </button>
              )}
            </div>

            {Object.keys(savedGpas).length === 0 ? (
              <div className="text-center py-6 text-xs text-secondary-text">
                {loadingDb ? "Loading database logs..." : "No semesters logged yet. Save an SGPA calculation to display here."}
              </div>
            ) : (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => {
                  const record = savedGpas[s];
                  if (!record) return null;
                  return (
                    <div key={s} className="flex justify-between items-center p-2.5 rounded-lg bg-bg-secondary border border-border-light/60 text-xs">
                      <div>
                        <span className="font-semibold text-primary-text">Semester {s}</span>
                        <span className="text-[10px] text-secondary-text ml-1.5">
                          ({record.credits} Credits)
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-primary-text">{record.sgpa.toFixed(2)}</span>
                        <button
                          onClick={() => deleteSemesterGpa(s)}
                          className="text-secondary-text hover:text-error transition-all-fast cursor-pointer bg-transparent border-0"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-custom-lg flex gap-3 text-xs text-blue-800">
            <Info size={18} className="flex-shrink-0 mt-0.5" />
            <p className="leading-normal">
              Logged GPAs automatically sync with your **OneView Mirror Dashboard** to visualize your academic growth over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CGPAPage;