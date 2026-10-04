import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { MVP_CONFIG, CSE_SUBJECTS_2024, type SubjectDefinition } from '../../lib/config';

import {
  Calculator, Atom, FlaskConical, PenTool, Code, Heart,
  MessageSquare, Globe, Cpu, Database, FolderOpen, TrendingUp,
  ShieldCheck, Layers, Network, Brain, ArrowRight, ArrowLeft,
  GraduationCap, BookOpen, ChevronRight, Zap, Bot
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator, Atom, FlaskConical, PenTool, Code, Heart,
  MessageSquare, Globe, Cpu, Database, FolderOpen, TrendingUp,
  ShieldCheck, Layers, Network, Brain, Zap, Bot
};

interface SemesterPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialSemester?: number;
  departmentId?: number;
}

export const SemesterPage: React.FC<SemesterPageProps> = ({ onNavigate, initialSemester }) => {
  const [selectedSemesterNo, setSelectedSemesterNo] = useState<number>(() => {
    return initialSemester && MVP_CONFIG.activeSemesters.includes(initialSemester)
      ? initialSemester
      : MVP_CONFIG.activeSemesters[0];
  });

  const [subjects, setSubjects] = useState<SubjectDefinition[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  // Fast, direct semester tab switching without artificial loading screens
  const handleSemesterChange = (semNum: number) => {
    if (semNum === selectedSemesterNo) return;
    setSelectedSemesterNo(semNum);
  };

  useEffect(() => {
    const loadSubjects = async () => {
      setLoadingSubjects(true);

      try {
        const { data, error } = await supabase
          .from('subjects')
          .select('*')
          .eq('semester_id', selectedSemesterNo)
          .eq('department_id', MVP_CONFIG.department.id)
          .order('subject_code');

        if (!error && data && data.length > 0) {
          // Filter out lab subjects and Constitution of India MOOC
          const filteredDb = data.filter((s) => {
            const code = s.subject_code?.toUpperCase() || '';
            const type = s.subject_type?.toLowerCase() || '';
            if (type === 'lab' || code.includes('CSL') || code.includes('ESL') || code.includes('PSL')) return false;
            if (code === 'UCHUM506') return false; // Exclude Constitution of India MOOC
            return true;
          });

          if (filteredDb.length > 0) {
            // Map DB subjects with fallback to CSE_SUBJECTS_2024
            const mapped: SubjectDefinition[] = filteredDb.map((s) => {
              const matchedStatic = CSE_SUBJECTS_2024.find((c) => c.code === s.subject_code || c.id === s.slug);
              return {
                id: String(s.id),
                code: s.subject_code,
                name: s.subject_name,
                credits: s.credits || matchedStatic?.credits || 3,
                semesterId: s.semester_id,
                description: s.description || matchedStatic?.description || '',
                iconName: s.icon_name || matchedStatic?.iconName || 'Code',
                category: matchedStatic?.category || 'Theory',
                orGroupId: matchedStatic?.orGroupId,
                orGroupTitle: matchedStatic?.orGroupTitle,
              };
            });
            setSubjects(mapped);
            setLoadingSubjects(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching subjects from Supabase:', err);
      }

      // Authoritative fallback dataset for KTU 2024 CSE S1, S3, S5
      const fallback = CSE_SUBJECTS_2024.filter((s) => s.semesterId === selectedSemesterNo);
      setSubjects(fallback);
      setLoadingSubjects(false);
    };

    loadSubjects();
  }, [selectedSemesterNo]);

  // Render subject grid with systematic height alignment & OR choice pairing
  const renderSubjectGrid = () => {
    if (loadingSubjects) {
      return (
        <div className="col-span-full py-16 text-center text-muted-foreground text-sm font-sans">
          Loading subjects...
        </div>
      );
    }

    if (subjects.length === 0) {
      return (
        <div className="col-span-full py-16 text-center glass-panel rounded-2xl flex flex-col items-center justify-center">
          <BookOpen size={40} className="text-muted-foreground/60 mb-4 stroke-[1.5]" />
          <h3 className="font-sans font-semibold text-base text-foreground mb-1">No subjects available</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            We are currently updating course modules for S{selectedSemesterNo}.
          </p>
        </div>
      );
    }

    const processedNodes: React.ReactNode[] = [];
    const handledOrGroups = new Set<string>();

    subjects.forEach((subject) => {
      if (subject.orGroupId) {
        if (handledOrGroups.has(subject.orGroupId)) return; // Already processed in pair
        handledOrGroups.add(subject.orGroupId);

        const groupSubjects = subjects.filter((s) => s.orGroupId === subject.orGroupId);

        processedNodes.push(
          <div
            key={subject.orGroupId}
            className="col-span-full glass-panel p-5 sm:p-7 rounded-3xl border border-primary/25 relative overflow-hidden bg-primary/5 dark:bg-primary/5 my-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-mono font-bold tracking-wider uppercase border border-primary/20">
                  OR ELECTIVE CHOICE
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground font-sans">
                  {subject.orGroupTitle || 'Select either course choice'}
                </span>
              </div>
              {groupSubjects[0]?.credits && (
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                  {groupSubjects[0].credits} Credits
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative items-stretch">
              {groupSubjects.map((sub, idx) => {
                const SubIcon = iconMap[sub.iconName] || Code;
                return (
                  <React.Fragment key={sub.id}>
                    {idx > 0 && (
                      <div className="md:hidden flex justify-center my-1">
                        <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-mono font-bold text-xs shadow-md">
                          OR
                        </span>
                      </div>
                    )}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      onClick={() => onNavigate('dashboard', { subjectId: sub.id, subjectCode: sub.code, subjectName: sub.name, credits: sub.credits, semId: selectedSemesterNo })}
                      className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-full border border-border/40 hover:border-primary/50 shadow-sm transition-all duration-300 group cursor-pointer bg-background/80 dark:bg-background/60"
                    >
                      <div className="flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4 shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <SubIcon size={19} className="stroke-[2.2]" />
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                              {sub.code}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight text-foreground mb-2.5 min-h-[3.25rem] flex items-center group-hover:text-primary transition-colors">
                          {sub.name}
                        </h3>

                        <p className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-grow">
                          {sub.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-border/20 shrink-0 mt-auto">
                        <span>Explore Subject</span>
                        <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
                        </div>
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}

              {/* Desktop OR Badge Separator */}
              {groupSubjects.length > 1 && (
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-primary text-primary-foreground font-mono font-bold text-xs items-center justify-center border-4 border-background shadow-lg">
                  OR
                </div>
              )}
            </div>
          </div>
        );
      } else {
        // Regular Standalone Subject Card
        const SubIcon = iconMap[subject.iconName] || Code;
        processedNodes.push(
          <motion.div
            key={subject.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onNavigate('dashboard', { subjectId: subject.id, subjectCode: subject.code, subjectName: subject.name, credits: subject.credits, semId: selectedSemesterNo })}
            className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-full border border-border/40 hover:border-primary/45 shadow-sm transition-all duration-300 group cursor-pointer"
          >
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center shrink-0">
                  <SubIcon size={19} className="stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">
                    {subject.code}
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-primary px-2 py-0.5 rounded bg-primary/8">
                    {subject.credits} Credits
                  </span>
                </div>
              </div>

              <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight text-foreground mb-2.5 min-h-[3.25rem] flex items-center group-hover:text-primary transition-colors">
                {subject.name}
              </h3>

              <p className="text-xs sm:text-sm font-normal text-muted-foreground/85 leading-relaxed mb-6 line-clamp-3 flex-grow">
                {subject.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-border/20 shrink-0 mt-auto">
              <span>Explore Subject</span>
              <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
              </div>
            </div>
          </motion.div>
        );
      }
    });

    return processedNodes;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">

      {/* Navigation Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Semesters</span>
        </button>

        {/* Clean Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
          <span className="cursor-pointer hover:text-foreground" onClick={() => onNavigate('landing')}>Notes Hub</span>
          <ChevronRight size={12} />
          <span>CSE</span>
          <ChevronRight size={12} />
          <span>KTU 2024</span>
          <ChevronRight size={12} />
          <span className="font-semibold text-primary">S{selectedSemesterNo}</span>
        </div>
      </div>

      {/* Page Title & Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-3">
          <GraduationCap size={12} />
          <span>KTU 2024 SCHEME • COMPUTER SCIENCE & ENGINEERING</span>
        </div>
        <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
          Semester {selectedSemesterNo} Subjects
        </h1>
        <p className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl leading-relaxed font-sans">
          Choose a subject to explore its academic resources, syllabus, module notes, and important topics.
        </p>
      </div>

      {/* Semester Tab Switcher (S1, S3, S5) */}
      <div className="w-full overflow-x-auto pb-4 mb-10 flex gap-2 border-b border-border/20 no-scrollbar">
        {MVP_CONFIG.activeSemesters.map((semNum) => {
          const isActive = selectedSemesterNo === semNum;
          return (
            <button
              key={semNum}
              onClick={() => handleSemesterChange(semNum)}
              className={`relative px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <GraduationCap size={16} />
              <span>Semester {semNum}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSemesterTab"
                  className="absolute inset-0 bg-primary/10 border-b-2 border-primary rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Subject Cards Grid (Systematic Equal Height Alignment) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSemesterNo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {renderSubjectGrid()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-14 text-center pt-6 border-t border-border/15">
        <p className="text-xs text-muted-foreground/75 font-sans">
          Showing official KTU 2024 Scheme subjects for S{selectedSemesterNo} Computer Science & Engineering.
        </p>
      </div>

    </div>
  );
};