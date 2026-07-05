import SearchBar from "./SearchBar";

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="text-center py-16 md:py-24 max-w-4xl mx-auto px-6 flex flex-col items-center">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary-text mb-4">
        Welcome to <span className="font-extrabold text-btn-dark">AKTU Hub</span>
      </h1>
      
      <p className="text-lg md:text-xl text-secondary-text max-w-2xl leading-relaxed mb-8">
        Everything an AKTU student needs — Notes, PYQs, Syllabus, Results and More.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => scrollToSection("resources")}
          className="px-6 py-3 bg-btn-dark text-white font-medium rounded-custom-lg hover:bg-neutral-800 transition-all-fast shadow-sm hover:shadow-md cursor-pointer"
        >
          Explore Resources
        </button>
        <button
          onClick={() => scrollToSection("semesters")}
          className="px-6 py-3 bg-white text-secondary-text font-medium border border-border-light rounded-custom-lg hover:text-primary-text hover:bg-bg-secondary transition-all-fast shadow-sm hover:shadow-md cursor-pointer"
        >
          Browse Semesters
        </button>
      </div>

      <div className="w-full max-w-xl">
        <SearchBar />
      </div>
    </section>
  );
}

export default Hero;