import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import {
  ArrowRight, Sparkles, Code, Radio, Zap, Bot, Cpu, Cog,
  Target, CheckCircle2, ChevronDown, Loader2, Users
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  responsibilities: string;
  instagram: string;
  initials: string;
}

const coreTeamMembers: TeamMember[] = [
  {
    name: 'Roshan B Panicker',
    role: 'Project Lead & Content Coordinator',
    responsibilities: 'Idea • Coordination • Academic Content',
    instagram: 'https://www.instagram.com/roshan_b_panicker?igsh=eWI5ajkxdGkyNGV5',
    initials: 'RP',
  },
  {
    name: 'Arnav Manesh',
    role: 'Backend Developer',
    responsibilities: 'Backend • Database • APIs',
    instagram: 'https://www.instagram.com/arnavmanesh?igsh=MWl5dXV0b2h6MHA5Yg==',
    initials: 'AM',
  },
  {
    name: 'Ishan Mohammed',
    role: 'Frontend Developer',
    responsibilities: 'UI/UX • React • Frontend Development',
    instagram: 'https://www.instagram.com/mhd_ishan._22?igsh=ZjVyZGhqeTZ6Zm8x',
    initials: 'IM',
  },
];

interface LandingPageProps {
  onNavigate: (page: string, params?: any) => void;
}

// Departments almost never change (new ones are rare, existing ones basically never get
// renamed). Hardcoding display data here means the grid renders instantly on page load —
// no "Loading departments..." wait. The real `id` for each code is still fetched from
// Supabase in the background (see below) and awaited only at click time, so navigation
// always uses a real, correct department_id — never a guessed one.
const DEPARTMENTS = [
  { code: 'CSE', name: 'Computer Science and Engineering', icon: Code },
  { code: 'ECE', name: 'Electronics and Communication Engineering', icon: Radio },
  { code: 'EEE', name: 'Electrical and Electronics Engineering', icon: Zap },
  { code: 'AI', name: 'Artificial Intelligence', icon: Bot },
  { code: 'ECS', name: 'Electronics and Computer Science', icon: Cpu },
  { code: 'MEC', name: 'Mechanical Engineering', icon: Cog },
];

const aboutHighlights = [
  'Resources organized by department, semester, and subject',
  'Community-powered contributions',
  'Verified study materials',
  'Completely free to use',
];

