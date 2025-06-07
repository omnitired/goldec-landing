'use client';

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import BottomSheet from './BottomSheet';
import { cn } from '@/lib/utils';

interface ModalBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  // Modal specific props
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  // BottomSheet specific props
  showHandle?: boolean;
  snapPoints?: (string | number)[];
  fadeFromIndex?: number;
  dismissible?: boolean;
  shouldScaleBackground?: boolean;
  // Responsive breakpoint (default: 768px)
  breakpoint?: number;
}

const ModalBottomSheet: React.FC<ModalBottomSheetProps> = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  className,
  overlayClassName,
  contentClassName,
  showCloseButton = true,
  closeOnOverlayClick = true,
  modalSize = 'md',
  showHandle = true,
  snapPoints,
  fadeFromIndex,
  dismissible = true,
  shouldScaleBackground = true,
  breakpoint = 768
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkIsMobile();

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  const commonProps = {
    open,
    onOpenChange,
    title,
    description,
    className,
    overlayClassName,
    contentClassName,
    showCloseButton,
    children
  };

  if (isMobile) {
    return (
      <BottomSheet
        {...commonProps}
        showHandle={showHandle}
        snapPoints={snapPoints}
        fadeFromIndex={fadeFromIndex}
        dismissible={dismissible}
        shouldScaleBackground={shouldScaleBackground}
      />
    );
  }

  return (
    <Modal
      {...commonProps}
      closeOnOverlayClick={closeOnOverlayClick}
      size={modalSize}
    />
  );
};

export default ModalBottomSheet;