import React from 'react';
import { motion } from 'framer-motion';
import {
  Code, Calculator, Database, Cpu, Network, Binary, ShieldCheck, Globe,
  ArrowLeft, GraduationCap
} from 'lucide-react';

interface SemesterSelectPageProps {
  onNavigate: (page: string, params?: any) => void;
  departmentId?: number;
  departmentName?: string;
  departmentCode?: string;
}

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

export const SemesterSelectPage: React.FC<SemesterSelectPageProps> = ({
  onNavigate,
  departmentId,
  departmentName,
  departmentCode,
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
        {(departmentName || departmentCode) && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-4">
            <GraduationCap size={12} />
            <span>{departmentName} {departmentCode ? `(${departmentCode})` : ''}</span>
          </div>
        )}
        <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
          Choose Your Semester
        </h1>
        <p className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl leading-relaxed">
          Select a semester to view its registered subjects, syllabus, and resources.
        </p>
      </div>

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
              onClick={() => onNavigate('semester', { departmentId, initialSemester: semNum })}
              className="glass-panel p-6 rounded-2xl border border-border/40 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
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

    </div>
  );
};
