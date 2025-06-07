import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "گلدک - سامانه نظارت بر معاملات طلای آب‌شده",
  description: "سامانه نظارت بر معاملات طلای آب‌شده با شفافیت، امنیت و اعتماد",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
