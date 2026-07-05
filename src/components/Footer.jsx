function Footer() {
  return (
    <footer className="w-full border-t border-border-light bg-bg-secondary py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-semibold text-primary-text tracking-tight">AKTU HUB</span>
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