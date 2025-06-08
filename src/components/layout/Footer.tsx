'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { PhoneIcon } from '@/components/ui/Icons';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const content = useContent();

  return (
    <footer className={cn(
      "py-8 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 dark:from-slate-950/95 dark:via-gray-950/95 dark:to-slate-950/95 backdrop-blur-xl border-t border-blue-500/20 dark:border-blue-400/30 text-white relative overflow-hidden",
      className
    )}>
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
      
      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Main content */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-black mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            {content.brand}
          </h3>
          <p className="text-white/70 dark:text-white/70 text-sm leading-relaxed">
            {content.footer.aboutText}
          </p>
        </div>

        {/* Contact info */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 space-x-reverse bg-white/10 dark:bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-blue-500/20 dark:border-blue-400/30 shadow-xl shadow-black/20 dark:shadow-black/40">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <PhoneIcon className="w-4 h-4 text-white drop-shadow-lg" />
            </div>
            <span className="font-medium text-white text-sm">{content.footer.phone}</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-blue-500/20 dark:border-blue-400/30">
          <p className="text-xs text-white/60 dark:text-white/60">
            &copy; {new Date().getFullYear()} {content.brand}. {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;