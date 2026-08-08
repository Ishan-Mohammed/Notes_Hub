import React from 'react';
import { GraduationCap, Github } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full mt-auto border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
            <GraduationCap size={16} />
          </div>
          <span className="font-display font-bold text-md tracking-tight">
            Notes <span className="text-primary">Hub</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <button 
            onClick={() => onNavigate('landing')}
            className="hover:text-foreground transition-colors duration-200 cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('landing')}
            className="hover:text-foreground transition-colors duration-200 cursor-pointer"
          >
            Browse
          </button>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-200"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
        </div>

        {/* Copy */}
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Notes Hub. Built with ❤️ by the CS NotesHub Core Team.
        </div>

      </div>
    </footer>
  );
};
