import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ThemedImageProps {
  src: string;
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
  return (
    <div className={cn('relative bg-card rounded-lg outline outline-1 outline-text/20 -outline-offset-1', className)}> 
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='p-4 rounded-xl'
      />
    </div>
  );
};

export default ThemedImage;
