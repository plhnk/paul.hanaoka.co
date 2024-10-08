'use client';
import React, { useState, useEffect, useRef } from 'react';
import MaskedImage from '@/components/ui/maskedImage';
import { cn } from '@/lib/utils';

type WeirdGuyProps = {
  className?: string;
};

const WeirdGuy: React.FC<WeirdGuyProps> = ({ className }) => {
  const svgPath = `M100 0H0V70C0 97.6142 22.3858 120 50 120C77.6142 120 100 97.6142 100 70V0Z`;

  const [rotationClass, setRotationClass] = useState('rotateY(180deg)');
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const { left, width } = imageRef.current.getBoundingClientRect();
        const centerX = left + width / 2;

        if (e.clientX > centerX) {
          setRotationClass('rotateY(0deg)');
        } else {
          setRotationClass('rotateY(180deg)');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={imageRef}>
      <MaskedImage
        className={cn('before:absolute before:inset-0 before:bg-card before:w-full before:h-[300px] before:rounded-full before:mt-auto transition-transform duration-300 ease-in-out', className)}
        variant="clip"
        imageAlt='Headshot of Paul Hanaoka'
        imagePosition="50% 18px"
        maskPosition="bottom"
        svgPath={svgPath}
        imageSrc="/images/tiny-dank-guy.png"
        width="300px"
        height="360px"
        style={{ transform: rotationClass }}
      />
    </div>
  );
};

export default WeirdGuy;
