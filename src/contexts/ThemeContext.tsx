'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always start with light theme to avoid hydration mismatch
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme after component mounts to avoid hydration issues
  useEffect(() => {
    const initializeTheme = () => {
      let initialTheme: Theme = 'light';
      
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          initialTheme = savedTheme;
        } else {
          // Check system preference
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          initialTheme = mediaQuery.matches ? 'dark' : 'light';
          
          // Listen for system theme changes
          const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
              setThemeState(e.matches ? 'dark' : 'light');
            }
          };
          
          mediaQuery.addEventListener('change', handleSystemThemeChange);
          
          // Cleanup listener
          return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
        }
      }
      
      setThemeState(initialTheme);
      setMounted(true);
    };
    
    const cleanup = initializeTheme();
    return cleanup;
  }, []);

  // Apply theme classes only after mount and when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    setIsTransitioning(true);
    
    const root = document.documentElement;
    const body = document.body;
    
    // Add transition classes for smooth theme switching
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Remove existing theme classes
    root.classList.remove('dark', 'light');
    body.classList.remove('dark', 'light');
    
    // Add current theme class
    root.classList.add(theme);
    body.classList.add(theme);
    
    // Apply theme-specific styles
    if (theme === 'dark') {
      root.style.setProperty('--background', '10 10 10'); // gray-950
      root.style.setProperty('--foreground', '248 250 252'); // slate-50
      root.style.backgroundColor = 'rgb(10, 10, 10)';
      body.style.backgroundColor = 'rgb(10, 10, 10)';
      body.style.color = 'rgb(248, 250, 252)';
      
      // Set meta theme-color for mobile browsers
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', '#0a0a0a');
    } else {
      root.style.setProperty('--background', '255 255 255'); // white
      root.style.setProperty('--foreground', '23 23 23'); // neutral-900
      root.style.backgroundColor = 'rgb(255, 255, 255)';
      body.style.backgroundColor = 'rgb(255, 255, 255)';
      body.style.color = 'rgb(23, 23, 23)';
      
      // Set meta theme-color for mobile browsers
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', '#ffffff');
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    
    // Remove transition after theme change is complete
    const timeoutId = setTimeout(() => {
      setIsTransitioning(false);
      root.style.transition = '';
      body.style.transition = '';
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [theme, mounted]);



  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent rapid theme switching
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    if (isTransitioning || theme === newTheme) return;
    setThemeState(newTheme);
  };

  // Provide context even when not mounted to prevent errors
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={mounted ? 'theme-loaded' : 'theme-loading'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};