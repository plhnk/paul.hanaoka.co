import React, { useState, useEffect, ReactElement } from 'react';

interface LoadingProps {
  shape: ReactElement;
  dotCount?: number;
  radius?: number;
  shapeSize?: number;
  animationDuration?: number;
}

const Loading: React.FC<LoadingProps> = ({
  shape,
  dotCount = 12,
  radius = 40,
  shapeSize = 8,
  animationDuration = 1.2,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % dotCount);
    }, (animationDuration * 1000) / dotCount);

    return () => clearInterval(interval);
  }, [dotCount, animationDuration]);

  const calculatePosition = (index: number) => {
    const angle = (index / dotCount) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
      {Array.from({ length: dotCount }).map((_, index) => {
        const { x, y } = calculatePosition(index);
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              transform: `translate(${x}px, ${y}px) ${
                isActive ? 'scale(1.2)' : 'scale(1)'
              } `,
              left: '50%',
              top: '50%',
              marginLeft: -shapeSize / 2,
              marginTop: -shapeSize / 2,
              transition: 'all 0.3s ease',
              opacity: isActive ? 1 : 0.3,
            }}
          >
            {React.cloneElement(shape, {
              style: {
                // ...shape.props.style,
                // width: shapeSize,
                // height: shapeSize,
              },
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Loading;
