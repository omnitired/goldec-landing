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

  // Apply theme classes only after mount and when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const applyTheme = (currentTheme: Theme) => {
      const root = document.documentElement;
      const body = document.body;
      
      // Remove existing theme classes with force
      root.classList.remove('dark', 'light');
      body.classList.remove('dark', 'light');
      
      // Force reflow to ensure classes are removed
       void root.offsetHeight;
      
      // Add current theme class immediately
      root.classList.add(currentTheme);
      body.classList.add(currentTheme);
      
      // Apply theme-specific styles with !important for production builds
      if (currentTheme === 'dark') {
        root.style.setProperty('color-scheme', 'dark', 'important');
        root.style.setProperty('background-color', '#0a0a0a', 'important');
        body.style.setProperty('background-color', '#0a0a0a', 'important');
        body.style.setProperty('color', '#f8fafc', 'important');
        
        // Update CSS custom properties
        root.style.setProperty('--background', '#0a0a0a');
        root.style.setProperty('--foreground', '#f8fafc');
        root.style.setProperty('--card', '#1e293b');
        root.style.setProperty('--card-foreground', '#f8fafc');
        root.style.setProperty('--muted', '#1e293b');
        root.style.setProperty('--muted-foreground', '#94a3b8');
        root.style.setProperty('--border', '#334155');
        
        // Set meta theme-color for mobile browsers
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
          metaThemeColor = document.createElement('meta');
          metaThemeColor.setAttribute('name', 'theme-color');
          document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', '#0a0a0a');
      } else {
        root.style.setProperty('color-scheme', 'light', 'important');
        root.style.setProperty('background-color', '#ffffff', 'important');
        body.style.setProperty('background-color', '#ffffff', 'important');
        body.style.setProperty('color', '#171717', 'important');
        
        // Update CSS custom properties
        root.style.setProperty('--background', '#ffffff');
        root.style.setProperty('--foreground', '#171717');
        root.style.setProperty('--card', '#ffffff');
        root.style.setProperty('--card-foreground', '#171717');
        root.style.setProperty('--muted', '#f8fafc');
        root.style.setProperty('--muted-foreground', '#64748b');
        root.style.setProperty('--border', '#e2e8f0');
        
        // Set meta theme-color for mobile browsers
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
          metaThemeColor = document.createElement('meta');
          metaThemeColor.setAttribute('name', 'theme-color');
          document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', '#ffffff');
      }
      
      // Force style recalculation
       root.style.display = 'none';
       void root.offsetHeight;
       root.style.display = '';
    };
    
    // Apply theme immediately
    applyTheme(theme);
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
    
    // Additional check for production builds - reapply after a short delay
    const timeoutId = setTimeout(() => {
      applyTheme(theme);
    }, 100);
    
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