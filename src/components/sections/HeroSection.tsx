'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import Button from '@/components/ui/Button';
import { StarIcon, ArrowRightIcon } from '@/components/ui/Icons';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const content = useContent();

  return (
    <section className={cn(
      "relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-32 px-6 overflow-hidden",
      className
    )}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-amber-600/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(234,179,8,0.1)_0%,transparent_50%)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.1)_0%,transparent_50%)] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl inline-flex items-center px-6 py-3 mb-10 border border-white/20 shadow-xl">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-3" />
          <span className="text-sm font-semibold text-white/90">
            {content.hero.badge}
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
          {content.hero.title1}<br />
          <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            {content.hero.title2}
          </span>
        </h1>
        
        {/* Subtitles */}
        <p className="text-xl md:text-2xl mb-6 text-gray-300 font-medium max-w-3xl mx-auto">
          {content.hero.subtitle1}
        </p>
        <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
          {content.hero.subtitle2}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            className="group"
            leftIcon={<StarIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
          >
            {content.hero.cta1}
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            className="group"
            leftIcon={<ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
          >
            {content.hero.cta2}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;