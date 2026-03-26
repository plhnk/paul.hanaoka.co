'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LazyWhenVisibleProps {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  rootMargin?: string;
}

export default function LazyWhenVisible({
  children,
  fallback,
  className,
  rootMargin = '500px 0px',
}: LazyWhenVisibleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef} className={cn('w-full h-full', className)}>
      {isVisible ? children : fallback}
    </div>
  );
}
