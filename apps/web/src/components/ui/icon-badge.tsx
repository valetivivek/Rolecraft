import React from 'react';
import { cn } from '@/lib/utils';

interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Container for icons with primary-tinted background.
 * Use for brand icons, section headers, and status indicators.
 */
const IconBadge = React.forwardRef<HTMLDivElement, IconBadgeProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-lg bg-primary/10 text-primary',
          {
            'h-7 w-7': size === 'sm',
            'h-8 w-8 rounded-xl': size === 'md',
            'h-10 w-10 rounded-xl': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

IconBadge.displayName = 'IconBadge';

export { IconBadge };
