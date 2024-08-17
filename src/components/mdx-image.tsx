'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function MDXImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) {
  const params = useParams();
  let slug: string | undefined;

  if (params) {
    slug = Array.isArray(params.slug) ? params.slug[0] : params.slug as string;
  }

  let imageSrc = src;
  if (slug && !src.startsWith('http') && !src.startsWith('/')) {
    imageSrc = `/posts/${slug}/${src}`;
  }

  console.log('MDXImage: Rendering image with src:', imageSrc);

  return (
    <Image 
      src={imageSrc} 
      alt={alt || ''}
      width={props.width || 500}
      height={props.height || 300}
      {...props}
      onError={() => console.error('MDXImage: Failed to load image:', imageSrc)}
      onLoad={() => console.log('MDXImage: Successfully loaded image:', imageSrc)}
    />
  );
}
