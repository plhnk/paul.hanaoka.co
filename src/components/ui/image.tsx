import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    if (theme === 'dark') {
      setSrcPath(src.dark);
    } else if (theme === 'light') {
      setSrcPath(src.light);
    } else if (theme === 'system') {
      // If system theme is set, use light or dark based on system preference
      setSrcPath(
        window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? src.dark
          : src.light
      );
    }
  }, [theme, src]);

  // When the image finishes loading, set isLoading to false
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ width, height }} className={cn('themed-image relative', className)}>
      {isLoading && (
        <Skeleton className={'w-[' + { width } + '] h-[' + { height } + ']'} />
      )}
      <Image
        src={srcPath}
        alt={alt}
        width={width}
        height={height}
        className={cn('absolute top-0 left-0', { hidden: isLoading })}
        onLoad={handleImageLoad} 
      />
    </div>
  );
};

export default ThemedImage;
