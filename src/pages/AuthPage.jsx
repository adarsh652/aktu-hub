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

  const { signIn, signUp, signInWithGoogle } = useAuth();
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

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || "Failed to log in with Google.");
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

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-light"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-secondary-text">Or continue with</span>
          </div>
        </div>

        {/* Google OAuth Login Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 border border-border-light bg-white text-primary-text font-medium text-sm rounded-custom-lg hover:bg-bg-secondary transition-all-fast cursor-pointer flex items-center justify-center gap-2.5 shadow-sm disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.23 2.73 1.26 6.723l3.978 3.042z"
            />
            <path
              fill="#4285F4"
              d="M23.727 12.273c0-.836-.073-1.645-.209-2.427H12v4.618h6.582a5.618 5.618 0 0 1-2.436 3.69l3.873 3c2.264-2.09 3.709-5.173 3.709-8.88z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235A7.09 7.09 0 0 1 4.909 12c0-.79.13-1.555.357-2.265L1.266 6.723A11.934 11.934 0 0 0 0 12c0 1.927.455 3.745 1.266 5.377l4-3.142z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.97-1.077 7.96-2.927l-3.87-3c-1.077.727-2.463 1.155-4.09 1.155-3.155 0-5.83-2.127-6.78-4.99l-4 3.136C3.23 21.27 7.27 24 12 24z"
            />
          </svg>
          <span>Sign In with Google</span>
        </button>

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
