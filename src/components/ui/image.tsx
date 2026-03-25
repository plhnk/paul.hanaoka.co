'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ThemedImageProps {
  src: {
    light: string;
    dark: string;
    system?: string;
  };
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ThemedImage: React.FC<ThemedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const { theme } = useTheme();
  const [srcPath, setSrcPath] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const stableSrc = useMemo(() => src, [src]);

  useEffect(() => {
    let newSrcPath = '';

    if (theme === 'dark') {
      newSrcPath = stableSrc.dark;
    } else if (theme === 'light') {
      newSrcPath = stableSrc.light;
    } else if (theme === 'system') {
      const systemPrefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      newSrcPath = systemPrefersDark ? stableSrc.dark : stableSrc.light;
    }

    if (newSrcPath !== srcPath) {
      setSrcPath(newSrcPath);
      setIsLoading(true);
    }
  }, [theme, stableSrc, srcPath]);

  return (
    <div
      className={cn('themed-image relative w-[80vw] mx-auto h-[60vw]', className)}
    >
      {isLoading ? (
        <Skeleton className={`w-[${width}px] h-[${height}px]`} />
      ) : null}
      {srcPath ? (
        <Image
          src={srcPath}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1024px) 80vw, 1200px"
          className={cn('absolute top-0 left-0 bgBlender', {
            hidden: isLoading,
          })}
          onLoad={() => setIsLoading(false)}
        />
      ) : null}
    </div>
  );
};

export default ThemedImage;
