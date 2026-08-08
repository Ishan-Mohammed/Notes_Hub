import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Target, Users, ShieldCheck, Compass, Sparkles,
  Search, Download, UploadCloud, CheckCircle2, Trophy,
  ChevronDown, ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string, params?: any) => void;
  // Optional element id to smooth-scroll to once this page mounts (e.g. 'faq').
  // Set by callers like LandingPage's "View All FAQs" button, passed through App.tsx.
  scrollTo?: string;
}

const whyPoints = [
  'Easy access to academic resources',
  'Organized by department, semester, and subject',
  'Saves time spent searching for study materials',
  'Encourages peer-to-peer knowledge sharing',
  'Continuously updated by the student community',
];

const howItWorks = [
  {
    icon: Search,
    title: 'Browse Resources',
    description: 'Pick your department and semester to find notes, papers, and materials organized by subject.',
  },
  {
    icon: Download,
    title: 'Download & Learn',
    description: 'Access notes, question papers, and lab manuals instantly — no account required.',
  },
  {
    icon: UploadCloud,
    title: 'Contribute Materials',
    description: 'Have notes or papers that could help others? Submit them to grow the shared library.',
  },
  {
    icon: CheckCircle2,
    title: 'Resources Get Verified',
    description: 'Every submission is reviewed by administrators before it becomes publicly visible.',
  },
  {
    icon: Trophy,
    title: 'Earn Points & Recognition',
    description: 'Approved contributions earn points that count toward your profile and the leaderboard.',
  },
];

const faqs = [
  {
    q: 'What is Notes Hub?',
    a: 'Notes Hub is a platform where students can access and share academic resources such as notes, previous year question papers, lab manuals, assignments, and video lectures.',
  },
  {
    q: 'Is Notes Hub free to use?',
    a: 'Yes. Notes Hub is completely free for students.',
  },
  {
    q: 'Do I need an account to download resources?',
    a: 'No. All resources can be accessed without logging in.',
  },
  {
    q: 'Why should I create an account?',
    a: 'Creating an account lets you submit resources, track your contributions, earn contribution points, and appear on the leaderboard.',
  },
  {
    q: 'How can I contribute resources?',
    a: 'You can submit notes, question papers, lab records, assignments, and other academic materials through the Submit Resource page.',
  },
  {
    q: 'Are submitted resources immediately visible?',
    a: 'No. Resources submitted by users are reviewed by administrators before they are published.',
  },
  {
    q: 'What resources can I contribute?',
    a: 'Module notes, previous year question papers, series questions, model papers, lab manuals, assignments, reference books, and educational videos.',
  },
  {
    q: 'How does the verification process work?',
    a: 'Administrators review submitted resources to ensure they are relevant and useful before approving them for public access.',
  },
  {
    q: 'Will I receive points for contributing?',
    a: 'Yes. Approved contributions can earn points, which contribute to your profile ranking and leaderboard position.',
  },
  {
    q: 'Can I contribute without creating an account?',
    a: 'Yes. Resources can be submitted anonymously, but anonymous contributions do not earn points and will appear under "Anonymous Contributor".',
  },
  {
    q: 'Which departments and semesters are supported?',
    a: 'Our goal is to support all departments and semesters. Coverage will continue to expand as more students contribute resources.',
  },
  {
    q: 'How can I report incorrect or outdated resources?',
    a: 'You can use the feedback/report option available on each resource page, or contact the administrators directly.',
  },
];

const AboutSection: React.FC<{ icon: React.ComponentType<any>; title: string; children: React.ReactNode }> = ({
  icon: Icon,
  title,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
    className="glass-panel p-6 sm:p-8 rounded-2xl border-border/40"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg bg-primary/8 text-primary flex items-center justify-center shrink-0">
        <Icon size={18} className="stroke-[2.2]" />
      </div>
      <h3 className="font-sans font-semibold text-lg sm:text-xl tracking-tight text-foreground">
        {title}
      </h3>
    </div>
    <div className="text-[15px] sm:text-[16px] font-normal text-muted-foreground leading-relaxed">
      {children}
    </div>
  </motion.div>
);

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, scrollTo }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!scrollTo) return;
    // Small delay so the page has laid out (sections, images, motion) before scrolling.
    const timer = setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [scrollTo]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-16">

      {/* Hero */}
      <section className="flex flex-col items-center text-center max-w-3xl mx-auto pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/8 dark:bg-primary/12 border border-primary/20 backdrop-blur-md text-[11px] font-semibold text-primary mb-6 shadow-sm select-none"
        >
          <Sparkles size={11} className="text-secondary" />
          <span>About Notes Hub</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[36px] sm:text-5xl md:text-[56px] font-medium tracking-tight leading-[1.05] mb-6 text-foreground"
        >
          Made for Students,<br />
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent italic font-semibold">
            by Students.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-[18px] font-normal text-muted-foreground leading-relaxed font-sans"
        >
          Notes Hub is a community-driven platform created to make academic resources easily
          accessible to every student. Instead of searching through scattered WhatsApp groups,
          Drive links, and personal chats, everything students need lives in one place.
        </motion.p>
      </section>

      {/* Our Story */}
      <section className="mb-20">
        <div className="mb-8">
          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-2">
            Our Story
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Why we built Notes Hub, and where we want to take it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AboutSection icon={Target} title="Our Goal">
            Our aim is to build a centralized repository of academic resources covering all
            departments and semesters — module notes, previous year question papers, lab
            materials, assignments, and curated video lectures, all under a single platform.
          </AboutSection>

          <AboutSection icon={ShieldCheck} title="Why Notes Hub?">
            <ul className="flex flex-col gap-2">
              {whyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </AboutSection>

          <AboutSection icon={Users} title="Community-Powered Growth">
            The success of Notes Hub depends on active student participation. Students can
            contribute notes, question papers, lab records, and other useful resources to help
            future batches and fellow classmates — every contribution, no matter how small,
            helps build a stronger learning community.
          </AboutSection>

          <AboutSection icon={ShieldCheck} title="Quality and Verification">
            To maintain quality, submitted resources go through a verification process before
            becoming publicly available. This helps ensure content stays relevant, accurate,
            and genuinely useful.
          </AboutSection>
        </div>

        <div className="mt-6">
          <AboutSection icon={Compass} title="Our Vision">
            To become the go-to academic resource hub where every student can quickly find the
            materials they need — and contribute back to the community for future learners.
          </AboutSection>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-20">
        <div className="mb-10 text-center">
          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-2">
            How It Works
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            From finding a resource to becoming a contributor — five steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {howItWorks.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="glass-panel p-5 rounded-2xl border-border/40 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 text-primary flex items-center justify-center">
                    <StepIcon size={17} className="stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-muted-foreground/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="font-sans font-semibold text-[15px] text-foreground tracking-tight">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Join the Community CTA */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 px-6 sm:px-12 py-12 sm:py-16 text-center"
        >
          <GraduationCap size={28} className="mx-auto text-primary mb-4" />
          <h2 className="font-sans font-bold text-2xl sm:text-[34px] tracking-tight text-foreground mb-3">
            Join the Community
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Browse what's already there, or help build the shelf for the next batch. Every note,
            paper, and lab record you share saves someone else hours of searching.
          </p>
          <button
            onClick={() => onNavigate('landing')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>Browse Departments</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="mb-8 text-center">
          <h2 className="font-sans text-2xl sm:text-[32px] font-semibold text-foreground tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Everything else you might want to know.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-2.5">
          {faqs.map((item, index) => {
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
      </section>

    </div>
  );
};