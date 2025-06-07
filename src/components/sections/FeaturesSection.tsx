'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { DocumentIcon, CheckIcon, VerifiedIcon } from '@/components/ui/Icons';

interface FeatureSectionProps {
  className?: string;
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}> = ({ icon, title, description, iconColor }) => (
  <div className="group bg-card rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border hover:border-blue-200 hover:-translate-y-2">
    <div className={cn(
      "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-300",
      iconColor
    )}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection: React.FC<FeatureSectionProps> = ({ className }) => {
  const content = useContent();

  const features = [
    {
      icon: <DocumentIcon className="w-10 h-10 text-white" />,
      title: content.features.feature1.title,
      description: content.features.feature1.desc,
      iconColor: "bg-gradient-to-br from-blue-500 to-blue-600 group-hover:shadow-blue-500/25"
    },
    {
      icon: <CheckIcon className="w-10 h-10 text-white" />,
      title: content.features.feature2.title,
      description: content.features.feature2.desc,
      iconColor: "bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:shadow-emerald-500/25"
    },
    {
      icon: <VerifiedIcon className="w-10 h-10 text-white" />,
      title: content.features.feature3.title,
      description: content.features.feature3.desc,
      iconColor: "bg-gradient-to-br from-purple-500 to-purple-600 group-hover:shadow-purple-500/25"
    }
  ];

  return (
    <section id="features" className={cn(
      "py-24 bg-background relative overflow-hidden",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-foreground dark:text-foreground mb-6">
          {content.features.title}
        </h2>
        <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
          {content.features.subtitle}
        </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;