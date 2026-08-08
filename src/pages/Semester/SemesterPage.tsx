import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { Semester, Subject } from '../../types/academic.types';

import {
  Calculator, Atom, FlaskConical, PenTool, Code, Wrench, Heart,
  MessageSquare, Globe, Lightbulb, Terminal, Binary, Cpu,
  Database, FolderOpen, TrendingUp, ShieldAlert, Server,
  Layers, Network, Brain, LineChart, FolderKanban, ShieldCheck,
  Cloud, Infinity, Briefcase, FolderSearch, Rocket, Presentation,
  UserCheck, Bot, ArrowRight, ArrowLeft, GraduationCap, BookOpen
} from 'lucide-react';

// Fallback only — used if this page is somehow reached without a departmentId
// (e.g. direct URL access). Normal flow always supplies it from LandingPage.
const FALLBACK_DEPARTMENT_ID = 1; // CSE

const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator, Atom, FlaskConical, PenTool, Code, Wrench, Heart,
  MessageSquare, Globe, Lightbulb, Terminal, Binary, Cpu,
  Database, FolderOpen, TrendingUp, ShieldAlert, Server,
  Layers, Network, Brain, LineChart, FolderKanban, ShieldCheck,
  Cloud, Infinity, Briefcase, FolderSearch, Rocket, Presentation,
  UserCheck, Bot
};

interface SemesterPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialSemester?: number;
  departmentId?: number;
}

export const SemesterPage: React.FC<SemesterPageProps> = ({ onNavigate, initialSemester, departmentId }) => {
  const activeDepartmentId = departmentId ?? FALLBACK_DEPARTMENT_ID;

  const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  // Starts true (not false) because selectedSemesterId is null on first render, so the
  // subjects-loading effect below hasn't run yet. Without this, the empty state
  // ("No registered subjects") flashes briefly before the first real fetch begins.
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  useEffect(() => {
    const loadSemesters = async () => {
      const { data, error } = await supabase
        .from('semesters')
        .select('*')
        .order('semester_no');

      if (error) {
        console.error('Error fetching semesters:', error.message);
        return;
      }

      setSemesters(data ?? []);

      const target = initialSemester ?? 3;
      const match = data?.find(
        (sem) => sem.id === target || sem.semester_no === target
      );
      setSelectedSemesterId(match?.id ?? data?.[0]?.id ?? null);
    };

    loadSemesters();
  }, [initialSemester]);

  useEffect(() => {
    if (!selectedSemesterId) return;

    const loadSubjects = async () => {
      setLoadingSubjects(true);

      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('semester_id', selectedSemesterId)
        .eq('department_id', activeDepartmentId)
        .order('subject_code');

      if (error) {
        console.error('Error fetching subjects:', error.message);
        setSubjects([]);
      } else {
        setSubjects(data ?? []);
      }

      setLoadingSubjects(false);
    };

    loadSubjects();
  }, [selectedSemesterId, activeDepartmentId]);

  const activeSemesterNo = semesters.find((sem) => sem.id === selectedSemesterId)?.semester_no;

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
        <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
          Academic Resource Browser
        </h1>
        <p className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl leading-relaxed">
          Pick a semester below to view its syllabus, modules, question papers, and lab manual templates.
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-4 mb-10 flex gap-2 border-b border-border/20 no-scrollbar">
        {semesters.map((sem) => {
          const isActive = selectedSemesterId === sem.id;
          return (
            <button
              key={sem.id}
              onClick={() => setSelectedSemesterId(sem.id)}
              className={`relative px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <GraduationCap size={16} />
              <span>{sem.name}</span>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSemesterId ?? 'none'}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loadingSubjects ? (
            <div className="col-span-full py-16 text-center text-muted-foreground text-sm">
              Loading subjects...
            </div>
          ) : subjects.length > 0 ? (
            subjects.map((subject, index) => {
              const SubjectIcon = iconMap[subject.icon_name ?? ''] || Code;
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => onNavigate('dashboard', { subjectId: subject.id, semId: selectedSemesterId })}
                  className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-primary/40 shadow-sm transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/8 text-primary flex items-center justify-center">
                        <SubjectIcon size={18} className="stroke-[2.2]" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {subject.subject_code}
                        </span>
                        {subject.credits && (
                          <span className="text-[10px] font-sans font-semibold text-primary px-2 py-0.5 rounded bg-primary/8">
                            {subject.credits} Credits
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-sans font-semibold text-xl sm:text-[23px] tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors">
                      {subject.subject_name}
                    </h3>

                    <p className="text-[15px] sm:text-[17px] font-normal text-muted-foreground/80 leading-relaxed mb-6 line-clamp-3">
                      {subject.description || 'No description available for this module yet. Explore official documents for content outlines.'}
                    </p>
                  </div>

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
                We are currently uploading study materials for S{activeSemesterNo ?? '—'} modules.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};