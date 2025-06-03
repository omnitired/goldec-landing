import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black font-sans transition-colors duration-300", className)}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;