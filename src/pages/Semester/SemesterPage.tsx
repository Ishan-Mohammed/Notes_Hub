import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { MVP_CONFIG, CSE_SUBJECTS_2024, getSubjectsForSemester, type SubjectDefinition } from '../../lib/config';

import {
  Calculator, Atom, FlaskConical, PenTool, Code,
  MessageSquare, Globe, Cpu, Database, FolderOpen, TrendingUp,
  ShieldCheck, Layers, Network, Brain, ArrowRight, ArrowLeft,
  GraduationCap, BookOpen, ChevronRight, Zap, Bot
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator, Atom, FlaskConical, PenTool, Code,
  MessageSquare, Globe, Cpu, Database, FolderOpen, TrendingUp,
  ShieldCheck, Layers, Network, Brain, Zap, Bot
};

// Global in-memory cache to store processed DB subjects per semester for instant retrieval
const semesterSubjectsCache = new Map<number, SubjectDefinition[]>();

interface SemesterPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialSemester?: number;
  departmentId?: number;
}

export const SemesterPage: React.FC<SemesterPageProps> = ({ onNavigate, initialSemester }) => {
  const selectedSemesterNo = initialSemester && MVP_CONFIG.activeSemesters.includes(initialSemester)
    ? initialSemester
    : MVP_CONFIG.activeSemesters[0];

  // Synchronously resolve subjects from cache or local static config for BLINK-SPEED (0ms) render
  const initialLocalSubjects = useMemo(() => {
    return semesterSubjectsCache.get(selectedSemesterNo) || getSubjectsForSemester(selectedSemesterNo);
  }, [selectedSemesterNo]);

  const [subjects, setSubjects] = useState<SubjectDefinition[]>(initialLocalSubjects);
  const [loadingSubjects, setLoadingSubjects] = useState(initialLocalSubjects.length === 0);

  useEffect(() => {
    // If cached or local static subjects exist, update state synchronously
    const cachedOrLocal = semesterSubjectsCache.get(selectedSemesterNo) || getSubjectsForSemester(selectedSemesterNo);
    setSubjects(cachedOrLocal);
    setLoadingSubjects(false);

    // Skip network request if already cached in memory
    if (semesterSubjectsCache.has(selectedSemesterNo)) return;

    // Fetch database overrides/updates in the background silently
    const loadSubjectsFromDb = async () => {
      try {
        const { data, error } = await supabase
          .from('subjects')
          .select('*')
          .eq('semester_id', selectedSemesterNo)
          .eq('department_id', MVP_CONFIG.department.id)
          .order('subject_code');

        if (!error && data && data.length > 0) {
          const filteredDb = data.filter((s) => {
            const code = s.subject_code?.toUpperCase() || '';
            const type = s.subject_type?.toLowerCase() || '';
            if (type === 'lab' || code.includes('CSL') || code.includes('ESL') || code.includes('PSL')) return false;
            if (code === 'UCHUM506') return false;
            if (code === 'UCHWT127' || code === 'UCHUT128') return false;
            return true;
          });

          if (filteredDb.length > 0) {
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
            semesterSubjectsCache.set(selectedSemesterNo, mapped);
            setSubjects(mapped);
          }
        }
      } catch (err) {
        console.error('Background fetch of subjects error:', err);
      }
    };

    loadSubjectsFromDb();
  }, [selectedSemesterNo]);

  // Render subject grid with systematic equal height alignment & OR choice pairing (memoized)
  const renderedSubjectGrid = useMemo(() => {
    if (loadingSubjects) {
      return (
        <div className="col-span-full py-16 text-center text-muted-foreground text-sm font-sans">
          Loading Semester {selectedSemesterNo} subjects...
        </div>
      );
    }

    if (subjects.length === 0) {
      return (
        <div className="col-span-full py-16 text-center glass-panel rounded-2xl flex flex-col items-center justify-center">
          <BookOpen size={40} className="text-muted-foreground/60 mb-4 stroke-[1.5]" />
          <h3 className="font-sans font-semibold text-base text-foreground mb-1">No subjects available</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            We are currently updating course modules for Semester {selectedSemesterNo}.
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

                        <div className="min-h-[3.75rem] flex items-center mb-2.5">
                          <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                            {sub.name}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-grow font-sans">
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
            initial={{ opacity: 0, y: 6 }}
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

              <div className="min-h-[3.75rem] flex items-center mb-2.5">
                <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-normal text-muted-foreground/85 leading-relaxed mb-6 line-clamp-3 flex-grow font-sans">
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
  }, [subjects, loadingSubjects, selectedSemesterNo, onNavigate]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">

      {/* Navigation Header & Breadcrumb Hierarchy */}
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

      {/* Page Title & Header (Strictly displays ONLY selected semester details) */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-3">
          <GraduationCap size={12} />
          <span>KTU 2024 SCHEME • COMPUTER SCIENCE & ENGINEERING</span>
        </div>
        <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
          Semester {selectedSemesterNo} Subjects
        </h1>
        <p className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl leading-relaxed font-sans">
          Explore the academic resources available for Semester {selectedSemesterNo}. Select a subject to view syllabus, module notes, and important topics.
        </p>
      </div>

      {/* Subject Cards Grid (Instant Blink-Speed Render) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
        {renderedSubjectGrid}
      </div>

      <div className="mt-14 text-center pt-6 border-t border-border/15">
        <p className="text-xs text-muted-foreground/75 font-sans">
          Showing official KTU 2024 Scheme subjects for S{selectedSemesterNo} Computer Science & Engineering.
        </p>
      </div>

    </div>
  );
};