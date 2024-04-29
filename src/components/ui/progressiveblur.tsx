import React from 'react';
import { cn } from '@/lib/utils';

const ProgressiveBlur: React.FC<{ className?: string }> = ({ className }) => {
  const masks = [
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5% )',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50% )',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5% )',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75% )',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5% )',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100% )',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100% )',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100% )',
  ];

  return (
    <div
      className={cn(
        'pointer-events-none inset-[auto 0 0 0]',
        className
      )}
    >
      {masks.map((mask, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: index + 1,
            WebkitBackdropFilter: `blur(${Math.pow(2, index) / 2}px)`,
            backdropFilter: `blur(${Math.pow(2, index) / 2}px)`,
            mask: mask,
          }}
        />
      ))}
      {/* kudos to Silas: https://codepen.io/silas/pen/rNYqZoz?editors=1100 */}
    </div>
  );
};

export default ProgressiveBlur;

// TODO make this better, see https://github.com/AndrewPrifer/progressive-blur
