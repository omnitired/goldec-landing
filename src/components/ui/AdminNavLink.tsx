'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, ArrowLeft } from 'lucide-react';

interface AdminNavLinkProps {
  className?: string;
}

const AdminNavLink: React.FC<AdminNavLinkProps> = ({ className = '' }) => {
  return (
    <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
      <Link
        href="/admin"
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
      >
        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:inline font-medium">پنل مدیریت</span>
        <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default AdminNavLink;