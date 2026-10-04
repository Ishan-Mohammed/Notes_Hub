import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { Resource, ResourceType, Subject } from '../../types/academic.types';
import {
  ArrowLeft, FileText, History, Bookmark, Layers,
  BookOpen, Terminal, Youtube, ClipboardList,
  ExternalLink, Download, CheckCircle, Info,
  FlaskConical, FolderGit2, Library, Video, NotebookPen, HelpCircle
} from 'lucide-react';

interface SubjectDashboardProps {
  subjectId: number;
  onNavigate: (page: string, params?: any) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  FileText,
  History,
  Bookmark,
  Layers,
  BookOpen,
  Terminal,
  Youtube,
  ClipboardList,
  FlaskConical,
  FolderGit2,
  Library,
  Video,
  NotebookPen,
  MessageSquareQuestion: HelpCircle,
};

// Which resource_types.slug values are shown, and in what order, per subject_type.
// Falls back to 'theory' if a subject has no type or an unrecognized one.
const RESOURCE_TYPE_CONFIG: Record<string, string[]> = {
  theory: [
    'notes',
    'series-questions',
    'model-questions',
    'pyq',
    'syllabus',
    'youtube',
    'assignments',
    'reference-books',
    'reference-videos',
  ],
  lab: [
    'notes',
    'syllabus',
    'youtube',
    'lab-record',
    'viva-questions',
    'practical-questions',
  ],
  project: [
    'notes',
    'series-questions',
    'model-questions',
    'pyq',
    'syllabus',
    'youtube',
    'assignments',
    'mini-projects',
    'reference-books',
    'reference-videos',
  ],
};

import { subjects as mockSubjects, resourceCategories as mockCategories } from '../../lib/mockData';

