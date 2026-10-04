import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { Resource, ResourceType, Subject } from '../../types/academic.types';
import { getSubjectByIdOrCode } from '../../lib/config';
import {
  ArrowLeft, FileText, History, Bookmark, Layers,
  BookOpen, Terminal, Youtube, ClipboardList,
  Download, CheckCircle, Info,
  FlaskConical, FolderGit2, Library, Video, NotebookPen, HelpCircle,
  ChevronRight
} from 'lucide-react';
import { subjects as mockSubjects } from '../../lib/mockData';

// Global client-side resource cache to prevent duplicate Supabase fetches during session
const resourceCache = new Map<string | number, Resource[]>();

interface SubjectDashboardProps {
  subjectId: number | string;
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

// User-facing MVP categories: ONLY Module Notes, Important Topics, Syllabus
const MVP_RESOURCE_TYPES: ResourceType[] = [
  {
    id: 1,
    name: 'Module Notes',
    slug: 'notes',
    description: 'Comprehensive handwritten and typed notes structured by module.',
    icon_name: 'FileText',
    display_order: 1,
  },
  {
    id: 2,
    name: 'Important Topics',
    slug: 'important-topics',
    description: 'Key exam-oriented concepts, weightage topics, and module summaries.',
    icon_name: 'Bookmark',
    display_order: 2,
  },
  {
    id: 3,
    name: 'Syllabus',
    slug: 'syllabus',
    description: 'Official KTU 2024 Scheme curriculum breakdown and module structure.',
    icon_name: 'BookOpen',
    display_order: 3,
  },
];

const RESOURCE_TYPE_CONFIG: Record<string, string[]> = {
  theory: ['notes', 'important-topics', 'syllabus'],
  lab: ['notes', 'important-topics', 'syllabus'],
  project: ['notes', 'important-topics', 'syllabus'],
};

export const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ subjectId, onNavigate }) => {
  // Synchronously compute initial subject for INSTANT (0ms) header & shell rendering
  const initialSubject = useMemo(() => {
    const matchedStatic = getSubjectByIdOrCode(subjectId);
    if (matchedStatic) {
      return {
        id: typeof subjectId === 'number' ? subjectId : 1,
        department_id: 1,
        semester_id: matchedStatic.semesterId,
        subject_code: matchedStatic.code,
        subject_name: matchedStatic.name,
        slug: matchedStatic.id,
        description: matchedStatic.description,
        credits: matchedStatic.credits,
        icon_name: matchedStatic.iconName,
        subject_type: 'theory' as const,
      };
    }

    const mockMatch = mockSubjects.find(
      (s, idx) => (idx + 1 + (s.semester_id * 100)) === Number(subjectId)
    );
    if (mockMatch) {
      return {
        id: Number(subjectId) || 1,
        department_id: 1,
        semester_id: mockMatch.semester_id,
        subject_code: mockMatch.code,
        subject_name: mockMatch.name,
        slug: mockMatch.slug || null,
        description: mockMatch.description || null,
        credits: mockMatch.credits || 3,
        icon_name: mockMatch.icon_name || null,
        subject_type: 'theory' as const,
      };
    }
    return null;
  }, [subjectId]);

  const [subject, setSubject] = useState<Subject | null>(initialSubject);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>(MVP_RESOURCE_TYPES);
  const [resources, setResources] = useState<Resource[]>(() => resourceCache.get(subjectId) || []);
  const [activeCategory, setActiveCategory] = useState<string>('notes');
  const [loadingResources, setLoadingResources] = useState<boolean>(!resourceCache.has(subjectId));

  useEffect(() => {
    // Update subject synchronously if prop changes
    if (initialSubject) {
      setSubject(initialSubject);
    }

    // Check memory cache first
    if (resourceCache.has(subjectId)) {
      setResources(resourceCache.get(subjectId)!);
      setLoadingResources(false);
    } else {
      setLoadingResources(true);
    }

    const loadData = async () => {
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
        }

        if (typesRes.data && typesRes.data.length > 0) {
          const dbFiltered = typesRes.data.filter((rt) =>
            rt.slug && ['notes', 'important-topics', 'syllabus', 'topics'].includes(rt.slug)
          );
          if (dbFiltered.length > 0) {
            setResourceTypes(dbFiltered);
          }
        }

        if (resourcesRes.data && resourcesRes.data.length > 0) {
          resourceCache.set(subjectId, resourcesRes.data);
          setResources(resourcesRes.data);
        }
      } catch (err) {
        console.error('Error loading subject resources:', err);
      } finally {
        setLoadingResources(false);
      }
    };

    loadData();
  }, [subjectId, initialSubject]);

  // Allowed resource type slugs: ONLY notes, important-topics, syllabus
  const allowedSlugs = RESOURCE_TYPE_CONFIG[subject?.subject_type ?? 'theory'] ?? RESOURCE_TYPE_CONFIG.theory;

  // Filter visible resource types to the 3 MVP categories
  const visibleResourceTypes = resourceTypes.filter((rt) => rt.slug && allowedSlugs.includes(rt.slug));

  useEffect(() => {
    if (!subject) return;
    setActiveCategory('notes');
  }, [subject]);

  if (!subject) {
    return (
      <div className="w-full max-w-xl mx-auto px-6 py-32 text-center">
        <h2 className="text-xl font-bold text-foreground">Subject not found</h2>
        <button
          onClick={() => onNavigate('semester')}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer"
        >
          Back to Semesters
        </button>
      </div>
    );
  }

  const activeResources = resources.filter((res) => {
    const slug = res.resource_types?.slug;
    if (activeCategory === 'important-topics') {
      return slug === 'important-topics' || slug === 'topics';
    }
    return slug === activeCategory;
  });

  const activeType = visibleResourceTypes.find((type) => type.slug === activeCategory) || MVP_RESOURCE_TYPES[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">

      {/* Navigation Header & Breadcrumb Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={() => onNavigate('semester', {
            initialSemester: subject.semester_id,
            departmentId: subject.department_id,
          })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Semester</span>
        </button>

        {/* Clean Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
          <span className="cursor-pointer hover:text-foreground" onClick={() => onNavigate('landing')}>Notes Hub</span>
          <ChevronRight size={12} />
          <span>CSE</span>
          <ChevronRight size={12} />
          <span>KTU 2024</span>
          <ChevronRight size={12} />
          <span className="cursor-pointer hover:text-foreground" onClick={() => onNavigate('semester', { initialSemester: subject.semester_id })}>
            S{subject.semester_id}
          </span>
          <ChevronRight size={12} />
          <span className="font-semibold text-primary">{subject.subject_code}</span>
        </div>
      </div>

      {/* Subject Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-border/40">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap mb-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {subject.subject_code}
            </span>
            <span className="text-xs text-primary font-bold font-mono px-2 py-0.5 rounded bg-primary/8 border border-primary/15">
              KTU 2024 SCHEME • CSE • S{subject.semester_id}
            </span>
            {subject.credits && (
              <span className="text-xs text-muted-foreground font-semibold">
                • {subject.credits} Credits Module
              </span>
            )}
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-[40px] tracking-tight leading-tight text-foreground mb-3">
            {subject.subject_name}
          </h1>
          <p className="text-sm sm:text-base font-normal text-muted-foreground max-w-2xl leading-relaxed font-sans">
            {subject.description || 'Explore syllabus, module notes, and important topics for this course.'}
          </p>
        </div>
      </div>

      {/* Resource Category Tabs & Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Category Selector Side Menu (ONLY Module Notes, Important Topics, Syllabus) */}
        <div className="flex flex-col gap-1.5 lg:col-span-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2 font-mono">
            Resource Categories
          </div>

          <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {visibleResourceTypes.map((cat) => {
              const IconComp = iconMap[cat.icon_name ?? ''] || FileText;
              const slug = cat.slug ?? '';
              const isActive = activeCategory === slug;

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
                    <IconComp size={17} />
                    <span>{cat.name}</span>
                  </div>
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

        {/* Main Resource Cards Container */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-sans font-bold text-2xl tracking-tight text-foreground mb-1">
                {activeType?.name}
              </h3>
              <p className="text-xs text-muted-foreground font-sans">
                {activeType?.description}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              {loadingResources ? (
                <div className="py-16 text-center glass-panel rounded-2xl flex flex-col items-center justify-center">
                  <p className="text-xs text-muted-foreground font-sans">
                    Loading subject resources...
                  </p>
                </div>
              ) : activeResources.length > 0 ? (
                activeResources.map((res, index) => {
                  const resourceUrl = res.youtube_url || res.file_url;

                  return (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="glass-panel p-4 sm:p-5 rounded-xl flex items-center justify-between gap-4 hover:border-primary/25 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <FileText size={19} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4 className="font-sans font-bold text-base text-foreground tracking-tight group-hover:text-primary transition-colors">
                              {res.title}
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
                          </div>
                        </div>
                      </div>

                      {resourceUrl ? (
                        <a
                          href={resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-lg bg-muted text-foreground hover:bg-primary hover:text-primary-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer shrink-0"
                        >
                          <span>Download</span>
                          <Download size={13} />
                        </a>
                      ) : (
                        <span className="text-xs font-semibold text-muted-foreground/60 px-3 py-1.5 rounded bg-muted/40">
                          Available Soon
                        </span>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-16 text-center glass-panel rounded-2xl flex flex-col items-center justify-center border-dashed border-2 border-border/40">
                  <Info size={32} className="text-muted-foreground/50 mb-3 stroke-[1.5]" />
                  <h4 className="font-sans font-bold text-sm text-foreground mb-1">
                    {activeCategory === 'notes' && 'No module notes available yet'}
                    {activeCategory === 'important-topics' && 'No important topics available yet'}
                    {activeCategory === 'syllabus' && 'Syllabus not available yet'}
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs font-sans">
                    Resources for this section are currently being verified and will be published shortly.
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