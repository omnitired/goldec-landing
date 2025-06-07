import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    children, 
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95";
    
    const variants = {
      primary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 active:from-blue-600 active:to-blue-700 text-white shadow-2xl hover:shadow-blue-500/25 focus:ring-blue-500 dark:focus:ring-blue-400",
      secondary: "bg-white/90 dark:bg-gray-700 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-800 dark:text-gray-100 shadow-xl focus:ring-gray-300 dark:focus:ring-gray-500",
      outline: "border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white active:bg-blue-600 dark:active:bg-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400",
      ghost: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 focus:ring-gray-300 dark:focus:ring-gray-500"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm min-w-[120px]",
      md: "px-6 py-3 text-base min-w-[160px]",
      lg: "px-8 py-4 text-lg min-w-[200px]"
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        <span className="flex-1 text-center">{children}</span>
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;