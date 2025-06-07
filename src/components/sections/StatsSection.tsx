'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';

interface StatsSectionProps {
  className?: string;
}

const StatCard: React.FC<{
  value: string;
  title: string;
  description: string;
}> = ({ value, title, description }) => (
  <div className="bg-card backdrop-blur-sm rounded-3xl p-10 border border-border hover:border-blue-400/30 transition-all duration-300 hover:scale-105 shadow-2xl">
    <div className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text mb-6">
      {value}
    </div>
    <div className="text-2xl font-bold mb-3 text-card-foreground">{title}</div>
    <div className="text-muted-foreground">{description}</div>
  </div>
);

const StatsSection: React.FC<StatsSectionProps> = ({ className }) => {
  const content = useContent();

  const stats = [
    {
      value: content.stats.stat1.value,
      title: content.stats.stat1.title,
      description: content.stats.stat1.desc,
    },
    {
      value: content.stats.stat2.value,
      title: content.stats.stat2.title,
      description: content.stats.stat2.desc,
    },
    {
      value: content.stats.stat3.value,
      title: content.stats.stat3.title,
      description: content.stats.stat3.desc,
    }
  ];

  return (
    <section id="stats" className={cn(
      "py-24 bg-background relative overflow-hidden",
      className
    )}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {content.stats.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.stats.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;