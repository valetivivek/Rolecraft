import React from 'react';
import { cn } from '@/shared/lib/utils';

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
          'rounded-xl border border-border bg-card',
          {
            'p-3': variant === 'compact',
            'p-4': variant === 'default',
            'p-6': variant === 'elevated',
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = 'Card';

export { Card };
