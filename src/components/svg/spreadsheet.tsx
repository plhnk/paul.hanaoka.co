import React from 'react';
import { cn } from '@/lib/utils';

interface HammerProps {
  className?: string;
}

const Hammer: React.FC<HammerProps> = ({ className }) => {
  return (
    <div className={cn('', className)}>
      <svg
        viewBox="0 0 300 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className='w-full'
      >
        <path
          d="M2 42V10C2 5.58172 5.58172 2 10 2H290C294.418 2 298 5.58172 298 10V42M2 42V81M2 42H98M298 42V81M298 42H198M2 120H298M2 120V81M2 120V159M298 120V81M298 120V159M2 81H298M2 159V190C2 194.418 5.58172 198 10 198H98M2 159H298M298 159V190C298 194.418 294.418 198 290 198H198M98 42H150H198M98 42V198M98 198H150H198M198 42V198"
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
