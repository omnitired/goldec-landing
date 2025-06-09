'use client';

import React from 'react';
import { formatPrice, formatDate } from '@/lib/utils';

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

interface TrackingResultProps {
  activeTab: TabType;
  transactionResult: TransactionResult | null;
  deliveryResult: DeliveryResult | null;
  error: string | null;
  onReset: () => void;
}

const TrackingResult: React.FC<TrackingResultProps> = ({
  activeTab,
  transactionResult,
  deliveryResult,
  error,
  onReset
}) => {
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
            onClick={onReset}
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
          onClick={onReset}
          className="w-full py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          بازگشت و رهگیری مجدد
        </button>
      </div>
    </div>
  );
};

export default TrackingResult;