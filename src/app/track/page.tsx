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
  date: string;
  karat: number;
  platform_logo: string;
  platform_name: string;
  total_price: number;
  tx_id: string;
  type: string;
  unit_price: number;
  weight: number;
}

interface DeliveryResult {
  date: string;
  karat: number;
  platform_logo: string;
  platform_name: string;
  total_price: number;
  tx_id: string;
  unit_price: number;
  weight: number;
}

type TabType = 'transaction' | 'delivery';

export default function TrackPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('transaction');
  const [trackingCode, setTrackingCode] = useState('');
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);
  const [deliveryResult, setDeliveryResult] = useState<DeliveryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'error' | 'success'} | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTrack = async () => {
    if (!trackingCode.trim()) {
      setToast({message: 'لطفاً کد رهگیری را وارد کنید', type: 'error'});
      setTimeout(() => setToast(null), 3000);
      return;
    }
    
    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    setTransactionResult(null);
    setDeliveryResult(null);
    
    try {
      const endpoint = activeTab === 'transaction' 
        ? `https://staging.panel.zarnext.com/public/api/v1/transactions/${trackingCode}`
        : `https://staging.panel.zarnext.com/public/api/v1/gold-deliveries/${trackingCode}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.status === 200) {
        if (activeTab === 'transaction') {
          setTransactionResult(data.data);
        } else {
          setDeliveryResult(data.data);
        }
        setShowModal(true);
        setToast({message: 'اطلاعات با موفقیت یافت شد', type: 'success'});
      } else {
        setError(data.message || 'اطلاعات یافت نشد');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error during tracking:', error);
      setError('خطا در برقراری ارتباط. لطفاً مجدداً تلاش کنید.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleReset = () => {
    setTrackingCode('');
    setTransactionResult(null);
    setDeliveryResult(null);
    setHasSearched(false);
    setShowModal(false);
    setError(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const ResultContent = () => {
    if (error) {
      return (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center">
            <div className="relative animate-in zoom-in-0 duration-1000 delay-200 ease-out">
              <div className="w-20 h-20 bg-red-500 shadow-2xl shadow-red-500/40 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-white animate-in zoom-in-0 duration-500 delay-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"></div>
              <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-10 animation-delay-200"></div>
            </div>
          </div>
          
          <div className="text-center p-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-500">
            <h4 className="text-xl font-bold text-red-600 dark:text-red-300 mb-2">
              اطلاعات یافت نشد
            </h4>
            <p className="text-red-500 dark:text-red-200 font-medium">
              {error}
            </p>
          </div>
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-600 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 delay-1000">
            <button
              onClick={handleReset}
              className="w-full py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              بازگشت و رهگیری مجدد
            </button>
          </div>
        </div>
      );
    }

    const result = activeTab === 'transaction' ? transactionResult : deliveryResult;
    if (!result) return null;
    
    return (
      <div className="space-y-6">
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center">
            <div className="relative animate-in zoom-in-0 duration-1000 delay-200 ease-out">
              <div className="w-12 h-12 bg-green-500 shadow-2xl shadow-green-500/40 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-white animate-in zoom-in-0 duration-500 delay-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10 animation-delay-200"></div>
            </div>
          </div>
          
          <div className="text-center space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-700 delay-300">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
              {activeTab === 'transaction' ? 'تراکنش یافت شد' : 'تحویل یافت شد'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {activeTab === 'transaction' 
                ? 'اطلاعات تراکنش شما در سیستم موجود می‌باشد'
                : 'اطلاعات تحویل شما در سیستم موجود می‌باشد'
              }
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 space-y-4 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 delay-500">
            {/* Platform Header */}
            <div className="flex items-center justify-center gap-4 py-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-blue-100 dark:border-gray-500">
              <img 
                src={`https://staging.panel.zarnext.com${result.platform_logo}`} 
                alt={result.platform_name} 
                className="h-12 w-auto object-contain"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {result.platform_name}
                  {activeTab === 'transaction' && transactionResult && (
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mr-2">
                      - {transactionResult.type === 'buy' ? 'خرید' : transactionResult.type === 'sell' ? 'فروش' : transactionResult.type}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">پلتفرم ارائه‌دهنده خدمات</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 font-medium">کد:</span>
              <span className="font-bold text-gray-900 dark:text-white">{result.tx_id}</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 font-medium">تاریخ:</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatDate(result.date)}</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 font-medium">وزن و عیار:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatPrice(result.weight)} میلی‌گرم - {result.karat} عیار
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 font-medium">قیمت واحد (ریال):</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatPrice(result.unit_price)}</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400 font-medium">قیمت کل (ریال):</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatPrice(result.total_price)}</span>
            </div>
            

            

          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 dark:border-gray-600 animate-in fade-in-0 slide-in-from-bottom-3 duration-700 delay-1000">
          <button
            onClick={handleReset}
            className="w-full py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            بازگشت و رهگیری مجدد
          </button>
        </div>
      </div>
    );
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
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
          <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6 shadow-2xl shadow-blue-500/30">
              <ShieldIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
رهگیری تراکنش
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-200 leading-relaxed">
              کد رهگیری دریافت شده از سکو  را وارد کنید تا وضعیت آن را بررسی کنیم
            </p>
          </div>
          
          {/* Tabs */}
          <div className="mb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
              <button
                onClick={() => setActiveTab('transaction')}
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200",
                  activeTab === 'transaction'
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                رهگیری تراکنش
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200",
                  activeTab === 'delivery'
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                رهگیری تحویل
              </button>
            </div>
          </div>
          
          <div className={cn(
            "bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 animate-in fade-in-0 slide-in-from-bottom-6 duration-700 delay-200",
            hasSearched && "transform transition-all duration-500"
          )}>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-lg font-bold text-gray-900 dark:text-gray-50">
                  {activeTab === 'transaction' ? 'کد تراکنش' : 'کد تحویل'}
                </label>
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isLoading && trackingCode.trim()) {
                      handleTrack();
                    }
                  }}
                  className={cn(
                    "w-full px-6 py-4 text-lg font-mono tracking-wider border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    theme === 'dark'
                      ? "bg-gray-700 border-gray-500 text-gray-50 placeholder-gray-300 focus:bg-gray-600 focus:border-blue-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white"
                  )}
                  placeholder={activeTab === 'transaction' ? 'مثال: invi-TC9A0E6BA12B3' : 'مثال: invi-DC9A0E6BA12B3'}
                  disabled={isLoading}
                />
              </div>
              
              <Button
                onClick={handleTrack}
                disabled={!trackingCode.trim() || isLoading}
                isLoading={isLoading}
                className={cn(
                  "w-full py-4 text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                  theme === 'dark'
                    ? "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2 space-x-reverse">
                    <span>در حال بررسی...</span>
                  </span>
                ) : (
                  activeTab === 'transaction' ? 'رهگیری تراکنش' : 'رهگیری تحویل'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <ModalBottomSheet
        open={showModal}
        onOpenChange={setShowModal}
        title={error ? 'خطا در رهگیری' : 'نتیجه رهگیری'}
      >
        <ResultContent />
      </ModalBottomSheet>
      
      {/* Toast Notification */}
      {toast && (
        <div className={cn(
          "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border animate-in slide-in-from-top-2 fade-in-0 duration-300",
          toast.type === 'error' 
            ? "bg-red-50 dark:bg-red-900/90 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
            : "bg-green-50 dark:bg-green-900/90 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
        )}>
          <div className="flex items-center space-x-2 space-x-reverse">
            {toast.type === 'error' ? (
              <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
            <button 
              onClick={() => setToast(null)}
              className="ml-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}