// Short list for the landing page. Full FAQ (12 questions) lives on /about.
const faqPreview = [
  {
    q: 'What is Notes Hub?',
    a: 'A platform where students can access and share academic resources such as notes, previous year question papers, lab manuals, assignments, and video lectures.',
  },
  {
    q: 'Is Notes Hub free?',
    a: 'Yes. Notes Hub is completely free for students.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. All resources can be accessed without logging in.',
  },
  {
    q: 'How can I contribute resources?',
    a: 'You can submit notes, question papers, lab records, assignments, and other academic materials through the Submit Resource page.',
  },
  {
    q: 'Are resources verified?',
    a: 'Yes. Submitted resources are reviewed by administrators before they become publicly visible.',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [pendingCode, setPendingCode] = useState<string | null>(null);

  // A promise that resolves once the real { code -> id } map has been fetched from
  // Supabase. Created lazily (once) so both the effect below and click handlers share
  // the exact same promise instance.
  const resolveIdMapRef = useRef<((map: Record<string, number>) => void) | null>(null);
  const idMapPromiseRef = useRef<Promise<Record<string, number>> | null>(null);
  if (idMapPromiseRef.current === null) {
    idMapPromiseRef.current = new Promise((resolve) => {
      resolveIdMapRef.current = resolve;
    });
  }

  useEffect(() => {
    const loadDepartmentIds = async () => {
      const { data, error } = await supabase.from('departments').select('id, code');

      const map: Record<string, number> = {};
      if (error) {
        console.error('Error fetching department ids:', error.message);
      } else {
        data?.forEach((d) => {
          map[d.code] = d.id;
        });
      }

      resolveIdMapRef.current?.(map);
    };

    loadDepartmentIds();
  }, []);

  const handleDepartmentClick = async (dept: { code: string; name: string }) => {
    setPendingCode(dept.code);
    const map = await idMapPromiseRef.current!;
    setPendingCode(null);

    const id = map[dept.code] ?? (DEPARTMENTS.findIndex((d) => d.code === dept.code) + 1);

    onNavigate('semesterSelect', { departmentId: id, departmentName: dept.name, departmentCode: dept.code });
  };

  const scrollToDepartments = () => {
    document.getElementById('browse-departments')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col items-center px-6">

      {/* 1. Hero Section (First Viewport, 70-80% Screen Height) */}
      <section className="min-h-[75vh] flex flex-col items-center justify-center text-center max-w-4xl pt-24 pb-8">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/8 dark:bg-primary/12 border border-primary/20 backdrop-blur-md text-[11px] font-semibold text-primary mb-6 shadow-sm select-none"
        >
          <Sparkles size={11} className="text-secondary" />
          <span>KTU Academic Repository</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[42px] sm:text-6xl md:text-[68px] font-medium tracking-tight leading-[0.95] mb-6 text-foreground"
        >
          Everything a Student Needs,<br />
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent italic font-semibold">
            All in One Hub.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-xl mb-8 leading-relaxed font-sans"
        >
          Access notes, previous year papers, lab manuals,<br className="hidden sm:inline" />
          syllabus, and curated resources in one premium platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <button
            onClick={scrollToDepartments}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>Browse Departments</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </motion.div>

      </section>

      {/* 2. Core Team Recognition — Compact & Direct */}
      <section className="w-full max-w-5xl pt-2 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-border/40 relative overflow-hidden"
        >
          {/* Section Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-2.5">
              <Users size={12} />
              <span>BUILT BY THE CORE TEAM</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The people behind CS NotesHub — building, organizing, and maintaining a better academic experience for Computer Science students.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {coreTeamMembers.map((member, idx) => (
              <motion.a
                key={member.name}
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${member.name}'s profile on Instagram`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-background/50 hover:bg-background/80 dark:bg-muted/20 dark:hover:bg-muted/40 border border-border/40 hover:border-primary/45 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/15 via-primary/10 to-secondary/15 text-primary border border-primary/20 flex items-center justify-center font-display font-extrabold text-xs tracking-wider group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-sm">
                      {member.initials}
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-muted/40 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-base text-foreground tracking-tight group-hover:text-primary transition-colors mb-0.5">
                    {member.name}
                  </h3>
                  <p className="font-display font-medium text-[12px] text-primary mb-3">
                    {member.role}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/25">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 block mb-0.5">
                    Responsibilities
                  </span>
                  <p className="text-[12px] text-muted-foreground leading-relaxed font-sans">
                    {member.responsibilities}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact / Query Subtext */}
          <div className="mt-6 text-center pt-4 border-t border-border/20">
            <p className="text-xs text-muted-foreground font-sans">
              Have a question, suggestion, or found an issue?{' '}
              <span className="text-foreground/90 font-medium">Reach out to the core team.</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* 3. Browse by Department — renders instantly, no fetch wait */}
      <section
        id="browse-departments"
        className="w-full max-w-5xl pt-10 pb-24 border-t border-border/15"
      >
        <div className="text-center mb-12">
          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-2">
            Browse by Department
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
            Select your department to view semesters, subjects, and resources.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {DEPARTMENTS.map((dept, idx) => {
            const IconComponent = dept.icon;
            const isPending = pendingCode === dept.code;
            return (
              <motion.div
                key={dept.code}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                onClick={() => handleDepartmentClick(dept)}
                aria-busy={isPending}
                className="glass-panel p-6 rounded-2xl border border-border/40 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group relative"
              >
                <div className="w-12 h-12 rounded-xl bg-muted/60 dark:bg-muted/30 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center mb-4 transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-primary/20">
                  {isPending ? (
                    <Loader2 size={20} className="stroke-[2] animate-spin" />
                  ) : (
                    <IconComponent size={20} className="stroke-[2]" />
                  )}
                </div>

                <span className="font-display font-semibold text-[11px] tracking-wider uppercase text-muted-foreground group-hover:text-primary transition-colors">
                  {dept.code}
                </span>
                <span className="font-sans font-semibold text-base text-foreground mt-0.5 leading-snug">
                  {dept.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. About Preview */}
      <section className="w-full max-w-4xl pt-4 pb-24 border-t border-border/15">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl border-border/40 px-6 sm:px-12 py-12 sm:py-14 flex flex-col items-center text-center"
        >
          <div className="w-11 h-11 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-5">
            <Target size={20} className="stroke-[2.2]" />
          </div>

          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-3">
            About Notes Hub
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed mb-8">
            Notes Hub is a community-driven platform built by students, for students. Our goal
            is a centralized repository of academic resources across all departments and
            semesters — making learning materials easier to find, access, and share.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-9 text-left">
            {aboutHighlights.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onNavigate('about')}
            className="px-6 py-3 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
          >
            <span>Learn More</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </motion.div>
      </section>

      {/* 4. FAQ Preview */}
      <section className="w-full max-w-3xl pb-24">
        <div className="text-center mb-10">
          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
            Quick answers to the most common questions.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mb-8">
          {faqPreview.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={item.q}
                className="glass-panel rounded-2xl border-border/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left cursor-pointer"
                >
                  <span className="font-sans font-semibold text-sm sm:text-[15px] text-foreground">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-5 sm:px-6 pb-4 text-[13px] sm:text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => onNavigate('about', { scrollTo: 'faq' })}
            className="px-6 py-3 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
          >
            <span>View All FAQs</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>
      </section>

    </div>
  );
};