'use client';

import React from 'react';
import { Drawer } from 'vaul';
import { cn } from '@/lib/utils';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  showHandle?: boolean;
  snapPoints?: (string | number)[];
  fadeFromIndex?: number;
  modal?: boolean;
  dismissible?: boolean;
  shouldScaleBackground?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  className,
  overlayClassName,
  contentClassName,
  showCloseButton = true,
  showHandle = true,
  snapPoints,
  fadeFromIndex,
  modal = true,
  dismissible = true,
  shouldScaleBackground = true
}) => {

  // Prepare props based on whether snapPoints are provided
  const drawerProps = snapPoints
    ? {
        open,
        onOpenChange,
        snapPoints,
        ...(fadeFromIndex !== undefined && { fadeFromIndex }),
        modal,
        dismissible,
        shouldScaleBackground,
      }
    : {
        open,
        onOpenChange,
        modal,
        dismissible,
        shouldScaleBackground,
      };

  return (
    <Drawer.Root {...drawerProps}>
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn(
            'fixed inset-0 z-40 bg-black/40',
            overlayClassName
          )}
        />
        <Drawer.Content
          className={cn(
            'bg-card flex flex-col rounded-t-[10px] h-full mt-24 fixed bottom-0 left-0 right-0 z-50',
            'border-t border-border shadow-lg',
            contentClassName
          )}
        >
          {showHandle && (
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/30 mb-8 mt-4" />
          )}
          
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 pb-4">
              {title && (
                <Drawer.Title className="text-lg font-semibold text-card-foreground">
                  {title}
                </Drawer.Title>
              )}
              {showCloseButton && (
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-card-foreground hover:bg-muted/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {description && (
            <Drawer.Description className="text-sm text-muted-foreground px-6 pb-4">
              {description}
            </Drawer.Description>
          )}
          
          <div className={cn('px-6 pb-6 overflow-auto', className)}>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;