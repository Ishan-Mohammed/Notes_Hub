import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SplashScreen } from './pages/Splash/SplashScreen';
import { LandingPage } from './pages/Landing/LandingPage';
import { SemesterPage } from './pages/Semester/SemesterPage';
import { SemesterSelectPage } from './pages/Semester/SemesterSelectPage';
import { SubjectDashboard } from './pages/Dashboard/SubjectDashboard';
import { AboutPage } from './pages/About/AboutPage';

function AppInner() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing');
  const [navParams, setNavParams] = useState<any>({});
  const handleNavigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    
    // Smooth scroll page back to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="relative min-h-screen">
      {/* Splash Screen - Overlay sits exactly on top with fixed z-[9999] */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      {/* Main Application Layout (Mounted in parallel, preloaded underneath the splash screen) */}
      <div className="relative min-h-screen flex flex-col noise-overlay grid-bg bg-background select-none">
        {/* Ambient light glow backdrops */}
        <div className="absolute inset-0 ambient-glow pointer-events-none z-0" />
        <div className="absolute inset-0 ambient-glow-bottom pointer-events-none z-0" />
        
        {/* Floating Glassmorphic Navbar */}
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        {/* Dynamic Page Viewer with transitions */}
        <main className="relative z-10 flex-grow w-full">
          <AnimatePresence mode="wait">
            {currentPage === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <LandingPage onNavigate={handleNavigate} />
              </motion.div>
            )}
            {currentPage === 'semesterSelect' && (
              <motion.div
                key="semesterSelect"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <SemesterSelectPage
                  onNavigate={handleNavigate}
                  departmentId={navParams.departmentId}
                  departmentName={navParams.departmentName}
                  departmentCode={navParams.departmentCode}
                />
              </motion.div>
            )}
            {currentPage === 'semester' && (
              <motion.div
                key="semester"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <SemesterPage 
                  onNavigate={handleNavigate} 
                  initialSemester={navParams.initialSemester}
                  departmentId={navParams.departmentId}
                />
              </motion.div>
            )}
            {currentPage === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <SubjectDashboard 
                  subjectId={navParams.subjectId} 
                  onNavigate={handleNavigate} 
                />
              </motion.div>
            )}
            {currentPage === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <AboutPage
                  onNavigate={handleNavigate}
                  scrollTo={navParams.scrollTo}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {/* Minimal Premium Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
export default App;