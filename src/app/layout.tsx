import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: "سامانه نظارت بر معاملات طلای آب‌شده ",
  description: "سامانه نظارت بر سکو‌های معامله طلای آب‌شده؛ قدرت گرفته از اتحادیه کسب و کارهای مجازی",
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
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  
                  const root = document.documentElement;
                  const body = document.body;
                  
                  // Remove any existing theme classes
                  root.classList.remove('dark', 'light');
                  body.classList.remove('dark', 'light');
                  
                  // Add theme classes
                  root.classList.add(theme);
                  body.classList.add(theme);
                  
                  // Apply styles with !important for production builds
                  if (theme === 'dark') {
                    root.style.setProperty('color-scheme', 'dark', 'important');
                    root.style.setProperty('background-color', '#0a0a0a', 'important');
                    body.style.setProperty('background-color', '#0a0a0a', 'important');
                    body.style.setProperty('color', '#f8fafc', 'important');
                    
                    // Set CSS custom properties
                    root.style.setProperty('--background', '#0a0a0a');
                    root.style.setProperty('--foreground', '#f8fafc');
                    root.style.setProperty('--card', '#1e293b');
                    root.style.setProperty('--card-foreground', '#f8fafc');
                    root.style.setProperty('--muted', '#1e293b');
                    root.style.setProperty('--muted-foreground', '#94a3b8');
                    root.style.setProperty('--border', '#334155');
                  } else {
                    root.style.setProperty('color-scheme', 'light', 'important');
                    root.style.setProperty('background-color', '#ffffff', 'important');
                    body.style.setProperty('background-color', '#ffffff', 'important');
                    body.style.setProperty('color', '#171717', 'important');
                    
                    // Set CSS custom properties
                    root.style.setProperty('--background', '#ffffff');
                    root.style.setProperty('--foreground', '#171717');
                    root.style.setProperty('--card', '#ffffff');
                    root.style.setProperty('--card-foreground', '#171717');
                    root.style.setProperty('--muted', '#f8fafc');
                    root.style.setProperty('--muted-foreground', '#64748b');
                    root.style.setProperty('--border', '#e2e8f0');
                  }
                } catch (e) {
                  console.warn('Theme initialization failed:', e);
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
