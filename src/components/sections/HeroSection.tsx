'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';
import { StarIcon } from '@/components/ui/Icons';
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
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          70% {
            opacity: 0.8;
            transform: translateY(20vh) scale(1.2);
          }
          100% {
            transform: translateY(-10vh) scale(0.8);
            opacity: 0.3;
          }
        }

        @keyframes assembleBar {
          0% {
            transform: translateY(-10vh) scale(0.8);
            opacity: 0.3;
            border-radius: 50%;
          }
          50% {
            opacity: 1;
            transform: translateY(40vh) translateX(calc(var(--target-x) * 0.5)) scale(0.9);
          }
          100% {
            transform: translateY(85vh) translateX(var(--target-x)) scale(1.2);
            opacity: 1;
            border-radius: 3px;
            width: 8px !important;
            height: 12px !important;
          }
        }



        @keyframes assembleBarDark {
          0% {
            transform: translateY(-10vh) scale(0.8);
            opacity: 0.3;
            border-radius: 50%;
          }
          50% {
            opacity: 1;
            transform: translateY(40vh) translateX(calc(var(--target-x) * 0.5)) scale(0.9);
          }
          100% {
            transform: translateY(85vh) translateX(var(--target-x)) scale(1.2);
            opacity: 1;
            background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700) !important;
            border-radius: 3px;
            width: 8px !important;
            height: 12px !important;
            box-shadow: 0 0 15px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.7), 0 0 45px rgba(255, 215, 0, 0.5) !important;
          }
        }

        @keyframes assembleBarLight {
          0% {
            transform: translateY(-10vh) scale(0.8);
            opacity: 0.3;
            border-radius: 50%;
          }
          50% {
            opacity: 1;
            transform: translateY(40vh) translateX(calc(var(--target-x) * 0.5)) scale(0.9);
          }
          100% {
            transform: translateY(85vh) translateX(var(--target-x)) scale(1.2);
            opacity: 1;
            background: linear-gradient(45deg, #B8860B, #8B4513, #B8860B) !important;
            border-radius: 3px;
            width: 8px !important;
            height: 12px !important;
            box-shadow: 0 0 20px rgba(184, 134, 11, 1), 0 0 40px rgba(184, 134, 11, 0.8), 0 0 60px rgba(184, 134, 11, 0.6) !important;
            border: 2px solid rgba(139, 69, 19, 1) !important;
          }
        }

        .hero {
          position: relative;
          overflow: hidden;
        }

        /* Dark mode styles */
        .hero.dark {
          background: linear-gradient(135deg, #1e293b 0%, #374151 50%, #000000 100%);
        }

        .hero.dark .particle {
          background-color: #FFD700;
          box-shadow: 0 0 12px rgba(255, 215, 0, 0.8), 0 0 24px rgba(255, 215, 0, 0.5), 0 0 36px rgba(255, 215, 0, 0.3);
          border: 1px solid rgba(255, 215, 0, 0.6);
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

        .hero.light .particle {
          background: linear-gradient(45deg, #B8860B, #DAA520, #B8860B);
          box-shadow: 0 0 15px rgba(184, 134, 11, 1), 0 0 30px rgba(184, 134, 11, 0.8), 0 0 45px rgba(184, 134, 11, 0.6), inset 0 0 10px rgba(255, 215, 0, 0.5);
          border: 2px solid rgba(184, 134, 11, 0.9);
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

        .hero .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 1;
          z-index: 5;
        }

        .hero.dark .particle {
          animation: 
            floatUp var(--float-duration) linear infinite,
            assembleBarDark 8s linear infinite;
          animation-delay: 
            var(--float-delay),
            calc(var(--float-delay) + var(--float-duration));
        }

        .hero.light .particle {
          animation: 
            floatUp var(--float-duration) linear infinite,
            assembleBarLight 8s linear infinite;
          animation-delay: 
            var(--float-delay),
            calc(var(--float-delay) + var(--float-duration));
        }

        .hero .particle:nth-child(1) {
          width: 12px;
          height: 12px;
          left: 10%;
          --float-duration: 15s;
          --float-delay: 0s;
          --target-x: calc(35vw - 10%);
        }

        .hero .particle:nth-child(2) {
          width: 8px;
          height: 8px;
          left: 20%;
          --float-duration: 12s;
          --float-delay: 2s;
          --target-x: calc(36vw - 20%);
        }

        .hero .particle:nth-child(3) {
          width: 14px;
          height: 14px;
          left: 30%;
          --float-duration: 18s;
          --float-delay: 4s;
          --target-x: calc(37vw - 30%);
        }

        .hero .particle:nth-child(4) {
          width: 6px;
          height: 6px;
          left: 40%;
          --float-duration: 20s;
          --float-delay: 1s;
          --target-x: calc(38vw - 40%);
        }

        .hero .particle:nth-child(5) {
          width: 16px;
          height: 16px;
          left: 50%;
          --float-duration: 14s;
          --float-delay: 3s;
          --target-x: calc(39vw - 50%);
        }

        .hero .particle:nth-child(6) {
          width: 5px;
          height: 5px;
          left: 60%;
          --float-duration: 16s;
          --float-delay: 5s;
          --target-x: calc(40vw - 60%);
        }

        .hero .particle:nth-child(7) {
          width: 7px;
          height: 7px;
          left: 70%;
          --float-duration: 22s;
          --float-delay: 0s;
          --target-x: calc(41vw - 70%);
        }

        .hero .particle:nth-child(8) {
          width: 9px;
          height: 9px;
          left: 80%;
          --float-duration: 13s;
          --float-delay: 6s;
          --target-x: calc(42vw - 80%);
        }

        .hero .particle:nth-child(9) {
          width: 4px;
          height: 4px;
          left: 90%;
          --float-duration: 17s;
          --float-delay: 2s;
          --target-x: calc(43vw - 90%);
        }

        .hero .particle:nth-child(10) {
          width: 8px;
          height: 8px;
          left: 15%;
          --float-duration: 19s;
          --float-delay: 4s;
          --target-x: calc(44vw - 15%);
        }

        .hero .particle:nth-child(11) {
          width: 6px;
          height: 6px;
          left: 25%;
          --float-duration: 11s;
          --float-delay: 1s;
          --target-x: calc(45vw - 25%);
        }

        .hero .particle:nth-child(12) {
          width: 10px;
          height: 10px;
          left: 35%;
          --float-duration: 21s;
          --float-delay: 3s;
          --target-x: calc(46vw - 35%);
        }

        .hero .particle:nth-child(13) {
          width: 11px;
          height: 11px;
          left: 45%;
          --float-duration: 10s;
          --float-delay: 5s;
          --target-x: calc(47vw - 45%);
        }

        .hero .particle:nth-child(14) {
          width: 5px;
          height: 5px;
          left: 55%;
          --float-duration: 16s;
          --float-delay: 0s;
          --target-x: calc(48vw - 55%);
        }

        .hero .particle:nth-child(15) {
          width: 7px;
          height: 7px;
          left: 65%;
          --float-duration: 14s;
          --float-delay: 2s;
          --target-x: calc(49vw - 65%);
        }

        .hero .particle:nth-child(16) {
          width: 6px;
          height: 6px;
          left: 75%;
          --float-duration: 18s;
          --float-delay: 6s;
          --target-x: calc(50vw - 75%);
        }

        .hero .particle:nth-child(17) {
          width: 9px;
          height: 9px;
          left: 85%;
          --float-duration: 12s;
          --float-delay: 1s;
          --target-x: calc(51vw - 85%);
        }

        .hero .particle:nth-child(18) {
          width: 4px;
          height: 4px;
          left: 95%;
          --float-duration: 20s;
          --float-delay: 4s;
          --target-x: calc(52vw - 95%);
        }

        .hero .particle:nth-child(19) {
          width: 12px;
          height: 12px;
          left: 5%;
          --float-duration: 15s;
          --float-delay: 3s;
          --target-x: calc(53vw - 5%);
        }

        .hero .particle:nth-child(20) {
          width: 8px;
          height: 8px;
          left: 12%;
          --float-duration: 17s;
          --float-delay: 5s;
          --target-x: calc(54vw - 12%);
        }
      `}</style>
      <section className={cn(
        "hero relative py-16 px-6 min-h-[60vh] flex items-center transition-colors duration-300",
        theme,
        className
      )}>
        {/* Floating Particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="particle" style={{ opacity: 0.6 }} />
        ))}
        
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
          <p className="hero-subtitle text-xl md:text-2xl mb-6 font-medium max-w-3xl mx-auto drop-shadow-md animate-fade-in-up animation-delay-200">
            {content.hero.subtitle1}
          </p>
          <p className="hero-description text-lg md:text-xl mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            {content.hero.subtitle2}
          </p>
          
          {/* CTA Buttons */}
          <div className={cn("flex flex-col sm:flex-row gap-6 justify-center items-center", showButton ? "animate-fade-in-up" : "opacity-0")}>
            <Button
              variant="primary"
              size="lg"
              className="group shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              leftIcon={<StarIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
              onClick={() => window.location.href = '/inquiry'}
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