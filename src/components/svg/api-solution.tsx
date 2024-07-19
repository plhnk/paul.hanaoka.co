import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TranslationAPIProps {
  className?: string;
}

const TranslationAPI: React.FC<TranslationAPIProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animateMotionRef = useRef<SVGAnimateMotionElement | null>(null);

  const toggleAnimation = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      if (svgRef.current) {
        if (newState) {
          svgRef.current.unpauseAnimations();
        } else {
          svgRef.current.pauseAnimations();
        }
      }
      return newState;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsPlaying(true);
              if (svgRef.current) {
                svgRef.current.unpauseAnimations();
              }
            }, 700); // delay animation start by 700ms
          } else {
            setIsPlaying(false);
            if (svgRef.current) {
              svgRef.current.pauseAnimations();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('relative', className)}>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1105 464"
        fill="none"
      >
        <g
          id="content"
          stroke="currentColor"
          strokeDasharray="8 16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        >
          <rect rx="4" width="160" height="100" x="48" y="162" />
          <rect rx="4" width="160" height="100" x="25" y="187" />
          <rect rx="4" width="160" height="100" x="2" y="212" />
        </g>
        <g
          id="translated-content"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        >
          <rect rx="4" width="160" height="100" x="943" y="362" />
          <rect rx="4" width="160" height="100" x="943" y="182" />
          <rect rx="4" width="160" height="100" x="943" y="2" />
        </g>
        <path
          id="arrows"
          stroke="currentColor"
          strokeDasharray="8 16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M248 237h124.5m0 0-13 20m13-20-13-20M778.5 237h62.25M903 57l-13 20m13-20-13-20m13 20h-62.25v180m62.25 0-13 20m13-20-13-20m13 20h-62.25m0 0v180H903m0 0-13 20m13-20-13-20"
        />
        <g id="api">
          <circle
            cx="575.5"
            cy="237"
            r="163"
            stroke="currentColor"
            strokeDasharray="8 16"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            d="M487.5 172.646h66.975m66.976 0h-33.488m-33.488 0V151m0 21.646h33.488m0 0c-7.691 13.829-21.795 36.92-37.809 58.678m-41.049 45.22c13.292-10.183 27.822-27.247 41.049-45.22m0 0-25.926-28.375m25.926 28.375 28.087 32.233m0 58.443 14.847-36.797M662.5 322l-15.629-36.797m0 0-27.581-64.937-26.202 64.937m53.783 0h-53.783"
          />
        </g>
        <circle r="6" fill="currentColor">
          <animateMotion
            ref={animateMotionRef}
            dur="10s"
            repeatCount="indefinite"
            path="M248 237H372.5M545 237H605M778.5 237H840.75V57H903 M248 237H372.5M545 237H605M778.5 237H903 M248 237H372.5M545 237H605M778.5 237H840.75V417H903"
            begin="0.5s"
          />
          {/* <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.5;1"
            dur="10s"
            repeatCount="indefinite"
          />*/}
          <animate
            attributeName="opacity"
            values="0;1"
            keyTimes="0; 0.1"
            dur="10s"
            repeatCount="indefinite"
          /> 
        </circle>
      </svg>
      <button
        className="text-text/50 hover:text-text/80 -left-4 -bottom-4 p-4 absolute"
        onClick={toggleAnimation}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            id="pause"
          >
            <rect x="14" y="4" width="4" height="16" rx="1" />
            <rect x="6" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            id="play"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default TranslationAPI;
