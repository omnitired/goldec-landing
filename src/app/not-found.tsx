'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HomeIcon, MagnifyingGlassIcon } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';

export default function NotFound() {
  return (
    <div className={cn("min-h-screen bg-background font-sans transition-colors duration-300")}>
      <Header />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 py-20">
          <div className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                ۴۰۴
              </h1>
            </div>
            
            {/* Error Message */}
            <div className="mb-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                صفحه مورد نظر یافت نشد
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است منتقل شده باشد.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button 
                  variant="primary" 
                  size="lg"
                  leftIcon={<HomeIcon className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  بازگشت به صفحه اصلی
                </Button>
              </Link>
              
              <Link href="/inquiry">
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  استعلام تراکنش
                </Button>
              </Link>
            </div>
            
            {/* Additional Help */}
            <div className="mt-8 p-6 bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-600/60 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                نیاز به کمک دارید؟
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4 font-medium">
                می‌توانید از طریق لینک‌های زیر به بخش‌های مختلف سایت دسترسی پیدا کنید:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="#features" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 font-semibold underline decoration-2 underline-offset-2"
                >
                  ویژگی‌ها
                </a>
                <span className="text-gray-600 dark:text-gray-400 font-bold">•</span>
                <a 
                  href="#how-it-works" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 font-semibold underline decoration-2 underline-offset-2"
                >
                  نحوه کار
                </a>
                <span className="text-gray-600 dark:text-gray-400 font-bold">•</span>
                <a 
                  href="#partners" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 font-semibold underline decoration-2 underline-offset-2"
                >
                  پلتفرم‌ها
                </a>
                <span className="text-gray-600 dark:text-gray-400 font-bold">•</span>
                <a 
                  href="#contact" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 font-semibold underline decoration-2 underline-offset-2"
                >
                  تماس
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}