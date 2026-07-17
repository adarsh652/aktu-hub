import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, LayoutDashboard, User, BookOpen, Award, Trash2, Edit2, Check, BarChart3, LineChart, Plus, LogOut, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

function DashboardPage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [localProfile, setLocalProfile] = useState({
    name: "Offline Student",
    branch: "CSE",
    currentSem: "1",
    email: "offline@domain.com"
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "", branch: "CSE", currentSem: "1", email: ""
  });
  const [chartType, setChartType] = useState("line");

  // Saved GPA data
  const [savedGpas, setSavedGpas] = useState({});
  const [loading, setLoading] = useState(true);

  // Initialize edit form values when profile updates
  useEffect(() => {
    if (user && profile) {
      setEditedProfile({
        name: profile.full_name || "",
        branch: profile.branch_id || "CSE",
        currentSem: String(profile.current_semester || 1),
        email: profile.email || ""
      });
    } else if (!user) {
      // Local offline fallback
      const saved = localStorage.getItem("aktu_hub_profile");
      let parsed = saved ? JSON.parse(saved) : null;
      
      // Auto-detect and wipe old hardcoded placeholders from previous Phase 1 sessions
      if (parsed && (parsed.name === "Adarsh Shukla" || parsed.email === "student@aktu.ac.in")) {
        localStorage.removeItem("aktu_hub_profile");
        parsed = null;
      }
      
      if (!parsed) {
        parsed = { name: "Guest Student", branch: "CSE", currentSem: "1", email: "guest@domain.com" };
      }
      
      setLocalProfile(parsed);
      setEditedProfile({
        name: parsed.name,
        branch: parsed.branch,
        currentSem: String(parsed.currentSem || 1),
        email: parsed.email
      });
    }
  }, [user, profile]);

  // Load GPAs
  useEffect(() => {
    const loadGpas = async () => {
      setLoading(true);
      if (user) {
        try {
          const { data, error } = await supabase
            .from("gpa_records")
            .select("*")
            .eq("user_id", user.id);
          
          if (error) throw error;
          
          const formatted = {};
          data.forEach((row) => {
            formatted[row.semester] = {
              sgpa: parseFloat(row.sgpa),
              credits: row.credits,
              type: "calculated"
            };
          });
          setSavedGpas(formatted);
        } catch (err) {
          console.error("Error fetching GPA logs:", err.message);
        } finally {
          setLoading(false);
        }
      } else {
        const saved = localStorage.getItem("aktu_hub_gpas");
        setSavedGpas(saved ? JSON.parse(saved) : {});
        setLoading(false);
      }
    };

    loadGpas();
  }, [user]);

  const handleProfileSave = async () => {
    if (user) {
      try {
        await updateProfile({
          full_name: editedProfile.name,
          branch_id: editedProfile.branch,
          current_semester: Number(editedProfile.currentSem)
        });
        setIsEditingProfile(false);
      } catch (err) {
        console.error("Error saving database profile:", err.message);
      }
    } else {
      const updated = {
        name: editedProfile.name,
        branch: editedProfile.branch,
        currentSem: editedProfile.currentSem,
        email: editedProfile.email
      };
      setLocalProfile(updated);
      localStorage.setItem("aktu_hub_profile", JSON.stringify(updated));
      setIsEditingProfile(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear offline cache details upon logout to prevent trace leakage
      localStorage.removeItem("aktu_hub_profile");
      localStorage.removeItem("aktu_hub_gpas");
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

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
        console.error("Error deleting record:", err.message);
      }
    } else {
      localStorage.setItem("aktu_hub_gpas", JSON.stringify(updated));
    }
  };

  // Calculations
  const loggedSemesters = Object.keys(savedGpas).map(Number).sort((a, b) => a - b);
  const totalCredits = loggedSemesters.reduce((acc, sem) => acc + (savedGpas[sem]?.credits || 0), 0);

  const calculateCgpa = () => {
    if (loggedSemesters.length === 0) return null;
    let totalSgpaCredits = 0;
    let totalCreditsCount = 0;

    loggedSemesters.forEach((sem) => {
      const record = savedGpas[sem];
      totalSgpaCredits += record.sgpa * record.credits;
      totalCreditsCount += record.credits;
    });

    if (totalCreditsCount === 0) return 0;
    return (totalSgpaCredits / totalCreditsCount).toFixed(2);
  };

  const finalCgpa = calculateCgpa();

  // SVG Chart Sizes
  const width = 600;
  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (sem) => paddingLeft + ((sem - 1) / 7) * chartWidth;

  const minGpaInList = loggedSemesters.length > 0 
    ? Math.min(...loggedSemesters.map(s => savedGpas[s].sgpa)) 
    : 10;
  const yMin = minGpaInList < 4 ? 0 : 4;
  const yMax = 10;

  const getY = (gpa) => {
    const ratio = (gpa - yMin) / (yMax - yMin);
    return paddingTop + (1 - ratio) * chartHeight;
  };

  // Generate SVG Points
  const pointsStr = loggedSemesters
    .map((sem) => `${getX(sem)},${getY(savedGpas[sem].sgpa)}`)
    .join(" ");

  const areaPointsStr = loggedSemesters.length > 0
    ? `${getX(loggedSemesters[0])},${getY(yMin)} ` +
      pointsStr +
      ` ${getX(loggedSemesters[loggedSemesters.length - 1])},${getY(yMin)}`
    : "";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow mt-20 md:mt-24">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2 text-sm text-secondary-text">
        <Link to="/" className="hover:text-primary-text transition-all-fast">Home</Link>
        <ChevronRight size={14} />
        <span className="text-primary-text font-medium">Dashboard</span>
      </div>

      {/* Offline Warning Banner */}
      {!user && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-custom-lg flex justify-between items-center text-xs text-blue-800">
          <div className="flex gap-2.5 items-center">
            <Info size={16} className="flex-shrink-0" />
            <p>
              You are currently viewing an <strong>Offline Profile</strong>. <Link to="/auth" className="underline font-semibold hover:text-blue-950">Sign In</Link> to back up your GPA calculations and keep your records in sync across devices.
            </p>
          </div>
        </div>
      )}

      <div className="border-b border-border-light pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary-text mb-2 flex items-center gap-2.5">
            <LayoutDashboard className="text-primary-text" size={32} />
            <span>OneView Mirror Dashboard</span>
          </h1>
          <p className="text-secondary-text text-sm md:text-base">
            Track your semester results, analyze academic progress, and manage your student profile.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card */}
        <div className="bg-white border border-border-light rounded-custom-xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border-light pb-3">
            <h3 className="text-xs font-semibold text-secondary-text uppercase tracking-wider flex items-center gap-1.5">
              <User size={14} />
              <span>Student Profile</span>
            </h3>
            <button
              onClick={() => {
                if (isEditingProfile) {
                  handleProfileSave();
                } else {
                  setIsEditingProfile(true);
                }
              }}
              className="text-xs font-medium text-primary-text hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-0"
            >
              {isEditingProfile ? (
                <>
                  <Check size={12} />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Edit2 size={12} />
                  <span>Edit</span>
                </>
              )}
            </button>
          </div>

          {isEditingProfile ? (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full p-2 border border-border-light rounded-custom-lg bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark transition-all-fast"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-secondary-text uppercase mb-1">Branch</label>
                  <select
                    value={editedProfile.branch}
                    onChange={(e) => setEditedProfile({ ...editedProfile, branch: e.target.value })}
                    className="w-full p-2 border border-border-light rounded-custom-lg bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark transition-all-fast"
                  >
                    <option value="CSE">CSE</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-secondary-text uppercase mb-1">Semester</label>
                  <select
                    value={editedProfile.currentSem}
                    onChange={(e) => setEditedProfile({ ...editedProfile, currentSem: e.target.value })}
                    className="w-full p-2 border border-border-light rounded-custom-lg bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark transition-all-fast"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Sem {s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-secondary-text uppercase">Name</span>
                <span className="font-bold text-primary-text text-base">
                  {user ? (profile?.full_name || "Guest Student") : localProfile.name}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-secondary-text uppercase">Email</span>
                <span className="text-secondary-text">
                  {user ? (profile?.email || user.email) : localProfile.email}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-secondary-text uppercase">Branch</span>
                  <span className="font-semibold text-primary-text">
                    {user ? (profile?.branch_id || "CSE") : localProfile.branch}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-secondary-text uppercase">Current Semester</span>
                  <span className="font-semibold text-primary-text">
                    Semester {user ? (profile?.current_semester || 1) : localProfile.currentSem}
                  </span>
                </div>
              </div>
            </div>
          )}

          {user && (
            <button
              onClick={handleSignOut}
              className="w-full py-2 border border-error bg-red-50 text-red-700 font-medium text-xs rounded-custom-lg hover:bg-red-100 transition-all-fast flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* Chart and Grid */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Metrics row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-border-light rounded-custom-xl p-4 shadow-sm text-left">
              <span className="text-[10px] font-semibold text-secondary-text uppercase">Calculated CGPA</span>
              <div className="text-2xl md:text-3xl font-black text-primary-text mt-1">
                {finalCgpa !== null ? finalCgpa : "—"}
              </div>
            </div>
            <div className="bg-white border border-border-light rounded-custom-xl p-4 shadow-sm text-left">
              <span className="text-[10px] font-semibold text-secondary-text uppercase">Semesters Logged</span>
              <div className="text-2xl md:text-3xl font-black text-primary-text mt-1">
                {loggedSemesters.length} / 8
              </div>
            </div>
            <div className="bg-white border border-border-light rounded-custom-xl p-4 shadow-sm text-left">
              <span className="text-[10px] font-semibold text-secondary-text uppercase">Credits Earned</span>
              <div className="text-2xl md:text-3xl font-black text-primary-text mt-1">
                {totalCredits}
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white border border-border-light rounded-custom-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-primary-text uppercase tracking-wider">
                GPA Trajectory
              </h3>
              {loggedSemesters.length > 0 && (
                <div className="flex bg-bg-secondary p-0.5 rounded-lg border border-border-light text-xs">
                  <button
                    onClick={() => setChartType("line")}
                    className={`p-1.5 rounded-md transition-all-fast cursor-pointer border-0 ${
                      chartType === "line" ? "bg-white text-primary-text shadow-sm" : "text-secondary-text hover:text-primary-text bg-transparent"
                    }`}
                    title="Line Chart"
                  >
                    <LineChart size={14} />
                  </button>
                  <button
                    onClick={() => setChartType("bar")}
                    className={`p-1.5 rounded-md transition-all-fast cursor-pointer border-0 ${
                      chartType === "bar" ? "bg-white text-primary-text shadow-sm" : "text-secondary-text hover:text-primary-text bg-transparent"
                    }`}
                    title="Bar Chart"
                  >
                    <BarChart3 size={14} />
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="h-48 flex items-center justify-center text-xs text-secondary-text">
                Loading academic progress details...
              </div>
            ) : loggedSemesters.length === 0 ? (
              <div className="h-48 border border-dashed border-border-light rounded-custom-lg flex flex-col items-center justify-center text-center p-6 bg-bg-secondary/40">
                <span className="text-3xl mb-2">📊</span>
                <h4 className="text-sm font-bold text-primary-text">No data to visualize</h4>
                <p className="text-xs text-secondary-text mt-1 mb-4 max-w-xs">
                  Log your semester GPAs inside the calculator to plot your academic trajectory.
                </p>
                <Link
                  to="/cgpa"
                  className="px-4 py-2 bg-btn-dark text-white rounded-custom-lg text-xs font-semibold hover:bg-neutral-800 transition-all-fast flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>Calculate GPA</span>
                </Link>
              </div>
            ) : (
              <div className="w-full">
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full h-auto select-none"
                  style={{ maxHeight: "240px" }}
                >
                  {/* Grid Lines */}
                  {[4, 6, 8, 10].map((level) => {
                    const y = getY(level);
                    if (y < paddingTop || y > height - paddingBottom) return null;
                    return (
                      <g key={level}>
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={width - paddingRight}
                          y2={y}
                          stroke="#E5E7EB"
                          strokeWidth={1}
                          strokeDasharray="4 4"
                        />
                        <text
                          x={paddingLeft - 10}
                          y={y + 4}
                          className="text-[10px] font-mono text-secondary-text"
                          textAnchor="end"
                        >
                          {level.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Horizontal reference line */}
                  <line
                    x1={paddingLeft}
                    y1={getY(yMin)}
                    x2={width - paddingRight}
                    y2={getY(yMin)}
                    stroke="#E5E7EB"
                    strokeWidth={1.5}
                  />

                  {/* Line Chart */}
                  {chartType === "line" && (
                    <>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#111111" stopOpacity="0.08" />
                          <stop offset="100%" stopColor="#111111" stopOpacity="0.00" />
                        </linearGradient>
                      </defs>

                      {loggedSemesters.length > 1 && (
                        <path d={`M ${areaPointsStr} Z`} fill="url(#chartGradient)" />
                      )}

                      {loggedSemesters.length > 1 && (
                        <path
                          d={`M ${pointsStr}`}
                          fill="none"
                          stroke="#111111"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {loggedSemesters.map((sem) => {
                        const x = getX(sem);
                        const y = getY(savedGpas[sem].sgpa);
                        return (
                          <g key={sem} className="group">
                            <circle
                              cx={x}
                              cy={y}
                              r={4}
                              fill="#FFFFFF"
                              stroke="#111111"
                              strokeWidth={2}
                              className="transition-all duration-200 group-hover:r-6 cursor-pointer"
                            />
                            <text
                              x={x}
                              y={y - 10}
                              className="text-[10px] font-bold text-primary-text"
                              textAnchor="middle"
                            >
                              {savedGpas[sem].sgpa.toFixed(2)}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  )}

                  {/* Bar Chart */}
                  {chartType === "bar" && (
                    <>
                      {loggedSemesters.map((sem) => {
                        const x = getX(sem);
                        const y = getY(savedGpas[sem].sgpa);
                        const base = getY(yMin);
                        const barWidth = Math.min(24, chartWidth / 10);
                        return (
                          <g key={sem} className="group">
                            <rect
                              x={x - barWidth / 2}
                              y={y}
                              width={barWidth}
                              height={base - y}
                              fill="#111111"
                              rx={4}
                              className="opacity-90 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                            />
                            <text
                              x={x}
                              y={y - 8}
                              className="text-[9px] font-bold text-primary-text"
                              textAnchor="middle"
                            >
                              {savedGpas[sem].sgpa.toFixed(2)}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  )}

                  {/* X Axis Labels */}
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => {
                    const x = getX(s);
                    return (
                      <text
                        key={s}
                        x={x}
                        y={height - paddingBottom + 18}
                        className={`text-[10px] font-medium ${
                          loggedSemesters.includes(s) ? "text-primary-text font-bold" : "text-secondary-text"
                        }`}
                        textAnchor="middle"
                      >
                        Sem {s}
                      </text>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>

          {/* Historical Grid */}
          <div className="bg-white border border-border-light rounded-custom-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-primary-text uppercase tracking-wider mb-4 border-b border-border-light pb-2">
              Semester Academic Logs
            </h3>

            {loading ? (
              <div className="text-center py-6 text-xs text-secondary-text">
                Loading database tables...
              </div>
            ) : loggedSemesters.length === 0 ? (
              <div className="text-center py-6 text-xs text-secondary-text">
                No logs recorded. Log your scores inside the calculator.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border-light text-xs font-semibold text-secondary-text uppercase">
                      <th className="py-3 px-4">Semester</th>
                      <th className="py-3 px-4">Calculated SGPA</th>
                      <th className="py-3 px-4">Course Credits</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loggedSemesters.map((sem) => {
                      const record = savedGpas[sem];
                      return (
                        <tr key={sem} className="border-b border-border-light/60 hover:bg-bg-secondary transition-all-fast">
                          <td className="py-3 px-4 font-semibold text-primary-text">Semester {sem}</td>
                          <td className="py-3 px-4 font-mono font-bold text-primary-text">{record.sgpa.toFixed(2)}</td>
                          <td className="py-3 px-4 text-secondary-text">{record.credits} Credits</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                              record.type === "calculated"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}>
                              {record.type === "calculated" ? "Course Grades" : "Direct Input"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteSemesterGpa(sem)}
                              className="p-1 text-secondary-text hover:text-error transition-all-fast cursor-pointer bg-transparent border-0"
                              title="Delete log"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
