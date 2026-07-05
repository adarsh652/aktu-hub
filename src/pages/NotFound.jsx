import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center flex-grow">
      <AlertCircle size={48} className="text-error mb-4" />
      <h1 className="text-7xl font-extrabold tracking-tight text-primary-text mb-2">
        404
      </h1>
      <p className="text-xl font-semibold text-primary-text mb-2">
        Page Not Found
      </p>
      <p className="text-secondary-text max-w-sm mb-8 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-btn-dark text-white font-medium rounded-custom-lg hover:bg-neutral-800 transition-all-fast shadow-sm hover:shadow-md cursor-pointer text-sm"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;