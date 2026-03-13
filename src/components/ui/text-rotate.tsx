import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { cn } from '@/shared/lib/utils';

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  loop?: boolean;
  auto?: boolean;
  mainClassName?: string;
  elementLevelClassName?: string;
}

export interface TextRotateRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      rotationInterval = 2000,
      loop = true,
      auto = true,
      mainClassName,
      elementLevelClassName,
    },
    ref,
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const currentText = texts[currentTextIndex] ?? '';

    const next = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => {
          if (prev >= texts.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
        setIsVisible(true);
      }, 150);
    }, [texts.length, loop]);

    const previous = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => {
          if (prev <= 0) return loop ? texts.length - 1 : prev;
          return prev - 1;
        });
        setIsVisible(true);
      }, 150);
    }, [texts.length, loop]);

    const jumpTo = useCallback(
      (index: number) => setCurrentTextIndex(Math.max(0, Math.min(index, texts.length - 1))),
      [texts.length],
    );

    const reset = useCallback(() => setCurrentTextIndex(0), []);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    return (
      <span className={cn('flex flex-wrap whitespace-pre-wrap', mainClassName)}>
        <span className="sr-only">{currentText}</span>
        <span
          className={cn(
            'inline-block transition-opacity duration-150',
            elementLevelClassName,
            isVisible ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden="true"
        >
          {currentText}
        </span>
      </span>
    );
  },
);

TextRotate.displayName = 'TextRotate';

export { TextRotate };
