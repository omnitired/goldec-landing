import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: "گلدک - سامانه نظارت بر معاملات طلای آب‌شده",
  description: "سامانه نظارت بر معاملات طلای آب‌شده با شفافیت، امنیت و اعتماد",
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
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                    document.documentElement.style.backgroundColor = '#0a0a0a';
                    document.body.classList.add('dark');
                    document.body.style.backgroundColor = '#0a0a0a';
                    document.body.style.color = '#f8fafc';
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.style.colorScheme = 'light';
                    document.documentElement.style.backgroundColor = '#ffffff';
                    document.body.classList.add('light');
                    document.body.style.backgroundColor = '#ffffff';
                    document.body.style.color = '#171717';
                  }
                } catch (e) {}
              })()
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
