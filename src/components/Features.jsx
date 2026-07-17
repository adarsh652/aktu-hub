import { ShieldCheck, Zap } from "lucide-react";

function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Verified & Organized */}
        <div className="p-8 md:p-10 rounded-custom-xl bg-btn-dark text-white lg:col-span-2 relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
          
          <ShieldCheck size={48} className="mb-6 text-teal-400 opacity-90" />
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Verified &amp; Organized</h3>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-xl">
            Every resource on AKTU Hub is checked for syllabus alignment. Files are organized strictly by notes, syllabus, and PYQs so you spend less time searching and more time studying.
          </p>
        </div>

        {/* Card 2: Blazing Fast */}
        <div className="p-8 md:p-10 rounded-custom-xl bg-bg-secondary border border-border-light text-primary-text flex flex-col justify-between group">
          <div>
            <Zap size={36} className="mb-6 text-primary-text group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-bold mb-3">Blazing Fast</h3>
            <p className="text-xs md:text-sm text-secondary-text leading-relaxed">
              Lightweight static architecture designed for maximum performance, ensuring instant access even on congested campus Wi-Fi networks.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-border-light flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-text">
              Efficiency First
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
