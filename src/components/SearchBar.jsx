import { useState } from "react";
import SubjectsData from "../Data/SubjectData";
import { Link } from "react-router-dom";
import { Search, X, Book } from "lucide-react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const matchedSubjects = SubjectsData.filter(
      (subject) =>
        subject.name.toLowerCase().includes(value.toLowerCase()) ||
        subject.code.toLowerCase().includes(value.toLowerCase())
    );

    setResults(matchedSubjects);
  };

  const clearSearch = () => {
    setSearch("");
    setResults([]);
  };

  return (
    <div className="relative w-full">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-secondary-text pointer-events-none" size={20} strokeWidth={2} />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search notes, subjects, PYQs..."
          className="w-full pl-12 pr-10 py-3.5 rounded-custom-xl bg-white border border-border-light text-primary-text placeholder-secondary-text shadow-sm focus:outline-none focus:ring-2 focus:ring-btn-dark focus:border-transparent transition-all-fast text-base"
        />
        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-4 text-secondary-text hover:text-primary-text p-0.5 rounded-full hover:bg-bg-secondary transition-all-fast cursor-pointer"
            aria-label="Clear Search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results Dropdown Overlay */}
      {results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-custom-lg border border-border-light shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto">
          {results.map((item, index) => (
            <Link
              key={index}
              to={`/semester/${item.semester}/${item.name
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              onClick={clearSearch}
              className="flex items-center justify-between px-4 py-3 hover:bg-bg-secondary transition-all-fast border-b border-border-light last:border-b-0 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-bg-secondary rounded-lg text-secondary-text group-hover:bg-white transition-all-fast">
                  <Book size={16} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-primary-text group-hover:text-black">
                    {item.name}
                  </div>
                  <div className="text-xs text-secondary-text font-mono mt-0.5">
                    {item.code}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-bg-secondary text-secondary-text rounded-full">
                Sem {item.semester}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;