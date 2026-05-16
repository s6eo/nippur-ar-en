import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'primary';
  hoverEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, variant = 'light', hoverEffect = true, ...props }, ref) => {
    
    const variants = {
      light: 'bg-white/70 border-white/60',
      dark: 'bg-pharma-navy/80 border-pharma-navy/50 text-white',
      primary: 'bg-pharma-blue/10 border-pharma-blue/20',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'backdrop-blur-2xl border rounded-3xl shadow-glass',
          variants[variant],
          hoverEffect && 'hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
