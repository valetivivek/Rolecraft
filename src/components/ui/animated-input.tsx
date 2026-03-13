import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

interface AnimatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string;
  value: string;
}

export function AnimatedInput({ label, className, value, ...props }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value.length > 0;

  return (
    <div className={cn('relative', className)}>
      <label
        className={cn(
          'pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200',
          showLabel && '-translate-y-[1.6rem] text-xs text-foreground',
        )}
      >
        {label}
      </label>
      <input
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        placeholder={showLabel ? undefined : label}
        {...props}
        className="w-full border-b-2 border-foreground bg-transparent py-2 text-base font-medium text-foreground outline-none placeholder-transparent"
      />
    </div>
  );
}
