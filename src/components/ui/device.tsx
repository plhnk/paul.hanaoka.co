import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ThemedImageProps {
  src: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ThemedImage: React.FC<ThemedImageProps> = ({
  src,
  caption,
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
      <figcaption className='absolute -bottom-8 left-4 italic text-text/80'>{caption}</figcaption>
    </div>
  );
};

export default ThemedImage;
