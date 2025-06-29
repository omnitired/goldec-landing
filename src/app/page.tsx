import React from 'react';
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  PartnersSection,
} from '@/components';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className={cn("min-h-screen bg-background font-sans transition-colors duration-300")}>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        {/* <StatsSection /> */}
        <PartnersSection />
        {/* <CTASection /> */}
      </main>
      <Footer />
    </div>
  );
}