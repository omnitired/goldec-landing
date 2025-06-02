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
  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 shadow-2xl">
    <div className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-6">
      {value}
    </div>
    <div className="text-2xl font-bold mb-3 text-white">{title}</div>
    <div className="text-gray-300">{description}</div>
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
      "py-24 px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white",
      className
    )}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {content.stats.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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