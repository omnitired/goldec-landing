'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { ShieldIcon, MenuIcon } from '@/components/ui/Icons';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const content = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#features', label: content.nav.features },
    { href: '#how-it-works', label: content.nav.howItWorks },
    { href: '#stats', label: content.nav.stats },
    { href: '#contact', label: content.nav.contact },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 text-gray-900 py-4 px-6 shadow-sm",
      className
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <ShieldIcon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            {content.brand}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 space-x-reverse">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="hover:text-yellow-600 transition-all duration-300 font-medium text-gray-700 hover:scale-105 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4 pt-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-right py-2 px-4 text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-lg transition-colors"
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