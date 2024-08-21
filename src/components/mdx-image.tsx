'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

type ImageProps = {
  src: string;
  alt: string;
  [key: string]: any;
};

const imageSizes = {
  sm: { width: 300, height: 200 },
  md: { width: 600, height: 400 },
  lg: { width: 1200, height: 800 },
  xl: { width: 2000, height: 1200 },
};

export default function MDXImage({ src, alt, ...props }: ImageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  let slug: string | undefined;

  if (params) {
    slug = Array.isArray(params.slug)
      ? params.slug[0]
      : (params.slug as string);
  }

  let imageSrc = src;
  if (slug && !src.startsWith('http') && !src.startsWith('/')) {
    imageSrc = `/posts/${slug}/${src}`;
  }

  // Parse parameters
  const [baseSrc, queryString] = imageSrc.split('?');
  const parameters = queryString ? queryString.split('&') : [];

  // Apply styles based on parameters
  let imageStyles = '';
  let wrapperClasses = 'relative block lg:inline overflow-x-hidden';
  let imageSize = imageSizes.md; // Default to medium size

  parameters.forEach((param) => {
    switch (param) {
      case 'xl':
        imageSize = imageSizes.xl;
        break;
      case 'lg':
        imageSize = imageSizes.lg;
        props.className = 'lg:-ml-64';
        break;
      case 'sm':
        imageSize = imageSizes.sm;
        break;
      case 'right':
        wrapperClasses += ' float-right ml-4';
        break;
      case 'left':
        wrapperClasses += ' float-left mr-4';
        break;
      case 'center':
        wrapperClasses += ' mx-auto';
        break;
      case 'out':
        wrapperClasses += ' -mx-[15%]';
        break;
      case 'wrap':
        wrapperClasses += ' float-left';
        break;
      case 'round':
        imageStyles += ' rounded-full';
        break;
    }
  });

  const handleImageClick = () => {
    setIsDialogOpen(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && containerRef.current) {
      const dx = e.movementX;
      const dy = e.movementY;
      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  useEffect(() => {
    if (isDialogOpen) {
      setPosition({ x: 0, y: 0 });
      setZoom(2);
    }
  }, [isDialogOpen]);

  return (
    <>
      <div className={cn(wrapperClasses)} onClick={handleImageClick}>
        <Image
          src={baseSrc}
          alt={alt || ''}
          width={imageSize.width}
          height={imageSize.height}
          {...props}
          className={cn(
            'cursor-zoom-in max-w-fit my-16 rounded-md',
            imageStyles,
            props.className
          )}
          onError={() =>
            console.error('MDXImage: Failed to load image:', baseSrc)
          }
          onLoad={() =>
            console.log('MDXImage: Successfully loaded image:', baseSrc)
          }
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          <div
            ref={containerRef}
            className="w-[90vw] h-[90vh] cursor-grab active:cursor-grabbing overflow-hidden relative"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            >
              <Image
                ref={imageRef}
                src={baseSrc}
                alt={alt || ''}
                width={imageSize.width * 2}
                height={imageSize.height * 2}
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button
                className="p-2 bg-black bg-opacity-50 rounded-full text-white"
                onClick={handleZoomIn}
              >
                <ZoomIn size={24} />
              </button>
              <button
                className="p-2 bg-black bg-opacity-50 rounded-full text-white"
                onClick={handleZoomOut}
              >
                <ZoomOut size={24} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
