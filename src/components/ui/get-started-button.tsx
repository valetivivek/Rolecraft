import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from './button';

interface GetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export function GetStartedButton({
  text = 'Get Started',
  className,
  ...props
}: GetStartedButtonProps) {
  return (
    <Button className={cn('group relative overflow-hidden', className)} size="lg" {...props}>
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">{text}</span>
      <i className="absolute right-1 top-1 bottom-1 z-10 grid w-1/4 place-items-center rounded-sm bg-primary-foreground/15 transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}
