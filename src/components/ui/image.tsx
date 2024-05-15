import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
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
  let srcPath = '';

  if (theme === 'dark') {
    srcPath = src.dark;
  } else if (theme === 'light') {
    srcPath = src.light;
  } else if (theme === 'system') {
    // If system theme is set, use light or dark based on system preference
    srcPath =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? src.dark
        : src.light;
  }

  return (
    <Image
      src={srcPath}
      alt={alt}
      width={width}
      height={height}
      className={cn('', className)}
    />
  );
};

export default ThemedImage;
