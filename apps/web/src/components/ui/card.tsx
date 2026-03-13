import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'compact' | 'elevated';
  as?: 'div' | 'section' | 'article';
}

/**
 * Card container with consistent border, background, and padding.
 * Use for grouping related content.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', as: Component = 'div', className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'border border-border bg-card',
          variant === 'elevated' && 'rounded-2xl p-6 sm:p-8 shadow-card transition-shadow hover:shadow-card-hover',
          variant === 'default' && 'rounded-xl p-4',
          variant === 'compact' && 'rounded-xl p-3',
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = 'Card';

export { Card };
