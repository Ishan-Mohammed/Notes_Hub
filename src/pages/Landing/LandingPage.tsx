import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Code, Calculator, 
  Database, Cpu, Network, Binary, ShieldCheck, Globe 
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const semesterSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSemesters = () => {
    semesterSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const semesterIcons = [
    Code,         // S1
    Calculator,   // S2
    Database,     // S3
    Cpu,          // S4
    Network,      // S5
    Binary,       // S6
    ShieldCheck,  // S7
    Globe         // S8
  ];

  return (
    <div className="w-full flex flex-col items-center px-6">
      
      {/* 1. Hero Section (First Viewport, 70-80% Screen Height) */}
      <section className="min-h-[75vh] flex flex-col items-center justify-center text-center max-w-4xl pt-24 pb-8">
        
        {/* Small Hero Badge (Subtle Blue Glass Pill) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/8 dark:bg-primary/12 border border-primary/20 backdrop-blur-md text-[11px] font-semibold text-primary mb-6 shadow-sm select-none"
        >
          <Sparkles size={11} className="text-secondary" />
          <span>KTU Computer Science Academic Repository</span>
        </motion.div>

        {/* Hero Heading (Sizing reduced by 25%) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[42px] sm:text-6xl md:text-[68px] font-medium tracking-tight leading-[0.95] mb-6 text-foreground"
        >
          Everything a CS Student Needs,<br />
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent italic font-semibold">
            All in One Hub.
          </span>
        </motion.h1>

        {/* Two-line Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl mb-8 leading-relaxed font-sans"
        >
          Access notes, previous year papers, lab manuals,<br className="hidden sm:inline" />
          syllabus, and curated resources in one premium platform.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <button
            onClick={scrollToSemesters}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>Browse Semesters</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </motion.div>

      </section>

      {/* 2. Semester Section (Directly below hero, ID matches Navbar scroll anchors) */}
      <section 
        ref={semesterSectionRef} 
        id="why-choose-us"
        className="w-full max-w-5xl pt-16 pb-24 border-t border-border/15"
      >
        <div className="text-center mb-12">
          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-2">
            Browse by Semester
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
            Select your semester to view registered modules, questions, and lab resources.
          </p>
        </div>

        {/* S1-S8 Clean Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, idx) => {
            const semNum = idx + 1;
            const IconComponent = semesterIcons[idx] || Code;
            return (
              <motion.div
                key={semNum}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                onClick={() => onNavigate('semester', { initialSemester: semNum })}
                className="glass-panel p-6 rounded-2xl border border-border/40 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group"
              >
                {/* Minimal Icon with soft hover blue glow background */}
                <div className="w-12 h-12 rounded-xl bg-muted/60 dark:bg-muted/30 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center mb-4 transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-primary/20">
                  <IconComponent size={20} className="stroke-[2]" />
                </div>
                
                <span className="font-display font-semibold text-[11px] tracking-wider uppercase text-muted-foreground group-hover:text-primary transition-colors">
                  Semester
                </span>
                <span className="font-sans font-bold text-2xl text-foreground mt-0.5">
                  S{semNum}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
