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
      "relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-16 px-6 overflow-hidden min-h-[60vh] flex items-center transition-colors duration-300",
      className
    )}>
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/25 via-amber-600/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-35">
        <img 
          src="/hero-back.png" 
          alt="Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>
      

      
      <div className="relative max-w-7xl mx-auto text-center">

        
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg">
            {content.hero.title1}
          </span><br />
          <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
            {content.hero.title2}
          </span>
        </h1>
        
        {/* Subtitles */}
        <p className="text-xl md:text-2xl mb-6 text-white/90 font-medium max-w-3xl mx-auto drop-shadow-md">
          {content.hero.subtitle}
        </p>
        <p className="text-lg md:text-xl mb-12 text-white/70 max-w-2xl mx-auto">
          {content.hero.description}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            className="group shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
            leftIcon={<StarIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
            onClick={() => window.location.href = '/inquiry'}
          >
            {content.hero.cta1}
          </Button>
          
          {/* <Button
            variant="secondary"
            size="lg"
            className="group shadow-xl hover:shadow-white/20 transition-all duration-300"
            leftIcon={<ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
          >
            {content.hero.cta2}
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;