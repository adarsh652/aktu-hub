function Footer() {
  return (
    <footer className="w-full border-t border-border-light bg-bg-secondary py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-1.5 select-none mb-1">
            <span className="bg-btn-dark text-white rounded-[5px] px-2 py-0.5 text-xs font-bold tracking-wide">
              AKTU
            </span>
            <span className="font-bold text-xs tracking-wide text-primary-text ml-0.5">
              HUB
            </span>
          </div>
          <p className="mt-1 text-sm text-secondary-text">
            Made with ❤️ by <span className="font-medium text-primary-text">Adarsh</span>
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-secondary-text">
          <a href="/semester/1" className="hover:text-primary-text transition-all-fast">Resources</a>
          <a href="/cgpa" className="hover:text-primary-text transition-all-fast">CGPA</a>
          <a href="#" className="hover:text-primary-text transition-all-fast">About</a>
          <a href="#" className="hover:text-primary-text transition-all-fast">Contact</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-text transition-all-fast">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;