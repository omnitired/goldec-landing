'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { useTheme } from '@/contexts/ThemeContext';
import { ShieldIcon, MenuIcon } from '@/components/ui/Icons';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const content = useContent();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { href: '/track', label: 'رهگیری تراکنش', isRoute: true },
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
      // Check if we're on the homepage
      const isHomepage = window.location.pathname === '/';
      
      if (isHomepage) {
        // If on homepage, scroll to the element
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If not on homepage, redirect to homepage with hash
        window.location.href = `/${item.href}`;
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav data-theme={theme} className={cn(
      "sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 dark:from-slate-950/95 dark:via-gray-950/95 dark:to-slate-950/95 backdrop-blur-xl border-b border-blue-500/20 dark:border-blue-400/30 text-white py-4 px-6 shadow-2xl shadow-black/20 dark:shadow-black/40",
      className
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section - Brand identity with icon and text */}
        <div 
          onClick={() => isClient && (window.location.href = '/')}
          className="flex items-center space-x-6 space-x-reverse group cursor-pointer"
        >
          {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
            <ShieldIcon className="w-7 h-7 text-white drop-shadow-lg" />
          </div> */}
          <div className="text-2xl font-black bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            {content.brand}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 space-x-reverse">
          {navItems.map((item, index) => (
            <button
              key={`${item.href}-${item.label}-${index}`}
              onClick={() => handleNavigation(item)}
              className="relative px-3 py-2 text-white/90 hover:text-blue-400 transition-all duration-300 font-semibold hover:scale-105 cursor-pointer group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-6 space-x-reverse">
          <ThemeToggle />
          <button
            className="p-3 hover:bg-white/10 dark:hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
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
            {navItems.map((item, index) => (
              <button
                key={`mobile-${item.href}-${item.label}-${index}`}
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