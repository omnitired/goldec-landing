import React from 'react';
import {
  Layout,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  PartnersSection,
  CTASection,
} from '@/components';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
}