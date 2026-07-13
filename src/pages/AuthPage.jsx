import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, ShieldCheck } from "lucide-react";

function AuthPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard or home
  const from = location.state?.from?.pathname || "/dashboard";

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
    <div className="max-w-md mx-auto px-6 py-24 w-full flex-grow flex flex-col justify-center">
      <div className="bg-white border border-border-light rounded-custom-xl p-8 shadow-sm text-center">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="AKTU HUB" className="h-10 w-auto object-contain select-none" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-primary-text mb-2">
          Sign In to Your Account
        </h1>
        <p className="text-sm text-secondary-text mb-8 max-w-xs mx-auto">
          Access your OneView Mirror Dashboard, back up your GPA calculations, and browse resources.
        </p>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-custom-lg flex gap-3 text-xs text-red-800 text-left">
            <ShieldAlert size={18} className="flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Google OAuth Login Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 border border-border-light bg-white text-primary-text font-semibold text-sm rounded-custom-lg hover:bg-bg-secondary transition-all-fast cursor-pointer flex items-center justify-center gap-2.5 shadow-sm disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
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
          <span>{loading ? "Connecting to Google..." : "Sign In with Google"}</span>
        </button>

        {/* Security / Privacy Note */}
        <div className="mt-8 border-t border-border-light pt-6 flex items-center justify-center gap-2 text-xs text-secondary-text">
          <ShieldCheck size={14} className="text-success" />
          <span>Secure authentication handled by Google & Supabase</span>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
