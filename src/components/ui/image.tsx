import React, { useState, useEffect, useMemo } from 'react';
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

  // Use a memoized version of src to prevent unnecessary updates
  const stableSrc = useMemo(() => src, [src]);

  useEffect(() => {
    console.log('Theme changed:', theme);
    console.log('Source paths:', stableSrc);

    let newSrcPath = '';
    if (theme === 'dark') {
      newSrcPath = stableSrc.dark;
    } else if (theme === 'light') {
      newSrcPath = stableSrc.light;
    } else if (theme === 'system') {
      const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      newSrcPath = systemPrefersDark ? stableSrc.dark : stableSrc.light;
      console.log('System prefers dark:', systemPrefersDark);
    }

    if (newSrcPath !== srcPath) {
      setSrcPath(newSrcPath);
      setIsLoading(true); // Reset loading state when srcPath changes
    }
  }, [theme, stableSrc, srcPath]);

  const handleImageLoad = () => {
    console.log('Image loaded:', srcPath);
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.log('Image failed to load:', srcPath);
    // Handle error, possibly set a fallback image or retry mechanism
  };

  return (
    <div className={cn('themed-image relative w-[80vw] mx-auto h-[60vw]', className)}>
      {isLoading && (
        <Skeleton className={`w-[${width}px] h-[${height}px]`} />
      )}
      {srcPath && (
        <Image
          src={srcPath}
          alt={alt}
          width={width}
          height={height}
          className={cn('absolute top-0 left-0 bgBlender', { hidden: isLoading })}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default ThemedImage;
