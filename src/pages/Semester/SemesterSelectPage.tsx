import React from 'react';
import { motion } from 'framer-motion';
import {
  Code, Calculator, Database, Cpu, Network, Binary, ShieldCheck, Globe,
  ArrowLeft, GraduationCap, ArrowRight
} from 'lucide-react';
import { MVP_CONFIG, SEMESTER_CARD_DATA } from '../../lib/config';

interface SemesterSelectPageProps {
  onNavigate: (page: string, params?: any) => void;
  departmentId?: number;
  departmentName?: string;
  departmentCode?: string;
}

// Extensible icon map for all semesters S1-S8
const semesterIcons: Record<number, React.ComponentType<any>> = {
  1: Code,        // S1
  2: Calculator,  // S2
  3: Database,    // S3
  4: Cpu,         // S4
  5: Network,     // S5
  6: Binary,      // S6
  7: ShieldCheck, // S7
  8: Globe        // S8
};

export const SemesterSelectPage: React.FC<SemesterSelectPageProps> = ({
  onNavigate,
  departmentId = MVP_CONFIG.department.id,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">

      <button
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group cursor-pointer"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-4">
          <GraduationCap size={12} />
          <span>{MVP_CONFIG.department.fullName} ({MVP_CONFIG.department.code}) • {MVP_CONFIG.scheme}</span>
        </div>
        <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
          Explore Your Semester
        </h1>
        <p className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl leading-relaxed">
          Select your semester to access CSE academic resources for the KTU 2024 Scheme.
        </p>
      </div>

      {/* Grid displaying active MVP semesters S1, S3, S5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEMESTER_CARD_DATA.map((sem, idx) => {
          const IconComponent = semesterIcons[sem.semNum] || Code;
          return (
            <motion.div
              key={sem.semNum}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => onNavigate('semester', { departmentId, initialSemester: sem.semNum })}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-border/40 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-muted/60 dark:bg-muted/30 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-primary/20">
                    <IconComponent size={22} className="stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                    {sem.subtitle}
                  </span>
                </div>

                <span className="font-mono font-bold text-xs tracking-wider uppercase text-primary block mb-0.5">
                  {sem.label}
                </span>
                <h3 className="font-sans font-bold text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {sem.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 font-sans">
                  {sem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/20 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Explore Resources</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs text-muted-foreground/75 font-sans">
          Currently displaying S1, S3, and S5 for KTU CSE 2024 Scheme. Additional semesters will be unlocked in upcoming releases.
        </p>
      </div>

    </div>
  );
};
