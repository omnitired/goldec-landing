'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { FileIcon, ClockIcon, ReportIcon } from '@/components/ui/Icons';

interface HowItWorksSectionProps {
  className?: string;
}

const StepCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
  iconColor: string;
}> = ({ icon, title, description, stepNumber, iconColor }) => (
  <div className="text-center group">
    <div className="relative mb-8">
      <div className={cn(
        "w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300",
        iconColor
      )}>
        {icon}
      </div>
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">
        {stepNumber}
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
  </div>
);

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ className }) => {
  const content = useContent();

  const steps = [
    {
      icon: <FileIcon className="w-12 h-12 text-white" />,
      title: content.howItWorks.step1.title,
      description: content.howItWorks.step1.desc,
      stepNumber: 1,
      iconColor: "bg-gradient-to-br from-orange-500 to-red-500 group-hover:shadow-orange-500/25"
    },
    {
      icon: <ClockIcon className="w-12 h-12 text-white" />,
      title: content.howItWorks.step2.title,
      description: content.howItWorks.step2.desc,
      stepNumber: 2,
      iconColor: "bg-gradient-to-br from-blue-500 to-indigo-500 group-hover:shadow-blue-500/25"
    },
    {
      icon: <ReportIcon className="w-12 h-12 text-white" />,
      title: content.howItWorks.step3.title,
      description: content.howItWorks.step3.desc,
      stepNumber: 3,
      iconColor: "bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:shadow-emerald-500/25"
    }
  ];

  return (
    <section id="how-it-works" className={cn(
      "py-24 px-6 bg-background relative overflow-hidden",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            {content.howItWorks.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              stepNumber={step.stepNumber}
              iconColor={step.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;