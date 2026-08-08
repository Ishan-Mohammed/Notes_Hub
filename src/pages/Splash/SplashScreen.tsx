import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // End the splash screen after 2.8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        filter: "blur(15px)",
        scale: 1.02,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background noise-overlay grid-bg select-none overflow-hidden"
    >
      {/* Ambient glows inside splash screen for styling consistency */}
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      
      {/* Logo and Tagline Wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Animated Icon & Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3.5"
        >
          {/* Logo Cap Icon with soft blue glow */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-xl shadow-primary/25 border border-primary/20"
          >
            <GraduationCap size={32} className="stroke-[2.2]" />
          </motion.div>
          
          <h1 className="font-serif font-medium text-5xl sm:text-6xl tracking-tight text-foreground">
            Notes <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic font-semibold">Hub</span>
          </h1>
        </motion.div>

        {/* Subtext Tagline (Letter spacing tightens, fade up) */}
        <motion.p
          initial={{ opacity: 0, y: 15, letterSpacing: "0.15em" }}
          animate={{ opacity: 0.85, y: 0, letterSpacing: "0.01em" }}
          transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-sm sm:text-base font-medium text-muted-foreground max-w-md leading-relaxed"
        >
          Everything a Student Needs,<br />
          <span className="text-foreground/95 font-semibold">All in One Hub.</span>
        </motion.p>
      </div>

      {/* Thin Premium Loading Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-muted/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </motion.div>
  );
};
