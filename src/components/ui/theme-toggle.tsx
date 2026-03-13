import { Moon, Sun } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ isDark, onToggle, className }: ThemeToggleProps) {
  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'flex h-8 w-16 cursor-pointer rounded-full p-1 transition-all duration-300 border border-border bg-card',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onToggle();
      }}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 bg-primary',
            isDark ? 'translate-x-0' : 'translate-x-8',
          )}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
          ) : (
            <Sun className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300',
            isDark ? 'bg-transparent' : '-translate-x-8',
          )}
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          ) : (
            <Moon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </button>
  );
}
