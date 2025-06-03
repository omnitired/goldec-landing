'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import Button from '@/components/ui/Button';
import { CheckIcon, DocumentTextIcon } from '@/components/ui/Icons';

interface CTASectionProps {
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({ className }) => {
  const content = useContent();

  return (
    <section className={cn(
      "py-24 bg-background relative overflow-hidden",
      className
    )}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-10">
          {content.cta.title1}<br />
          {content.cta.title2}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            className="shadow-2xl hover:shadow-white/25"
            leftIcon={<CheckIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
          >
            {content.cta.apiAccess}
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            className="group"
            leftIcon={<DocumentTextIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
          >
            {content.cta.docs}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;