import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Code, Database, Network,
  Target, CheckCircle2, ChevronDown, Users, GraduationCap
} from 'lucide-react';
import { MVP_CONFIG, SEMESTER_CARD_DATA } from '../../lib/config';

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

const semesterIconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Database,
  Network,
};

const aboutHighlights = [
  'Tailored for KTU CSE 2024 Scheme',
  'Active S1, S3, and S5 semester coverage',
  'Verified notes, lab manuals & question papers',
  'Completely free for students — no account required',
];

const faqPreview = [
  {
    q: 'What is Notes Hub?',
    a: 'A dedicated academic resource repository for KTU Computer Science & Engineering (CSE) students following the 2024 Scheme.',
  },
  {
    q: 'Which semesters are currently supported?',
    a: 'Notes Hub currently supports Semester 1 (S1), Semester 3 (S3), and Semester 5 (S5) for Computer Science & Engineering under the KTU 2024 Scheme.',
  },
  {
    q: 'Is Notes Hub free to use?',
    a: 'Yes. Notes Hub is completely free for all students.',
  },
  {
    q: 'Do I need an account to download resources?',
    a: 'No. All study materials, module notes, lab manuals, and previous year papers can be accessed directly without logging in.',
  },
  {
    q: 'Are resources verified?',
    a: 'Yes. Submitted resources are reviewed by team members before publication to ensure accuracy with the KTU 2024 syllabus.',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scrollToSemesters = () => {
    const el = document.getElementById('explore-semesters') || document.getElementById('browse-departments');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSemesterClick = (semNum: number) => {
    onNavigate('semester', {
      departmentId: MVP_CONFIG.department.id,
      initialSemester: semNum,
    });
  };

  return (
    <div className="w-full flex flex-col items-center px-6">

      {/* 1. Hero Section */}
      <section className="min-h-[75vh] flex flex-col items-center justify-center text-center max-w-4xl pt-24 pb-12">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 dark:bg-primary/12 border border-primary/20 backdrop-blur-md text-[11px] font-semibold text-primary mb-6 shadow-sm select-none"
        >
          <Sparkles size={11} className="text-secondary" />
          <span>KTU 2024 SCHEME • CSE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[40px] sm:text-6xl md:text-[66px] font-medium tracking-tight leading-[0.98] mb-6 text-foreground"
        >
          Your CSE Academic Hub.
          <br />
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent italic font-semibold">
            All Resources in One Place.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-[18px] font-normal text-muted-foreground max-w-2xl mb-8 leading-relaxed font-sans"
        >
          Notes, question papers, lab resources and study materials — organized specifically for Computer Science & Engineering students following the KTU 2024 Scheme.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col items-center gap-3.5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={scrollToSemesters}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-md"
            >
              <span>Explore Semesters</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="px-7 py-3.5 rounded-full bg-muted/60 hover:bg-muted text-foreground font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-border/40"
            >
              <span>Learn More</span>
            </button>
          </div>

          <p className="text-xs text-muted-foreground/80 font-sans italic mt-1">
            Built for CSE today. Expanding across departments in the future.
          </p>
        </motion.div>

      </section>

      {/* 2. Core Team Recognition Section */}
      <section className="w-full max-w-5xl pt-2 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-border/40 relative overflow-hidden"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-2.5">
              <Users size={12} />
              <span>BUILT BY THE CORE TEAM</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The team behind Notes Hub — building, organizing, and maintaining academic resources for KTU Computer Science & Engineering students.
            </p>
          </div>

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

          <div className="mt-6 text-center pt-4 border-t border-border/20">
            <p className="text-xs text-muted-foreground font-sans">
              Have a question or suggestion?{' '}
              <span className="text-foreground/90 font-medium">Reach out to the core team.</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* 3. Explore Your Semester Section (Replaces Department Grid) */}
      <section
        id="explore-semesters"
        className="w-full max-w-5xl pt-10 pb-24 border-t border-border/15"
      >
        {/* Supporting alias anchor for legacy links */}
        <div id="browse-departments" className="scroll-mt-24" />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[11px] font-semibold text-primary mb-3">
            <GraduationCap size={12} />
            <span>KTU 2024 SCHEME • CSE</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-[36px] font-bold text-foreground tracking-tight mb-3">
            Explore Your Semester
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Select your semester to access CSE academic resources for the KTU 2024 Scheme.
          </p>
        </div>

        {/* Semester Cards Grid — Displaying ONLY S1, S3, S5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {SEMESTER_CARD_DATA.map((sem, idx) => {
            const IconComponent = semesterIconMap[sem.iconName] || Code;
            return (
              <motion.div
                key={sem.semNum}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => handleSemesterClick(sem.semNum)}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-border/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                {/* Subtle ambient light glow on hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/20 text-primary flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      <IconComponent size={22} className="stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-muted/60 dark:bg-muted/30 text-muted-foreground font-mono text-[10px] font-bold tracking-wider uppercase border border-border/30">
                        {sem.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Semester Tag & Title */}
                  <div className="mb-3">
                    <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase block mb-0.5">
                      {sem.label}
                    </span>
                    <h3 className="font-sans font-bold text-2xl text-foreground group-hover:text-primary transition-colors">
                      {sem.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed font-sans mb-6">
                    {sem.description}
                  </p>
                </div>

                {/* Bottom CTA Action */}
                <div className="pt-4 border-t border-border/25 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-primary transition-colors">
                  <span>Explore Resources</span>
                  <div className="w-7 h-7 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future expansion notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/75 font-sans">
            Currently supporting S1, S3, and S5 for Computer Science & Engineering (KTU 2024 Scheme).
          </p>
        </div>
      </section>

      {/* 4. About Preview Section */}
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
            Notes Hub is a centralized academic resource platform designed specifically for KTU Computer Science and Engineering students following the 2024 Scheme. Our goal is making module notes, previous year papers, lab records, and video materials easily accessible in one place.
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

      {/* 5. FAQ Preview Section */}
      <section className="w-full max-w-3xl pb-24">
        <div className="text-center mb-10">
          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
            Quick answers regarding our CSE 2024 Scheme repository.
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