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
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
    
    const variants = {
      primary: "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black shadow-2xl hover:shadow-yellow-500/25 focus:ring-yellow-500",
      secondary: "bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white shadow-xl focus:ring-white/50",
      outline: "border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black focus:ring-yellow-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
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
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin ml-2" />
        ) : leftIcon && (
          <span className="ml-3">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="mr-3">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;