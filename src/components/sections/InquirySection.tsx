'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ShieldIcon } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import ModalBottomSheet from '@/components/ui/ModalBottomSheet';

interface TransactionResult {
  code: string;
  status: 'valid' | 'invalid' | 'pending';
  platform?: string;
  transactionType?: string;
  weight?: string;
  purity?: string;
  date?: string;
  time?: string;
}

interface InquirySectionProps {
  className?: string;
}

// Constants
const MOCK_API_DELAY = 1500;

// Custom hook for swipe functionality (currently unused)
  // const useSwipeGesture = (onDismiss: () => void): [number, SwipeHandlers] => {
  //   const [dragY, setDragY] = useState(0);
  //   const [isDragging, setIsDragging] = useState(false);
  //   const startY = useRef(0);
  //   const currentY = useRef(0);

  //   const handleStart = useCallback((clientY: number) => {
  //     setIsDragging(true);
  //     startY.current = clientY;
  //     currentY.current = clientY;
  //   }, []);

  //   const handleMove = useCallback((clientY: number) => {
  //     if (!isDragging) return;
  //     
  //     currentY.current = clientY;
  //     const deltaY = Math.max(0, clientY - startY.current);
  //     setDragY(deltaY);
  //   }, [isDragging]);

  //   const handleEnd = useCallback(() => {
  //     if (!isDragging) return;
  //     
  //     const deltaY = currentY.current - startY.current;
  //     
  //     if (deltaY > SWIPE_THRESHOLD) {
  //       onDismiss();
  //     }
  //     
  //     setIsDragging(false);
  //     setDragY(0);
  //   }, [isDragging, onDismiss]);

  //   const handleMouseMove = useCallback((e: MouseEvent) => {
  //     handleMove(e.clientY);
  //   }, [handleMove]);

  //   const handleMouseUp = useCallback(() => {
  //     handleEnd();
  //   }, [handleEnd]);

  //   // Mouse event listeners
  //   useEffect(() => {
  //     if (isDragging) {
  //       document.addEventListener('mousemove', handleMouseMove);
  //       document.addEventListener('mouseup', handleMouseUp);
  //       return () => {
  //         document.removeEventListener('mousemove', handleMouseMove);
  //         document.removeEventListener('mouseup', handleMouseUp);
  //       };
  //     }
  //   }, [isDragging, handleMouseMove, handleMouseUp]);

  //   const swipeHandlers: SwipeHandlers = useMemo(() => ({
  //     onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientY),
  //     onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientY),
  //     onTouchEnd: handleEnd,
  //     onMouseDown: (e: React.MouseEvent) => handleStart(e.clientY)
  //   }), [handleStart, handleMove, handleEnd]);

  //   return [dragY, swipeHandlers];
  // };

