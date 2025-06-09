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
  const [isTransitioning] = useState(false);

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

  // Apply theme changes after mount
  useEffect(() => {
    if (!mounted) return;
    
    const applyTheme = (currentTheme: Theme) => {
      const root = document.documentElement;
      
      // Use data attribute for primary theme detection
      root.setAttribute('data-theme', currentTheme);
      
      // Also update classes for backward compatibility
      root.classList.remove('dark', 'light');
      root.classList.add(currentTheme);
      
      // Set color scheme
      root.style.colorScheme = currentTheme;
      
      // Update meta theme-color for mobile browsers
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', currentTheme === 'dark' ? '#0a0a0a' : '#ffffff');
    };
    
    // Apply theme
    applyTheme(theme);
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
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