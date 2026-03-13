import React from 'react';
import { cn } from '@/shared/lib/utils';

interface AnimatedContainerProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const delayClasses: Record<number, string> = {
  0: 'animate-in-delay-0',
  0.05: 'animate-in-delay-100',
  0.1: 'animate-in-delay-200',
  0.15: 'animate-in-delay-300',
  0.2: 'animate-in-delay-400',
  0.22: 'animate-in-delay-400',
  0.24: 'animate-in-delay-500',
  0.25: 'animate-in-delay-500',
  0.26: 'animate-in-delay-500',
  0.3: 'animate-in-delay-500',
};

export function AnimatedContainer({ delay = 0.1, children, className }: AnimatedContainerProps) {
  const delayClass = delayClasses[delay] ?? 'animate-in-delay-200';
  return <div className={cn('animate-in', delayClass, className)}>{children}</div>;
}
