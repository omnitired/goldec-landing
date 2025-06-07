'use client';

import React from 'react';
import { Drawer } from 'vaul';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme } = useTheme();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      fadeFromIndex={fadeFromIndex}
      modal={modal}
      dismissible={dismissible}
      shouldScaleBackground={shouldScaleBackground}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn(
            'fixed inset-0 z-40 bg-black/40',
            overlayClassName
          )}
        />
        <Drawer.Content
          className={cn(
            'bg-white dark:bg-gray-800 flex flex-col rounded-t-[10px] h-full mt-24 fixed bottom-0 left-0 right-0 z-50',
            'border-t border-gray-200 dark:border-gray-600',
            contentClassName
          )}
        >
          {showHandle && (
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-600 mb-8 mt-4" />
          )}
          
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 pb-4">
              {title && (
                <Drawer.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </Drawer.Title>
              )}
              {showCloseButton && (
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {description && (
            <Drawer.Description className="text-sm text-gray-500 dark:text-gray-400 px-6 pb-4">
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