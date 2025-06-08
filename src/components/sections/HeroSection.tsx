'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';
import { MagnifyingGlassIcon } from '@/components/ui/Icons';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const content = useContent();
  const { theme } = useTheme();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          perspective: 2000px;
          transform-style: preserve-3d;
        }

        /* Dark mode styles */
        .hero.dark {
          background: linear-gradient(135deg, #1e293b 0%, #374151 50%, #000000 100%);
        }

        .hero.dark .hero-text {
          color: white;
        }

        .hero.dark .hero-title-main {
          background: linear-gradient(to right, white, #f1f5f9, white);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero.dark .hero-title-accent {
          background: linear-gradient(to right, #60a5fa, #3b82f6, #2563eb);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero.dark .hero-subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        .hero.dark .hero-description {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Light mode styles */
        .hero.light {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
        }

        .hero.light .hero-text {
          color: #1e293b;
        }

        .hero.light .hero-title-main {
          background: linear-gradient(to right, #1e293b, #475569, #1e293b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero.light .hero-title-accent {
          background: linear-gradient(to right, #165DFB, #3b82f6, #165DFB);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero.light .hero-subtitle {
          color: rgba(30, 41, 59, 0.9);
        }

        .hero.light .hero-description {
          color: rgba(30, 41, 59, 0.7);
        }
      `}</style>
      <section className={cn(
        "hero relative py-16 px-6 min-h-[60vh] flex items-center transition-colors duration-300",
        theme,
        className
      )}>
        {/* Particle Background */}
        <ParticleBackground />
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight animate-fade-in-up">
            <span className="hero-title-main drop-shadow-lg">
              {content.hero.title1}
            </span><br />
            <span className="hero-title-accent drop-shadow-lg">
              {content.hero.title2}
            </span>
          </h1>
          
          {/* Subtitles */}
          <p className="hero-subtitle text-xl md:text-2xl mb-8 font-medium max-w-3xl mx-auto drop-shadow-md animate-fade-in-up animation-delay-200">
            {content.hero.subtitle1}
          </p>
          <div className="flex flex-row-reverse items-center justify-center gap-4 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            <Image 
              src="/union-logo.png" 
              alt="Union Logo" 
              width={48}
              height={48}
              className="w-8 h-8 md:w-12 md:h-12 object-contain"
            />
            <p className="hero-description text-lg md:text-xl">
              {content.hero.subtitle2}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={cn("flex flex-col sm:flex-row gap-1 justify-center items-center", showButton ? "animate-fade-in-up" : "opacity-0")}>
            <Button
              variant="primary"
              size="lg"
              className="group shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              leftIcon={<MagnifyingGlassIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />}
              onClick={() => window.location.href = '/track'}
            >
              {content.hero.cta1}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;