'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShieldIcon } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import ModalBottomSheet from '@/components/ui/ModalBottomSheet';
import ParticleBackground from '@/components/ui/ParticleBackground';
import TrackingResult from '@/components/track/TrackingResult';

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
    setShowModal(false);
    setError(null);
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
      
      <main 
        className={cn(
          "relative min-h-screen py-12 px-6 transition-colors duration-300",
          "overflow-hidden",
          theme === 'dark' 
            ? "text-white" 
            : "text-gray-900"
        )} 
        data-theme={theme}
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Particle Background */}
        <ParticleBackground />
        <div className="relative max-w-2xl mx-auto z-10" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6 shadow-2xl shadow-blue-500/30">
              <ShieldIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className={cn(
              "text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent",
              theme === 'dark'
                ? "from-white via-blue-100 to-white"
                : "from-gray-900 via-blue-600 to-gray-900"
            )}>
              رهگیری سفارش
            </h1>
            <p className={cn(
              "text-xl leading-relaxed max-w-2xl mx-auto",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )}>
              با وارد کردن کد رهگیری، وضعیت سفارش خود را بررسی کنید
            </p>
          </div>

          {/* Tracking Section Container */}
          <div className={cn(
            "max-w-2xl mx-auto p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300",
            theme === 'dark'
              ? "bg-gray-800/50 border-gray-700/50 shadow-2xl shadow-gray-900/20"
              : "bg-white/70 border-gray-200/50 shadow-2xl shadow-gray-500/10"
          )}>
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className={cn(
                "inline-flex rounded-xl p-1 transition-colors duration-200",
                theme === 'dark' ? "bg-gray-700/50" : "bg-gray-100/80"
              )}>
                <button
                  onClick={() => setActiveTab('transaction')}
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-200",
                    activeTab === 'transaction'
                      ? theme === 'dark'
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-blue-600 shadow-md"
                      : theme === 'dark'
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  رهگیری تراکنش
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-200",
                    activeTab === 'delivery'
                      ? theme === 'dark'
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-blue-600 shadow-md"
                      : theme === 'dark'
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  رهگیری ارسال
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="mb-8">
              <div className="relative">
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
                    "w-full px-6 py-4 text-lg font-mono tracking-wider border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm",
                    theme === 'dark'
                      ? "bg-gray-700/70 border-gray-600/50 text-gray-50 placeholder-gray-300 focus:bg-gray-600/80 focus:border-blue-400"
                      : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/90"
                  )}
                  placeholder={activeTab === 'transaction' ? 'مثال: platform-TC9A0E6BA12B3' : 'مثال: platform-DC9A0E6BA12B3'}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button
              onClick={handleTrack}
              disabled={isLoading || !trackingCode.trim()}
              className={cn(
                "w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
                "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
                "text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
              )}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>در حال جستجو...</span>
                </div>
              ) : (
                `رهگیری ${activeTab === 'transaction' ? 'تراکنش' : 'ارسال'}`
              )}
            </Button>
          </div>
        </div>

        {/* Modal for Results */}
        <ModalBottomSheet
          open={showModal}
          onOpenChange={(open) => setShowModal(open)}
          title={`نتایج رهگیری ${activeTab === 'transaction' ? 'تراکنش' : 'ارسال'}`}
        >
          <TrackingResult
                activeTab={activeTab}
                transactionResult={transactionResult}
                deliveryResult={deliveryResult}
                error={error}
                onReset={handleReset}
              />
        </ModalBottomSheet>

        {/* Toast Notification */}
        {toast && (
          <div className={cn(
            "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300",
            toast.type === 'error'
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          )}>
            <div className="flex items-center gap-2">
              {toast.type === 'error' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}