import React from 'react';
import { cn } from '@/lib/utils';

interface HammerProps {
  className?: string;
}

const Hammer: React.FC<HammerProps> = ({ className }) => {

  return (
    <div className={cn('', className)}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className='w-full'
      >
        <path
          d="M139 196V157.667C139 147.412 134.876 137.577 127.535 130.325C120.195 123.074 110.238 119 99.8571 119H41.1429C30.7615 119 20.8054 123.074 13.4647 130.325C6.12397 137.577 2 147.412 2 157.667L2 196"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 16"
        />
        <path
          d="M70.5 80C92.3153 80 110 62.5391 110 41C110 19.4609 92.3153 2 70.5 2C48.6848 2 31 19.4609 31 41C31 62.5391 48.6848 80 70.5 80Z"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 16"
        />
        <path
          d="M168 51V109"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 16"
        />
        <path
          d="M197 80H139"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 16"
        />
      </svg>
    </div>
  );
};

export default Hammer;
