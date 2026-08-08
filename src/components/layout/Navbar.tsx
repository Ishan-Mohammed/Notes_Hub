import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, X, GraduationCap, Home, BookOpen, Info, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate: (page: string, params?: any) => void;
  currentPage: string;
}

// Id of the department grid section on LandingPage.tsx. Keep these two in sync.
const DEPARTMENTS_SECTION_ID = 'browse-departments';

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  // 'resources' has no dedicated page, so currentPage can never match it and give it a
  // persistent highlight. This gives it a brief highlight flash on click instead, so it
  // still feels responsive rather than silently doing nothing visually.
  const [flashingValue, setFlashingValue] = useState<string | null>(null);

  const navItems = [
    { label: 'Home', value: 'landing', icon: Home },
    { label: 'Resources', value: 'resources', icon: BookOpen }, // Scroll-only: jumps to the department grid on landing
    { label: 'About', value: 'about', icon: Info },             // Real navigation: goes to the /about page
  ];

  const scrollToDepartments = () => {
    const el = document.getElementById(DEPARTMENTS_SECTION_ID);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Not on the landing page — navigate there first, then scroll once it mounts.
      onNavigate('landing');
      setTimeout(() => {
        document.getElementById(DEPARTMENTS_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleNavClick = (value: string) => {
    if (value === 'resources') {
      setFlashingValue('resources');
      setTimeout(() => setFlashingValue(null), 600);
      scrollToDepartments();
    } else {
      onNavigate(value);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="glass-nav rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300">
        
        {/* Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group animate-float"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <GraduationCap size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Notes <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic font-semibold">Hub</span>
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.value === 'resources'
                ? flashingValue === 'resources'
                : currentPage === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 overflow-hidden group cursor-pointer ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute inset-0 bg-primary/8 dark:bg-primary/12 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions (Login, Theme, Menu) */}
        <div className="flex items-center gap-2">
          {/* Login (placeholder for future admin page) */}
          <button
            onClick={() => onNavigate('login')}
            className={`hidden sm:flex px-4 py-2 rounded-xl text-sm font-medium items-center gap-2 transition-all duration-300 border cursor-pointer ${
              currentPage === 'login'
                ? 'text-primary bg-primary/8 dark:bg-primary/12 border-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent hover:border-border/30'
            }`}
          >
            <LogIn size={16} />
            <span>Login</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-300 border border-transparent hover:border-border/30 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Menu Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-300 cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 glass-panel rounded-2xl p-4 mt-2 flex flex-col gap-2 md:hidden z-40 border border-border/40 shadow-xl"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.value === 'resources'
                  ? flashingValue === 'resources'
                  : currentPage === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    handleNavClick(item.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-primary/8 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Login (mobile) */}
            <button
              onClick={() => {
                onNavigate('login');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl text-left text-sm font-medium flex items-center gap-3 transition-colors ${
                currentPage === 'login'
                  ? 'bg-primary/8 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};