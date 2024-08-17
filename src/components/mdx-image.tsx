'use client'

import Image from 'next/image';

export default function MDXImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) {
  console.log('MDXImage: Rendering image with src:', src);

  return (
    <Image 
      src={src} 
      alt={alt || ''}
      width={500}  // Set a default width
      height={300} // Set a default height
      {...props}
      onError={() => console.error('MDXImage: Failed to load image:', src)}
      onLoad={() => console.log('MDXImage: Successfully loaded image:', src)}
    />
  );
}