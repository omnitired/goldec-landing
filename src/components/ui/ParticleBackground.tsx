import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const particlesRef = React.useRef<NodeListOf<Element> | null>(null);

  React.useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    particlesRef.current = particles;

    const handleCollision = (particle: Element) => {
      const htmlParticle = particle as HTMLElement;
      const currentX = parseFloat(htmlParticle.style.getPropertyValue('--collision-offset-x') || '0');
      const currentY = parseFloat(htmlParticle.style.getPropertyValue('--collision-offset-y') || '0');
      
      particles.forEach(other => {
        if (particle !== other) {
          const rect1 = particle.getBoundingClientRect();
          const rect2 = other.getBoundingClientRect();
          
          if (Math.hypot(rect1.left - rect2.left, rect1.top - rect2.top) < 50) {
            const angle = Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left);
            const force = 30;
            
            htmlParticle.style.setProperty('--collision-offset-x', `${currentX + Math.cos(angle) * force}px`);
            htmlParticle.style.setProperty('--collision-offset-y', `${currentY + Math.sin(angle) * force}px`);
          }
        }
      });
    };

    let animationId: number;
    
    const animationFrame = () => {
      particles.forEach(particle => {
        handleCollision(particle);
        const htmlParticle = particle as HTMLElement;
        htmlParticle.style.transform = `translate3d(
          ${parseFloat(htmlParticle.style.getPropertyValue('--collision-offset-x') || '0')}px,
          ${parseFloat(htmlParticle.style.getPropertyValue('--collision-offset-y') || '0')}px,
          0
        )`;
      });
      animationId = requestAnimationFrame(animationFrame);
    };
    
    animationId = requestAnimationFrame(animationFrame);
    return () => cancelAnimationFrame(animationId);
  }, []);
  const { theme } = useTheme();

  return (
    <>
      <style jsx>{`
d        @keyframes organicFloat {
          0%, 100% {
            transform: 
              translate(
                calc(var(--start-offset-x, 0px) + var(--drift-x) * 0.8 + var(--collision-offset-x, 0px)), 
                calc(var(--start-offset-y, 0px) + var(--drift-y) * 0.6 + var(--gravity-y, 0px) * 0.3 + var(--collision-offset-y, 0px))
              ) 
              rotate(calc(var(--rotation) * 0.25));
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          0%, 100% {
            transform: 
              translate(
                calc(var(--start-offset-x, 0px) + var(--drift-x) * 0.8), 
                calc(var(--start-offset-y, 0px) + var(--drift-y) * 0.6 + var(--gravity-y, 0px) * 0.3)
              ) 
              rotate(calc(var(--rotation) * 0.25));
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          25% {
            transform: 
              translate(
                calc(var(--start-offset-x, 0px) + var(--drift-x) * 1.4), 
                calc(var(--start-offset-y, 0px) + var(--drift-y) * 1.1 + var(--gravity-y, 0px) * 0.6)
              ) 
              rotate(calc(var(--rotation) * 0.375));
          }
          50% {
            transform: 
              translate(
                calc(var(--start-offset-x, 0px) + var(--drift-x) * 2.0), 
                calc(var(--start-offset-y, 0px) + var(--drift-y) * 1.5 + var(--gravity-y, 0px) * 1.0)
              ) 
              rotate(calc(var(--rotation) * 0.5));
          }
          75% {
            transform: 
              translate(
                calc(var(--start-offset-x, 0px) + var(--drift-x) * 2.6), 
                calc(var(--start-offset-y, 0px) + var(--drift-y) * 2.0 + var(--gravity-y, 0px) * 1.8)
              ) 
              rotate(calc(var(--rotation) * 0.75));
          }
        }

        @keyframes fluidPulse {
          0%, 100% {
            transform: scale(calc(var(--scale) * 0.98));
            opacity: calc(var(--opacity) * 0.92);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          33% {
            transform: scale(calc(var(--scale) * 1.08));
            opacity: calc(var(--opacity) * 0.85);
          }
          66% {
            transform: scale(calc(var(--scale) * 0.92));
            opacity: calc(var(--opacity) * 1.0);
          }
        }

        @keyframes dynamicGlowDark {
          0% {
            box-shadow: 
              0 0 var(--glow-size) rgba(255, 215, 0, var(--glow-opacity)),
              0 0 calc(var(--glow-size) * 2) rgba(255, 215, 0, calc(var(--glow-opacity) * 0.3)),
              0 4px 8px rgba(0, 0, 0, 0.3);
            filter: brightness(1) saturate(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          }
          16% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.3) rgba(255, 215, 0, calc(var(--glow-opacity) * 1.2)),
              0 0 calc(var(--glow-size) * 2.6) rgba(255, 215, 0, calc(var(--glow-opacity) * 0.4)),
              0 6px 12px rgba(0, 0, 0, 0.4);
            filter: brightness(1.1) saturate(1.1) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
          }
          33% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.6) rgba(255, 215, 0, calc(var(--glow-opacity) * 1.4)),
              0 0 calc(var(--glow-size) * 3.2) rgba(255, 215, 0, calc(var(--glow-opacity) * 0.5)),
              0 8px 16px rgba(0, 0, 0, 0.5);
            filter: brightness(1.2) saturate(1.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
          }
          50% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.8) rgba(255, 215, 0, calc(var(--glow-opacity) * 1.5)),
              0 0 calc(var(--glow-size) * 3.6) rgba(255, 215, 0, calc(var(--glow-opacity) * 0.6)),
              0 10px 20px rgba(0, 0, 0, 0.6);
            filter: brightness(1.3) saturate(1.3) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.5));
          }
          66% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.4) rgba(255, 215, 0, calc(var(--glow-opacity) * 1.3)),
              0 0 calc(var(--glow-size) * 2.8) rgba(255, 215, 0, calc(var(--glow-opacity) * 0.45)),
              0 7px 14px rgba(0, 0, 0, 0.45);
            filter: brightness(1.15) saturate(1.15) drop-shadow(0 3.5px 7px rgba(0, 0, 0, 0.35));
          }
          83% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.1) rgba(255, 215, 0, calc(var(--glow-opacity) * 1.1)),
              0 0 calc(var(--glow-size) * 2.2) rgba(255, 215, 0, calc(var(--glow-opacity) * 0.35)),
              0 5px 10px rgba(0, 0, 0, 0.35);
            filter: brightness(1.05) saturate(1.05) drop-shadow(0 2.5px 5px rgba(0, 0, 0, 0.25));
          }
          100% {
            box-shadow: 
              0 0 var(--glow-size) rgba(255, 215, 0, var(--glow-opacity)),
              0 0 calc(var(--glow-size) * 2) rgba(255, 215, 0, calc(var(--glow-opacity) * 0.3)),
              0 4px 8px rgba(0, 0, 0, 0.3);
            filter: brightness(1) saturate(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          }
        }

        @keyframes dynamicGlowLight {
          0% {
            box-shadow: 
              0 0 var(--glow-size) rgba(184, 134, 11, var(--glow-opacity)),
              0 0 calc(var(--glow-size) * 2) rgba(184, 134, 11, calc(var(--glow-opacity) * 0.4)),
              0 8px 16px rgba(0, 0, 0, 0.25),
              inset 0 3px 6px rgba(255, 255, 255, 0.4);
            filter: brightness(1) saturate(1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          }
          16% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.3) rgba(184, 134, 11, calc(var(--glow-opacity) * 1.2)),
              0 0 calc(var(--glow-size) * 2.6) rgba(184, 134, 11, calc(var(--glow-opacity) * 0.5)),
              0 10px 20px rgba(0, 0, 0, 0.3),
              inset 0 4px 8px rgba(255, 255, 255, 0.5);
            filter: brightness(1.1) saturate(1.1) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.25));
          }
          33% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.6) rgba(184, 134, 11, calc(var(--glow-opacity) * 1.4)),
              0 0 calc(var(--glow-size) * 3.2) rgba(184, 134, 11, calc(var(--glow-opacity) * 0.6)),
              0 12px 24px rgba(0, 0, 0, 0.35),
              inset 0 5px 10px rgba(255, 255, 255, 0.6);
            filter: brightness(1.2) saturate(1.2) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3));
          }
          50% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.8) rgba(184, 134, 11, calc(var(--glow-opacity) * 1.5)),
              0 0 calc(var(--glow-size) * 3.6) rgba(184, 134, 11, calc(var(--glow-opacity) * 0.7)),
              0 14px 28px rgba(0, 0, 0, 0.4),
              inset 0 6px 12px rgba(255, 255, 255, 0.7);
            filter: brightness(1.3) saturate(1.3) drop-shadow(0 7px 14px rgba(0, 0, 0, 0.35));
          }
          66% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.4) rgba(184, 134, 11, calc(var(--glow-opacity) * 1.3)),
              0 0 calc(var(--glow-size) * 2.8) rgba(184, 134, 11, calc(var(--glow-opacity) * 0.55)),
              0 11px 22px rgba(0, 0, 0, 0.32),
              inset 0 4.5px 9px rgba(255, 255, 255, 0.55);
            filter: brightness(1.15) saturate(1.15) drop-shadow(0 5.5px 11px rgba(0, 0, 0, 0.28));
          }
          83% {
            box-shadow: 
              0 0 calc(var(--glow-size) * 1.1) rgba(184, 134, 11, calc(var(--glow-opacity) * 1.1)),
              0 0 calc(var(--glow-size) * 2.2) rgba(184, 134, 11, calc(var(--glow-opacity) * 0.45)),
              0 9px 18px rgba(0, 0, 0, 0.28),
              inset 0 3.5px 7px rgba(255, 255, 255, 0.45);
            filter: brightness(1.05) saturate(1.05) drop-shadow(0 4.5px 9px rgba(0, 0, 0, 0.22));
          }
          100% {
            box-shadow: 
              0 0 var(--glow-size) rgba(184, 134, 11, var(--glow-opacity)),
              0 0 calc(var(--glow-size) * 2) rgba(184, 134, 11, calc(var(--glow-opacity) * 0.4)),
              0 8px 16px rgba(0, 0, 0, 0.25),
              inset 0 3px 6px rgba(255, 255, 255, 0.4);
            filter: brightness(1) saturate(1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          }
        }

        .particle-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.8;
          transform-style: preserve-3d;
          transform-origin: center center;
          overflow: hidden;
          will-change: transform, opacity;
          left: var(--start-x);
          top: var(--start-y);
        }

        /* Dark mode particle styles */
        .particle-container.dark .particle {
          background: radial-gradient(circle at 40% 30%, rgba(255, 215, 0, 0.4), rgba(255, 165, 0, 0.2), rgba(255, 215, 0, 0.1));
          box-shadow: 
            0 0 15px rgba(255, 215, 0, 0.3),
            0 0 30px rgba(255, 215, 0, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 215, 0, 0.2);
          backdrop-filter: blur(2px);
          transform-style: preserve-3d;
          perspective: 1000px;
          animation: 
            organicFloat var(--float-duration) cubic-bezier(0.4, 0, 0.6, 1) infinite,
            fluidPulse var(--pulse-duration) linear infinite,
            dynamicGlowDark var(--glow-duration) cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 
            var(--float-delay),
            calc(var(--float-delay) + var(--pulse-offset)),
            calc(var(--float-delay) + var(--glow-offset));
        }

        /* Light mode particle styles */
        .particle-container.light .particle {
          background: radial-gradient(circle at 40% 30%, rgba(218, 165, 32, 0.6), rgba(184, 134, 11, 0.4), rgba(218, 165, 32, 0.3));
          box-shadow: 
            0 0 15px rgba(184, 134, 11, 0.5),
            0 0 30px rgba(184, 134, 11, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(184, 134, 11, 0.4);
          backdrop-filter: blur(2px);
          transform-style: preserve-3d;
          perspective: 1000px;
          animation: 
            organicFloat var(--float-duration) cubic-bezier(0.4, 0, 0.6, 1) infinite,
            fluidPulse var(--pulse-duration) linear infinite,
            dynamicGlowLight var(--glow-duration) cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 
            var(--float-delay),
            calc(var(--float-delay) + var(--pulse-offset)),
            calc(var(--float-delay) + var(--glow-offset));
        }

        /* Individual particle configurations */
        .particle:nth-child(1) {
          width: 42px;
          height: 42px;
          --start-x: 8vw;
          --start-y: 12vh;
          --scale: 1.0;
          --opacity: 0.65;
          --float-duration: 240s;
          --float-delay: 0s;
          --pulse-duration: 160s;
          --pulse-offset: 3s;
          --glow-duration: 180s;
          --glow-offset: 1.5s;
          --drift-x: 1200px;
          --drift-y: 800px;
          --gravity-y: 1400px;
          --rotation: 1440deg;
          --glow-size: 45px;
          --glow-opacity: 0.6;
          --start-offset-x: 0px;
          --start-offset-y: 0px;
        }

        .particle:nth-child(2) {
          width: 36px;
          height: 36px;
          --start-x: 22vw;
          --start-y: 68vh;
          --scale: 0.85;
          --opacity: 0.55;
          --float-duration: 280s;
          --float-delay: 20s;
          --pulse-duration: 185s;
          --pulse-offset: 7s;
          --glow-duration: 220s;
          --glow-offset: 9s;
          --drift-x: -950px;
          --drift-y: -600px;
          --gravity-y: 1250px;
          --rotation: -1080deg;
          --glow-size: 40px;
          --glow-opacity: 0.55;
          --start-offset-x: 50px;
          --start-offset-y: -30px;
        }

        .particle:nth-child(3) {
          width: 48px;
          height: 48px;
          --start-x: 73vw;
          --start-y: 8vh;
          --scale: 1.15;
          --opacity: 0.75;
          --float-duration: 200s;
          --float-delay: 30s;
          --pulse-duration: 140s;
          --pulse-offset: 5s;
          --glow-duration: 170s;
          --glow-offset: 12s;
          --drift-x: 1300px;
          --drift-y: 950px;
          --gravity-y: 1600px;
          --rotation: 1800deg;
          --glow-size: 50px;
          --glow-opacity: 0.65;
          --start-offset-x: -40px;
          --start-offset-y: 20px;
        }

        .particle:nth-child(4) {
          width: 28px;
          height: 28px;
          --start-x: 89vw;
          --start-y: 52vh;
          --scale: 0.7;
          --opacity: 0.45;
          --float-duration: 320s;
          --float-delay: 40s;
          --pulse-duration: 205s;
          --pulse-offset: 11s;
          --glow-duration: 145s;
          --glow-offset: 6s;
          --drift-x: -850px;
          --drift-y: -450px;
          --gravity-y: 1150px;
          --rotation: -720deg;
          --glow-size: 35px;
          --glow-opacity: 0.5;
          --start-offset-x: 30px;
          --start-offset-y: -15px;
        }

        .particle:nth-child(5) {
          width: 40px;
          height: 40px;
          --start-x: 47vw;
          --start-y: 78vh;
          --scale: 0.95;
          --opacity: 0.6;
          --float-duration: 260s;
          --float-delay: 50s;
          --pulse-duration: 165s;
          --pulse-offset: 8s;
          --glow-duration: 185s;
          --glow-offset: 15s;
          --drift-x: 1100px;
          --drift-y: -720px;
          --gravity-y: 1500px;
          --rotation: 1260deg;
          --glow-size: 46px;
          --glow-opacity: 0.6;
          --start-offset-x: -25px;
          --start-offset-y: 35px;
        }

        .particle:nth-child(6) {
          width: 33px;
          height: 33px;
          --start-x: 12vw;
          --start-y: 85vh;
          --scale: 0.8;
          --opacity: 0.5;
          --float-duration: 220s;
          --float-delay: 60s;
          --pulse-duration: 145s;
          --pulse-offset: 13s;
          --glow-duration: 125s;
          --glow-offset: 18s;
          --drift-x: -1200px;
          --drift-y: -850px;
          --gravity-y: 1350px;
          --rotation: -1620deg;
          --glow-size: 38px;
          --glow-opacity: 0.55;
          --start-offset-x: 60px;
          --start-offset-y: -40px;
        }

        .particle:nth-child(7) {
          width: 45px;
          height: 45px;
          --start-x: 82vw;
          --start-y: 18vh;
          --scale: 1.05;
          --opacity: 0.65;
          --float-duration: 300s;
          --float-delay: 10s;
          --pulse-duration: 180s;
          --pulse-offset: 4s;
          --glow-duration: 160s;
          --glow-offset: 10s;
          --drift-x: 1000px;
          --drift-y: 1200px;
          --gravity-y: 1550px;
          --rotation: 2160deg;
          --glow-size: 48px;
          --glow-opacity: 0.62;
          --start-offset-x: -35px;
          --start-offset-y: 25px;
        }

        .particle:nth-child(8) {
          width: 31px;
          height: 31px;
          --start-x: 38vw;
          --start-y: 5vh;
          --scale: 0.75;
          --opacity: 0.5;
          --float-duration: 340s;
          --float-delay: 70s;
          --pulse-duration: 200s;
          --pulse-offset: 16s;
          --glow-duration: 240s;
          --glow-offset: 22s;
          --drift-x: -480px;
          --drift-y: 950px;
          --gravity-y: 1200px;
          --rotation: -2520deg;
          --glow-size: 36px;
          --glow-opacity: 0.52;
          --start-offset-x: 45px;
          --start-offset-y: -20px;
        }
      `}</style>
      
      <div className={cn("particle-container", theme, className)}>
        {/* Main Particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="particle" />
        ))}
        
        {/* Additional Random Particles */}
        <span className="particle" style={{
          '--start-x': '5vw',
          '--start-y': '35vh',
          '--drift-x': '550px',
          '--drift-y': '-200px',
          '--gravity-y': '530px',
          '--rotation': '1440deg',
          '--float-duration': '360s',
          '--float-delay': '80s',
          '--pulse-duration': '220s',
          '--pulse-offset': '19s',
          '--glow-duration': '260s',
          '--glow-offset': '25s',
          '--scale': '0.9',
          '--opacity': '0.55',
          '--glow-size': '44px',
          '--glow-opacity': '0.58',
          '--start-offset-x': '20px',
          '--start-offset-y': '-10px',
          width: '37px',
          height: '37px'
        } as React.CSSProperties} />
        
        <span className="particle" style={{
          '--start-x': '65vw',
          '--start-y': '88vh',
          '--drift-x': '-430px',
          '--drift-y': '-350px',
          '--gravity-y': '650px',
          '--rotation': '-1080deg',
          '--float-duration': '400s',
          '--float-delay': '90s',
          '--pulse-duration': '240s',
          '--pulse-offset': '21s',
          '--glow-duration': '200s',
          '--glow-offset': '27s',
          '--scale': '1.1',
          '--opacity': '0.7',
          '--glow-size': '52px',
          '--glow-opacity': '0.68',
          '--start-offset-x': '-50px',
          '--start-offset-y': '30px',
          width: '46px',
          height: '46px'
        } as React.CSSProperties} />
        
        <span className="particle" style={{
          '--start-x': '92vw',
          '--start-y': '72vh',
          '--drift-x': '330px',
          '--drift-y': '230px',
          '--gravity-y': '430px',
          '--rotation': '1620deg',
          '--float-duration': '280s',
          '--float-delay': '55s',
          '--pulse-duration': '160s',
          '--pulse-offset': '14s',
          '--glow-duration': '180s',
          '--glow-offset': '17s',
          '--scale': '0.65',
          '--opacity': '0.4',
          '--glow-size': '36px',
          '--glow-opacity': '0.48',
          '--start-offset-x': '15px',
          '--start-offset-y': '-25px',
          width: '26px',
          height: '26px'
        } as React.CSSProperties} />
        
        <span className="particle" style={{
          '--start-x': '28vw',
          '--start-y': '42vh',
          '--drift-x': '-480px',
          '--drift-y': '350px',
          '--gravity-y': '580px',
          '--rotation': '-1440deg',
          '--float-duration': '320s',
          '--float-delay': '65s',
          '--pulse-duration': '185s',
          '--pulse-offset': '12s',
          '--glow-duration': '225s',
          '--glow-offset': '23s',
          '--scale': '0.85',
          '--opacity': '0.6',
          '--glow-size': '41px',
          '--glow-opacity': '0.56',
          '--start-offset-x': '40px',
          '--start-offset-y': '-18px',
          width: '34px',
          height: '34px'
        } as React.CSSProperties} />
      </div>
    </>
  );
};

export default ParticleBackground;