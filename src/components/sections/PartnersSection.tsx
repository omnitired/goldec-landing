'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';

interface PartnersSectionProps {
  className?: string;
}

const PartnerCard: React.FC<{
  logoText: string;
}> = ({ logoText }) => (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center aspect-square flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-300 group hover:scale-105">
    <div className="text-lg font-bold text-gray-600 group-hover:text-gray-800 transition-colors">
      {logoText}
    </div>
  </div>
);

const PartnersSection: React.FC<PartnersSectionProps> = ({ className }) => {
  const content = useContent();

  const partners = [
    content.partners.logo1,
    content.partners.logo2,
    content.partners.logo3,
    content.partners.logo4,
  ];

  return (
    <section className={cn(
      "py-24 px-6 bg-gradient-to-b from-white to-gray-50",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              {content.partners.title1}
            </span>{' '}
            {content.partners.title2}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.partners.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {partners.map((partner, index) => (
            <PartnerCard
              key={index}
              logoText={partner}
            />
          ))}
        </div>
        
        <p className="text-center text-gray-600 text-lg">
          {content.partners.bottomText}
        </p>
      </div>
    </section>
  );
};

export default PartnersSection;