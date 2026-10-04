import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { MVP_CONFIG } from '../../lib/config';

interface SemesterTransitionProps {
  isVisible: boolean;
  semesterNum: number | null;
}

export const SemesterTransition: React.FC<SemesterTransitionProps> = ({
  isVisible,
  semesterNum,
}) => {
  if (!semesterNum) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="semester-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-6 bg-background/85 backdrop-blur-xl select-none"
        >
          {/* Ambient background light */}
          <div className="absolute inset-0 ambient-glow pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-primary/25 shadow-2xl flex flex-col items-center text-center max-w-md w-full relative overflow-hidden"
          >
            {/* Subtle background glow element */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            {/* KTU 2024 SCHEME • CSE Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-[11px] font-semibold text-primary mb-5 shadow-sm">
              <Sparkles size={11} className="text-secondary" />
              <span>{MVP_CONFIG.scheme} • {MVP_CONFIG.department.code}</span>
            </div>

            {/* Semester S1 / S3 / S5 Display */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-primary-foreground flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
              <span className="font-sans font-extrabold text-3xl tracking-tight">
                S{semesterNum}
              </span>
            </div>

            <h2 className="font-sans font-bold text-2xl text-foreground tracking-tight mb-2">
              Semester {semesterNum}
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs leading-relaxed mb-6 font-sans">
              Preparing your Computer Science & Engineering subjects...
            </p>

            {/* Progress indicator */}
            <div className="flex items-center gap-2.5 text-primary font-mono text-xs font-semibold px-4 py-2 rounded-full bg-primary/8 border border-primary/15">
              <Loader2 size={15} className="animate-spin text-primary" />
              <span>Loading Academic Resources</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
