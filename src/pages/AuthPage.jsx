import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, LogIn, UserPlus } from "lucide-react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard or home, or location state
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!fullName.trim()) {
          setError("Full name is required.");
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 w-full flex-grow flex flex-col justify-center">
      <div className="bg-white border border-border-light rounded-custom-xl p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-bg-secondary rounded-full text-primary-text mb-4 border border-border-light">
            {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-text">
            {isLogin ? "Sign in to AKTU Hub" : "Create your account"}
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            {isLogin
              ? "Access your dashboard and backup your CGPA logs"
              : "Track your grades and download resources seamlessly"}
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-custom-lg flex gap-3 text-xs text-red-800">
            <ShieldAlert size={18} className="flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-secondary-text uppercase mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Adarsh Shukla"
                className="w-full p-2.5 border border-border-light rounded-custom-lg bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark focus:border-transparent transition-all-fast"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-secondary-text uppercase mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full p-2.5 border border-border-light rounded-custom-lg bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark focus:border-transparent transition-all-fast"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary-text uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 border border-border-light rounded-custom-lg bg-white text-primary-text text-sm focus:outline-none focus:ring-2 focus:ring-btn-dark focus:border-transparent transition-all-fast"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2.5 bg-btn-dark text-white font-medium text-sm rounded-custom-lg hover:bg-neutral-800 transition-all-fast cursor-pointer flex items-center justify-center gap-1.5 shadow-sm disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Footer */}
        <div className="mt-8 text-center border-t border-border-light pt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-xs font-semibold text-secondary-text hover:text-primary-text hover:underline cursor-pointer bg-transparent border-0"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
