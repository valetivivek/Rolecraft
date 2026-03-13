import React, { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

const MinimalToggle = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative inline-block h-[1.8em] w-[3.7em] text-[17px]">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            'group h-0 w-0',
            '[&:checked+span:before]:translate-x-[1.9em]',
            '[&:checked+span:before]:bg-primary',
            '[&:checked+span]:bg-primary/30',
            'dark:[&:checked+span]:bg-primary/40',
            className,
          )}
          {...props}
        />
        <span
          className={cn(
            'absolute inset-0 cursor-pointer rounded-[30px] bg-muted transition ease-in-out',
            'before:absolute before:bottom-[0.2em] before:left-[0.2em] before:h-[1.4em] before:w-[1.4em]',
            "before:rounded-[20px] before:bg-muted-foreground/30 before:transition before:duration-300 before:content-['']",
            'dark:before:bg-muted-foreground/40',
          )}
        />
      </label>
    );
  },
);

MinimalToggle.displayName = 'MinimalToggle';

export { MinimalToggle };
