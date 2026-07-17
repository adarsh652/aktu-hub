import SearchBar from "./SearchBar";

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-gradient pt-40 pb-20 md:pt-48 md:pb-24 w-full border-b border-border-light transition-colors duration-300 relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-text">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-text to-[#6B7280] dark:from-[#10B981] dark:to-[#34D399]">AKTU Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed">
            Everything an AKTU student needs — Notes, PYQs, Syllabus, Results and More.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => scrollToSection("resources")}
            className="bg-btn-dark text-white px-8 py-3 rounded-custom-xl font-semibold text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all cursor-pointer border-0"
          >
            Explore Resources
          </button>
          <button
            onClick={() => scrollToSection("semesters")}
            className="bg-white dark:bg-slate-800 border border-border-light text-primary-text px-8 py-3 rounded-custom-xl font-semibold text-sm hover:bg-bg-secondary active:scale-95 transition-all cursor-pointer"
          >
            Browse Semesters
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="w-full max-w-xl mt-12">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

export default Hero;