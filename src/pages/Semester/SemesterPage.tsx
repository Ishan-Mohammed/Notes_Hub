import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { semesters, subjects } from '../../lib/mockData';
import { 
  Calculator, Atom, FlaskConical, PenTool, Code, Wrench, Heart, 
  MessageSquare, Globe, Lightbulb, Terminal, Binary, Cpu, 
  Database, FolderOpen, TrendingUp, ShieldAlert, Server, 
  Layers, Network, Brain, LineChart, FolderKanban, ShieldCheck, 
  Cloud, Infinity, Briefcase, FolderSearch, Rocket, Presentation, 
  UserCheck, ArrowRight, ArrowLeft, GraduationCap, BookOpen 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator, Atom, FlaskConical, PenTool, Code, Wrench, Heart, 
  MessageSquare, Globe, Lightbulb, Terminal, Binary, Cpu, 
  Database, FolderOpen, TrendingUp, ShieldAlert, Server, 
  Layers, Network, Brain, LineChart, FolderKanban, ShieldCheck, 
  Cloud, Infinity, Briefcase, FolderSearch, Rocket, Presentation, 
  UserCheck
};

interface SemesterPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialSemester?: number;
}

export const SemesterPage: React.FC<SemesterPageProps> = ({ onNavigate, initialSemester }) => {
  const [selectedSem, setSelectedSem] = useState<number>(initialSemester || 3); // Default to S3

  useEffect(() => {
    if (initialSemester) {
      setSelectedSem(initialSemester);
    }
  }, [initialSemester]);

  const activeSubjects = subjects.filter(sub => sub.semester_id === selectedSem);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
      
      {/* Back to Home Header */}
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group cursor-pointer"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </button>

      {/* Header Title */}
      <div className="mb-12">
        <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
          Academic Resource Browser
        </h1>
        <p className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl leading-relaxed">
          Pick a semester below to view its syllabus, modules, question papers, and lab manual templates.
        </p>
      </div>

      {/* Semester Nav Pills (Horizontal Scrolling on Mobile) */}
      <div className="w-full overflow-x-auto pb-4 mb-10 flex gap-2 border-b border-border/20 no-scrollbar">
        {semesters.map((sem) => {
          const isActive = selectedSem === sem.id;
          return (
            <button
              key={sem.id}
              onClick={() => setSelectedSem(sem.id)}
              className={`relative px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <GraduationCap size={16} />
              <span>S{sem.id}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeSemesterTab" 
                  className="absolute inset-0 bg-primary/10 border-b-2 border-primary rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Subjects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSem}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeSubjects.length > 0 ? (
            activeSubjects.map((subject, index) => {
              const SubjectIcon = iconMap[subject.icon_name] || Code;
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => onNavigate('dashboard', { subjectId: subject.id, semId: selectedSem })}
                  className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-primary/40 shadow-sm transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    {/* Icon & Code Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/8 text-primary flex items-center justify-center">
                        <SubjectIcon size={18} className="stroke-[2.2]" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {subject.code}
                        </span>
                        {subject.credits && (
                          <span className="text-[10px] font-sans font-semibold text-primary px-2 py-0.5 rounded bg-primary/8">
                            {subject.credits} Credits
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-semibold text-xl sm:text-[23px] tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] sm:text-[17px] font-normal text-muted-foreground/80 leading-relaxed mb-6 line-clamp-3">
                      {subject.description || 'No description available for this module yet. Explore official documents for content outlines.'}
                    </p>
                  </div>

                {/* Footer Action */}
                <div className="flex items-center gap-2 text-xs font-semibold text-primary mt-auto">
                  <span>Explore Resources</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })
          ) : (
            <div className="col-span-full py-16 text-center glass-panel rounded-2xl flex flex-col items-center justify-center">
              <BookOpen size={40} className="text-muted-foreground/60 mb-4 stroke-[1.5]" />
              <h3 className="font-display font-semibold text-md text-foreground mb-1">No registered subjects</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                We are currently uploading study materials for S{selectedSem} Computer Science modules.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