export const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ subjectId, onNavigate }) => {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('notes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const [subjectRes, typesRes, resourcesRes] = await Promise.all([
          supabase.from('subjects').select('*').eq('id', subjectId).single(),
          supabase.from('resource_types').select('*').order('display_order'),
          supabase
            .from('resources')
            .select('*, resource_types(slug, name, icon_name), modules(module_no)')
            .eq('subject_id', subjectId),
        ]);

        if (subjectRes.data) {
          setSubject(subjectRes.data);
        } else {
          // Fallback lookup from mockData
          const fallbackMatch =
            mockSubjects.find((s, idx) => (idx + 1 + (s.semester_id * 100)) === subjectId) ||
            mockSubjects[0];

          if (fallbackMatch) {
            setSubject({
              id: subjectId,
              department_id: 1,
              semester_id: fallbackMatch.semester_id,
              subject_code: fallbackMatch.code,
              subject_name: fallbackMatch.name,
              slug: fallbackMatch.slug || null,
              description: fallbackMatch.description || null,
              credits: fallbackMatch.credits || 3,
              icon_name: fallbackMatch.icon_name || null,
              subject_type: 'theory',
            });
          } else {
            setSubject(null);
          }
        }

        if (typesRes.data && typesRes.data.length > 0) {
          setResourceTypes(typesRes.data);
        } else {
          setResourceTypes(
            mockCategories.map((c, i) => ({
              id: i + 1,
              name: c.label,
              slug: c.slug,
              description: c.description,
              icon_name: c.icon_name,
              display_order: i + 1,
            }))
          );
        }

        if (resourcesRes.data && resourcesRes.data.length > 0) {
          setResources(resourcesRes.data);
        } else {
          setResources([]);
        }
      } catch (err) {
        console.error('Error loading subject data:', err);
      }

      setLoading(false);
    };

    loadData();
  }, [subjectId]);

  // Resource type slugs allowed for this subject's type, in display order.
  const allowedSlugs = RESOURCE_TYPE_CONFIG[subject?.subject_type ?? 'theory'] ?? RESOURCE_TYPE_CONFIG.theory;

  // Map slugs -> actual resource_type rows fetched from Supabase (skips any slug not present in DB).
  const visibleResourceTypes = allowedSlugs
    .map((slug) => resourceTypes.find((rt) => rt.slug === slug))
    .filter((rt): rt is ResourceType => Boolean(rt));

  // Whenever the subject (and therefore its allowed category set) changes,
  // reset the active tab to the first category in that set.
  useEffect(() => {
    if (!subject) return;
    const firstSlug = (RESOURCE_TYPE_CONFIG[subject.subject_type ?? 'theory'] ?? RESOURCE_TYPE_CONFIG.theory)[0];
    setActiveCategory(firstSlug ?? 'notes');
  }, [subject]);

  if (loading) {
    return (
      <div className="w-full max-w-xl mx-auto px-6 py-32 text-center text-muted-foreground">
        Loading subject...
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="w-full max-w-xl mx-auto px-6 py-32 text-center">
        <h2 className="text-xl font-bold text-foreground">Subject not found</h2>
        <button
          onClick={() => onNavigate('semester')}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Back to browser
        </button>
      </div>
    );
  }

  const activeResources = resources.filter(
    (res) => res.resource_types?.slug === activeCategory
  );

  const activeType = visibleResourceTypes.find((type) => type.slug === activeCategory);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">

      <button
        onClick={() => onNavigate('semester', {
          initialSemester: subject.semester_id,
          departmentId: subject.department_id,
        })}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group cursor-pointer"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Semester</span>
      </button>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-border/40">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {subject.subject_code}
            </span>
            <span className="text-xs text-primary font-bold font-mono px-2 py-0.5 rounded bg-primary/8 border border-primary/15">
              CSE 2024 SCHEME • S{subject.semester_id}
            </span>
            {subject.credits && (
              <span className="text-xs text-muted-foreground font-semibold">
                • {subject.credits} Credits Module
              </span>
            )}
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-[44px] tracking-tight leading-tight text-foreground mb-3">
            {subject.subject_name}
          </h1>
          <p className="text-[17px] sm:text-[19px] font-normal text-muted-foreground max-w-2xl leading-relaxed">
            {subject.description || 'No module details uploaded. Click below to inspect category resources.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Resource Categories
          </div>

          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {visibleResourceTypes.map((cat) => {
              const IconComp = iconMap[cat.icon_name ?? ''] || FileText;
              const slug = cat.slug ?? '';
              const isActive = activeCategory === slug;
              const count = resources.filter((res) => res.resource_types?.slug === slug).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(slug)}
                  className={`relative w-auto lg:w-full px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-semibold flex items-center justify-between gap-6 transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp size={16} />
                    <span>{cat.name}</span>
                  </div>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {count}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-primary/10 border-l-2 lg:border-l-2 border-b-2 lg:border-b-0 border-primary rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-sans font-semibold text-[22px] sm:text-[26px] tracking-tight text-foreground">
              {activeType?.name}
            </h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              {activeResources.length > 0 ? (
                activeResources.map((res, index) => {
                  const resourceUrl = res.youtube_url || res.file_url;
                  const isYoutube = activeCategory === 'youtube';

                  const isTargetNotesSubject = Boolean(
                    activeCategory === 'notes' &&
                    subject?.subject_name &&
                    (
                      subject.subject_name.toLowerCase().includes('machine learning') ||
                      subject.subject_name.toLowerCase().includes('microcontroller') ||
                      subject.subject_name.toLowerCase().includes('microprocessors and microcontrollers')
                    )
                  );

                  const displayTitle = isTargetNotesSubject ? 'MODULE 1' : res.title;

                  return (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-panel p-4 rounded-xl flex items-center justify-between gap-4 hover:border-primary/25 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          {isYoutube ? <Youtube size={18} /> : <FileText size={18} />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4 className={`font-sans tracking-tight text-foreground leading-tight truncate group-hover:text-primary transition-colors ${isTargetNotesSubject ? 'font-bold text-base sm:text-[18px] tracking-wide' : 'font-semibold text-base sm:text-[18px]'}`}>
                              {displayTitle}
                            </h4>
                            {res.is_verified && (
                              <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                <CheckCircle size={9} />
                                <span>Verified</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-sans">
                            {res.modules?.module_no && <span>Module {res.modules.module_no}</span>}
                            {res.file_size && <span>• {res.file_size}</span>}
                            {res.file_type && <span>• {res.file_type}</span>}
                            {res.download_count != null && (
                              <span>• {res.download_count} views</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {resourceUrl && (
                        <a
                          href={resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg bg-muted text-foreground hover:bg-primary hover:text-primary-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer shrink-0"
                        >
                          {isYoutube ? (
                            <>
                              <span>Watch</span>
                              <ExternalLink size={13} />
                            </>
                          ) : (
                            <>
                              <span>Download</span>
                              <Download size={13} />
                            </>
                          )}
                        </a>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-16 text-center glass-panel rounded-2xl flex flex-col items-center justify-center border-dashed border-2">
                  <Info size={32} className="text-muted-foreground/50 mb-3 stroke-[1.5]" />
                  <h4 className="font-semibold text-sm text-foreground mb-1">No uploads yet</h4>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    We don't have any resources in this category yet. Students or administrators will contribute soon.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};