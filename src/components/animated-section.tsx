"use client";

import { useRef, type ReactNode, forwardRef } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: keyof JSX.IntrinsicElements;
};

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(({ children, className, id, as: Tag = 'section' }, forwardedRef) => {
  const internalRef = useRef<HTMLElement>(null);
  const ref = forwardedRef || internalRef;
  const onScreen = useOnScreen(ref as React.RefObject<HTMLElement>);

  return (
    <Tag
      id={id}
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        'transform-gpu transition-all duration-500 ease-in-out py-12 md:py-20',
        onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className
      )}
    >
      {children}
    </Tag>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

export { AnimatedSection };
