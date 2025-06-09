import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: "سامانه نظارت بر معاملات طلای آب‌شده ",
  description: "سامانه نظارت بر سکو‌های معامله طلای آب‌شده؛ قدرت گرفته از اتحادیه کشوری کسب و کارهای مجازی",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check if we're in a browser environment
                  if (typeof window === 'undefined' || typeof document === 'undefined') return;
                  
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  
                  const root = document.documentElement;
                  
                  // Use data attribute instead of classes for better reliability
                  root.setAttribute('data-theme', theme);
                  
                  // Also add class for backward compatibility
                  root.classList.remove('dark', 'light');
                  root.classList.add(theme);
                  
                  // Set color scheme immediately
                  root.style.colorScheme = theme;
                  
                } catch (e) {
                  // Fallback to light theme
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
