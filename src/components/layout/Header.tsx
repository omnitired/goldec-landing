'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { ShieldIcon, MenuIcon } from '@/components/ui/Icons';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const content = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/inquiry', label: 'استعلام', isRoute: true },
    { href: '#features', label: content.nav.features },
    { href: '#how-it-works', label: content.nav.howItWorks },
    // { href: '#stats', label: content.nav.stats },
    { href: '#partners', label: 'سکو‌ها' },
    { href: '#contact', label: content.nav.contact },
  ];

  const handleNavigation = (item: { href: string; label: string; isRoute?: boolean }) => {
    if (item.isRoute) {
      window.location.href = item.href;
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 dark:from-slate-950/95 dark:via-gray-950/95 dark:to-slate-950/95 backdrop-blur-xl border-b border-blue-500/20 dark:border-blue-400/30 text-white py-4 px-6 shadow-2xl shadow-black/20 dark:shadow-black/40",
      className
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 space-x-reverse group">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
            <ShieldIcon className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
          <div className="text-2xl font-black bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            {content.brand}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 space-x-reverse">
          <ThemeToggle />
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item)}
              className="relative px-3 py-2 text-white/90 hover:text-blue-400 transition-all duration-300 font-semibold hover:scale-105 cursor-pointer group"
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4 space-x-reverse">
          <ThemeToggle />
          <button
            className="p-3 hover:bg-white/10 dark:hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 border border-white/20 dark:border-white/20 hover:border-blue-400/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-blue-500/20">
          <div className="flex flex-col space-y-3 pt-4 px-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item)}
                className="text-right py-3 px-4 text-white/90 dark:text-white/90 hover:text-blue-400 hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-all duration-300 font-semibold border border-transparent hover:border-blue-400/30"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;