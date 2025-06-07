'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

export default function InquiryPage() {
  const { theme } = useTheme();
  const [inquiryCode, setInquiryCode] = useState('');
  const [result, setResult] = useState<TransactionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);



  const handleInquiry = async () => {
    if (!inquiryCode.trim()) {
      alert('لطفاً کد استعلام را وارد کنید');
      return;
    }
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Simulate API call with better error handling
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on code pattern
      if (inquiryCode.toUpperCase().startsWith('ABC')) {
        setResult({
          code: inquiryCode,
          status: 'valid',
          platform: 'Iran Tala',
          transactionType: 'خرید',
          weight: '۱۰۰',
          purity: '۹۹۹',
          date: '۱۴۰۳/۱۲/۲۰',
          time: '۱۴:۳۵'
        });
      } else {
        setResult({
          code: inquiryCode,
          status: 'invalid'
        });
      }
      setShowModal(true);
    } catch (error) {
      console.error('Error during inquiry:', error);
      alert('خطا در برقراری ارتباط. لطفاً مجدداً تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setInquiryCode('');
    setResult(null);
    setHasSearched(false);
    setShowModal(false);
  };

  // Result Modal/Bottom Sheet Content Component
  const ResultContent = () => {
    if (!result) return null;
    
    return (
      <div className="space-y-6">
        {result.status === 'valid' ? (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                {/* Success Icon with App Store style animation */}
                <div className="flex justify-center">
                  <div className="relative animate-in zoom-in-0 duration-1000 delay-200 ease-out">
                    <div className="w-20 h-20 bg-green-500 shadow-2xl shadow-green-500/40 rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-10 h-10 text-white animate-in zoom-in-0 duration-500 delay-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {/* Success ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10 animation-delay-200"></div>
                  </div>
                </div>
                
                {/* Transaction Code */}
                <div className="text-center animate-in fade-in-0 slide-in-from-bottom-3 duration-700 delay-500">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">کد تراکنش</p>
                  <p className="font-mono text-xl font-bold text-gray-900 dark:text-gray-100">{result.code}</p>
                </div>
                
                {/* Platform Info with icon next to name */}
                <div className="flex items-center justify-center space-x-3 space-x-reverse animate-in fade-in-0 slide-in-from-bottom-3 duration-700 delay-600">
                  {/* Platform Logo */}
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 shadow-lg rounded-full flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-600">
                    {result.platform && (
                      <img 
                        src={`/logos/${result.platform.toLowerCase().replace(/\s+/g, '-')}.svg`} 
                        alt={`${result.platform} logo`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/next.svg';
                        }}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                  {/* Platform Name */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">پلتفرم</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{result.platform || 'ناشناس'}</p>
                  </div>
                </div>
                
                {/* Transaction Details */}
                 <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 delay-700">
                   <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-600">
                     <span className="text-gray-500 dark:text-gray-400">نوع تراکنش</span>
                     <span className="font-semibold text-gray-900 dark:text-gray-100">{result.transactionType}</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-600">
                     <span className="text-gray-500 dark:text-gray-400">وزن</span>
                     <span className="font-semibold text-gray-900 dark:text-gray-100">{result.weight}</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-600">
                     <span className="text-gray-500 dark:text-gray-400">عیار</span>
                     <span className="font-semibold text-gray-900 dark:text-gray-100">{result.purity}</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-600">
                     <span className="text-gray-500 dark:text-gray-400">تاریخ</span>
                     <span className="font-semibold text-gray-900 dark:text-gray-100">{result.date}</span>
                   </div>
                   <div className="flex justify-between items-center py-4">
                     <span className="text-gray-500 dark:text-gray-400">وضعیت</span>
                     <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-500 dark:bg-green-600 text-white shadow-lg animate-in zoom-in-0 duration-500 delay-900">
                       معتبر
                     </span>
                   </div>
                 </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                {/* Error Icon */}
                <div className="flex justify-center animate-in zoom-in-0 duration-700 delay-200">
                  <div className="w-16 h-16 bg-red-500 shadow-lg shadow-red-500/25 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                
                {/* Transaction Code */}
                <div className="text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-400">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">کد تراکنش</p>
                  <p className="font-mono text-xl font-bold text-gray-900 dark:text-gray-100">{result.code}</p>
                </div>
                
                {/* Error Message */}
                <div className="text-center p-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-500">
                  <h4 className="text-xl font-bold text-red-600 dark:text-red-300 mb-2">
                    تراکنش یافت نشد
                  </h4>
                  <p className="text-red-500 dark:text-red-200 font-medium">
                    کد تراکنش وارد شده معتبر نیست یا در سیستم موجود نمی‌باشد.
                  </p>
                </div>
              </div>
            )
        )}
        
        {/* Footer with action button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-600 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 delay-1000">
          <button
            onClick={handleReset}
            className="w-full py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            بازگشت و استعلام مجدد
          </button>
        </div>
      </div>
    );
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-300",
      theme === 'dark' ? "bg-gray-900" : "bg-gray-50"
    )}>
      <Header />
      
      <main className={cn(
        "min-h-screen py-12 px-6 transition-colors duration-300",
        theme === 'dark' 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      )}>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-500/25">
                <ShieldIcon className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              سامانه جامع نظارت طلا
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              کد استعلام خود را وارد کنید
            </p>
          </div>

          {/* Inquiry Form */}
          <div className={cn(
            "backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 transition-colors duration-300",
            theme === 'dark' 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200",
            "border"
          )}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  کد استعلام
                </label>
                <input
                  type="text"
                  value={inquiryCode}
                  onChange={(e) => setInquiryCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isLoading && inquiryCode.trim()) {
                      handleInquiry();
                    }
                  }}
                  placeholder="مثال: ABCD-1234"
                  className={cn(
                    "w-full px-4 py-4 text-center text-lg font-mono rounded-2xl transition-all duration-300",
                    "focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500",
                    theme === 'dark'
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500",
                    "border"
                  )}
                  dir="ltr"
                  maxLength={20}
                  autoComplete="off"
                  spellCheck={false}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  کد پیامک دریافتی را وارد کنید
                </p>
              </div>

              <Button
                onClick={handleInquiry}
                disabled={!inquiryCode.trim() || isLoading}
                variant="primary"
                className="w-full py-4 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>در حال بررسی...</span>
                  </div>
                ) : (
                  'تایید کد'
                )
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal/Bottom Sheet */}
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
      
      <Footer />
    </div>
  );
}