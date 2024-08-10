'use client';
import React, { useState } from 'react';
import MaskedImage from '@/components/ui/maskedImage';

const WeirdGuy = () => {
  const svgPath = `M100 0H0V70C0 97.6142 22.3858 120 50 120C77.6142 120 100 97.6142 100 70V0Z`;
  const [rotationClass, setRotationClass] = useState('rotateY(180deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const imageElement = e.currentTarget;
    const { left, width } = imageElement.getBoundingClientRect();
    const x = e.clientX - left;

    if (x > width / 2) {
      setRotationClass('rotateY(0deg)');
    } else {
      setRotationClass('rotateY(180deg)');
    }
  };

  return (
    <>
      <MaskedImage
        className="before:absolute before:inset-0 before:bg-card before:w-full before:h-[300px] before:rounded-full before:mt-auto transition-transform duration-300 ease-in-out"
        variant="clip"
        imagePosition="bottom"
        maskPosition="bottom"
        svgPath={svgPath}
        imageSrc="/images/tiny-dank-guy.png"
        width="300px"
        height="360px"
        onMouseMove={handleMouseMove}
        style={{ transform: rotationClass }}
      />
    </>
  );
};

export default WeirdGuy;
