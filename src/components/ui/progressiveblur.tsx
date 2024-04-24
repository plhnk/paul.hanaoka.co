import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const ProgressiveBlur: React.FC<{ className?: string }> = ({ className }) => {
  // interface ProgressiveBlurProps {
  //   className?: string;
  // }
  //   const [blurLevel, setBlurLevel] = useState(0);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const scrollPosition = window.scrollY;
  //       const maxScroll =
  //         document.documentElement.scrollHeight - window.innerHeight;
  //       const blurPercentage = (scrollPosition / maxScroll) * 100;
  //       setBlurLevel(blurPercentage);
  //     };

  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);

  const mask1 =
    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5% )';
  const mask2 =
    'linear-gradient( to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50% )';
  const mask3 =
    'linear-gradient( to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5% )';
  const mask4 =
    'linear-gradient( to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75% )';
  const mask5 =
    'linear-gradient( to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5% )';
  const mask6 =
    'linear-gradient( to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100% )';
  const mask7 =
    'linear-gradient( to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100% )';
  const mask8 =
    'linear-gradient( to bottom, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100% )';

  return (
    <div
      className={cn('block sm:hidden pointer-events-none inset-[auto 0 0 0]',  className)}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backdropFilter: 'blur(0.5px)',
          mask: `${mask1}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          backdropFilter: 'blur(1px)',
          mask: `${mask2}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          backdropFilter: 'blur(2px)',
          mask: `${mask3}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          backdropFilter: 'blur(4px)',
          mask: `${mask4}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          backdropFilter: 'blur(8px)',
          mask: `${mask5}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 6,
          backdropFilter: 'blur(16px)',
          mask: `${mask6}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 7,
          backdropFilter: 'blur(32px)',
          mask: `${mask7}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 8,
          backdropFilter: 'blur(64px)',
          mask: `${mask8}`,
        }}
      />
    </div>
  );
};

export default ProgressiveBlur;
