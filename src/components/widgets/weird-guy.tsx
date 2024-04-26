'use client';
import React, { useRef, useEffect } from 'react';

interface WeirdGuyProps {
  imageUrl: string;
}

const WeirdGuy: React.FC<WeirdGuyProps> = ({ imageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const angle = Math.atan2(
          mouseY - containerCenterY,
          mouseX - containerCenterX
        );
        const rotation = angle * (180 / Math.PI);

        image.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', bottom: '0', right: '0' }}
    >
      <img
        style={{ width: '400px', position:'fixed', bottom: '0', right: '0', transformOrigin:'bottom right'}} 
        ref={imageRef}
        src={imageUrl}
        alt="Weird Guy"
      />
    </div>
  );
};

export default WeirdGuy;