const InquirySection: React.FC<InquirySectionProps> = ({ className }) => {
  const [inquiryCode, setInquiryCode] = useState('');
  const [result, setResult] = useState<TransactionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Optimized API call with useCallback
  const handleInquiry = useCallback(async () => {
    if (!inquiryCode.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with Promise
    try {
      await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
      
      // Mock response based on code pattern
      const mockResult: TransactionResult = inquiryCode.toUpperCase().startsWith('ABC') 
        ? {
            code: inquiryCode,
            status: 'valid',
            platform: 'Iran Tala',
            transactionType: 'خرید',
            weight: '۱۰۰',
            purity: '۹۹۹',
            date: '۱۴۰۳/۱۲/۲۰',
            time: '۱۴:۳۵'
          }
        : {
            code: inquiryCode,
            status: 'invalid'
          };
      
      setResult(mockResult);
      setShowModal(true);
    } catch (error) {
      console.error('Inquiry failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [inquiryCode]);

  const handleReset = useCallback(() => {
    setInquiryCode('');
    setResult(null);
    setShowModal(false);
  }, []);



  // Success Icon Component
  const SuccessIcon = React.memo(() => (
    <div className="text-center animate-in zoom-in-50 duration-700 delay-200">
      <div className="relative w-20 h-20 mx-auto mb-4">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-2 bg-green-500 rounded-full animate-pulse opacity-30"></div>
        <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  ));
  SuccessIcon.displayName = 'SuccessIcon';

  // Error Icon Component
  const ErrorIcon = React.memo(() => (
    <div className="text-center animate-in zoom-in-50 duration-500 delay-200">
      <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  ));
  ErrorIcon.displayName = 'ErrorIcon';

  // Transaction Details Component
  const TransactionDetails = React.memo(({ result }: { result: TransactionResult }) => (
    <div className="bg-gray-50 dark:bg-slate-800/80 rounded-2xl p-6 space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-700">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">نوع تراکنش</p>
          <p className="font-semibold text-gray-900 dark:text-white">{result.transactionType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">وزن</p>
          <p className="font-semibold text-gray-900 dark:text-white">{result.weight}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">عیار</p>
          <p className="font-semibold text-gray-900 dark:text-white">{result.purity}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">تاریخ</p>
          <p className="font-semibold text-gray-900 dark:text-white">{result.date}</p>
        </div>
      </div>
      
      <div className="flex justify-center pt-2 animate-in zoom-in-50 duration-500 delay-900">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
          <svg className="w-4 h-4 mr-2 ml-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          معتبر
        </span>
      </div>
    </div>
  ));
  TransactionDetails.displayName = 'TransactionDetails';

  // Result Modal/Bottom Sheet Content Component
  const ResultContent = React.memo(() => {
    if (!result) return null;

    return (
      <div className="space-y-6">
            {result.status === 'valid' ? (
              <div className="space-y-6">
                <SuccessIcon />
                
                <div className="text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-400">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">کد تراکنش</p>
                  <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800/80 py-3 px-4 rounded-xl border border-gray-200 dark:border-slate-700">
                    {result.code}
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-3 space-x-reverse animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-600">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{result.platform}</span>
                </div>
                
                <TransactionDetails result={result} />
              </div>
            ) : (
              <div className="space-y-6">
                <ErrorIcon />
                
                <div className="text-center p-6 bg-red-50 dark:bg-red-900/30 rounded-2xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-500">
                  <h4 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                    تراکنش یافت نشد
                  </h4>
                  <p className="text-red-500 dark:text-red-300 font-medium">
                    کد تراکنش وارد شده معتبر نیست یا در سیستم موجود نمی‌باشد.
                  </p>
                </div>
              </div>
            )}
        
        {/* Footer with action button */}
        <div className="pt-6 border-t border-gray-200/50 dark:border-slate-700/50 animate-in fade-in-0 slide-in-from-bottom-2 duration-700 delay-1000">
          <Button
            onClick={handleReset}
            variant="primary"
            className="w-full py-4 text-lg font-bold"
          >
            بازگشت و استعلام مجدد
          </Button>
        </div>
      </div>
    );
  });
  ResultContent.displayName = 'ResultContent';

  // Memoized form input handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInquiryCode(e.target.value);
  }, []);

  // Memoized loading content
  const loadingContent = useMemo(() => (
    <div className="flex items-center justify-center space-x-2 space-x-reverse">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>در حال بررسی...</span>
    </div>
  ), []);

  return (
    <section className={cn(
      "py-12 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100",
      "dark:from-slate-950/95 dark:via-gray-950/95 dark:to-slate-900/95",
      "text-gray-900 dark:text-white transition-colors duration-500",
      className
    )}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl animate-in zoom-in-50 duration-500 delay-200">
              <ShieldIcon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300">
            سامانه نظارت بر معاملات طلا
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-400">
            کد استعلام خود را وارد کنید
          </p>
        </div>

        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-slate-700/50 p-8 mb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                کد استعلام
              </label>
              <input
                type="text"
                value={inquiryCode}
                onChange={handleInputChange}
                placeholder="مثال: ABCD-1234"
                className="w-full px-4 py-4 text-center text-lg font-mono bg-gray-50/80 dark:bg-slate-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 hover:border-blue-400/30 dark:hover:border-blue-500/30"
                dir="ltr"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                کد پیامک دریافتی را وارد کنید
              </p>
            </div>

            <Button
              onClick={handleInquiry}
              disabled={!inquiryCode.trim() || isLoading}
              variant="primary"
              className="w-full py-4 text-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? loadingContent : 'تایید کد'}
            </Button>
          </div>
        </div>
      </div>
      
      <ModalBottomSheet
        open={showModal}
        onOpenChange={setShowModal}
        title="نتیجه استعلام"
        modalSize="md"
        showHandle={true}
        dismissible={true}
        shouldScaleBackground={true}
      >
        <ResultContent />
      </ModalBottomSheet>
    </section>
  );
};

export default InquirySection;