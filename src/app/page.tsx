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
import AdminNavLink from '@/components/ui/AdminNavLink';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <PartnersSection />
      <CTASection />
      <AdminNavLink />
    </Layout>
  );
}