import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { Semester, Subject } from '../../types/academic.types';
import { MVP_CONFIG } from '../../lib/config';

import {
  Calculator, Atom, FlaskConical, PenTool, Code, Wrench, Heart,
  MessageSquare, Globe, Lightbulb, Terminal, Binary, Cpu,
  Database, FolderOpen, TrendingUp, ShieldAlert, Server,
  Layers, Network, Brain, LineChart, FolderKanban, ShieldCheck,
  Cloud, Infinity, Briefcase, FolderSearch, Rocket, Presentation,
  UserCheck, Bot, ArrowRight, ArrowLeft, GraduationCap, BookOpen
} from 'lucide-react';

import { subjects as mockSubjects } from '../../lib/mockData';

const FALLBACK_DEPARTMENT_ID = MVP_CONFIG.department.id; // 1 (CSE)

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
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  useEffect(() => {
    const loadSemesters = async () => {
      let semList: Semester[] = [];
      try {
        const { data, error } = await supabase
          .from('semesters')
          .select('*')
          .order('semester_no');

        if (!error && data && data.length > 0) {
          semList = data;
        }
      } catch (err) {
        console.error('Error fetching semesters:', err);
      }

      if (semList.length === 0) {
        semList = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          semester_no: i + 1,
          name: `Semester ${i + 1}`,
        }));
      }

      setSemesters(semList);

      // Default target semester (must be one of MVP_CONFIG.activeSemesters)
      const requested = initialSemester && MVP_CONFIG.activeSemesters.includes(initialSemester)
        ? initialSemester
        : MVP_CONFIG.activeSemesters[0]; // Default to S1 or S3

      const match = semList.find(
        (sem) => sem.id === requested || sem.semester_no === requested
      );
      setSelectedSemesterId(match?.id ?? semList[0]?.id ?? 1);
    };

    loadSemesters();
  }, [initialSemester]);

  useEffect(() => {
    if (!selectedSemesterId) return;

    const loadSubjects = async () => {
      setLoadingSubjects(true);

      try {
        const { data, error } = await supabase
          .from('subjects')
          .select('*')
          .eq('semester_id', selectedSemesterId)
          .eq('department_id', activeDepartmentId)
          .order('subject_code');

        if (!error && data && data.length > 0) {
          setSubjects(data);
          setLoadingSubjects(false);
          return;
        }
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }

      // Safe fallback when Supabase is unconfigured or returns no records
      const fallback = mockSubjects
        .filter((s) => s.semester_id === selectedSemesterId)
        .map((s, idx) => ({
          id: idx + 1 + (selectedSemesterId * 100),
          department_id: activeDepartmentId,
          semester_id: selectedSemesterId,
          subject_code: s.code,
          subject_name: s.name,
          slug: s.slug || null,
          description: s.description || null,
          credits: s.credits || 3,
          icon_name: s.icon_name || null,
          subject_type: 'theory' as const,
        }));

      setSubjects(fallback);
      setLoadingSubjects(false);
    };

    loadSubjects();
  }, [selectedSemesterId, activeDepartmentId]);

  // Filter semester tabs to ONLY active MVP semesters (S1, S3, S5) for the active user interface
  const visibleSemesters = semesters.filter((sem) =>
    MVP_CONFIG.activeSemesters.includes(sem.semester_no)
  );

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

      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-3">
          <GraduationCap size={12} />
          <span>{MVP_CONFIG.department.fullName} • {MVP_CONFIG.scheme}</span>
        </div>
        <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
          Academic Resource Browser
        </h1>
        <p className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl leading-relaxed">
          Select S1, S3, or S5 below to explore subjects, syllabus, notes, question papers, and lab manuals.
        </p>
      </div>

      {/* Semester Tab Switcher (S1, S3, S5) */}
      <div className="w-full overflow-x-auto pb-4 mb-10 flex gap-2 border-b border-border/20 no-scrollbar">
        {visibleSemesters.map((sem) => {
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

      {/* Subject Cards Grid */}
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
                We are currently uploading study materials for S{activeSemesterNo ?? '—'} modules under KTU 2024 Scheme.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 text-center pt-6 border-t border-border/15">
        <p className="text-xs text-muted-foreground/75 font-sans">
          Showing active semesters (S1, S3, S5) for Computer Science & Engineering ({MVP_CONFIG.scheme}). Additional semesters will be made available in future releases.
        </p>
      </div>

    </div>
  );
};