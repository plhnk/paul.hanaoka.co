import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface HammerProps {
  className?: string;
}

const Hammer: React.FC<HammerProps> = ({ className }) => {
  const [key, setKey] = useState(0);

  const replayAnimation = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={cn('relative lg:pr-64 lg:w-3/4', className)}>
      <svg
        key={key}
        viewBox="0 0 906 836"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className='w-full'
      >
        <style jsx>{`
          .order-6 {
            stroke-dasharray: 742;
            stroke-dashoffset: 742;
            animation: draw 1100ms linear forwards 2150ms;
          }
          .order-5 {
            stroke-dasharray: 1038;
            stroke-dashoffset: 1038;
            animation: draw 1500ms linear forwards 2300ms;
          }
          .order-4 {
            stroke-dasharray: 1305;
            stroke-dashoffset: 1305;
            animation: draw 1800ms linear forwards 1800ms;
          }
          .order-3 {
            stroke-dasharray: 248;
            stroke-dashoffset: 248;
            animation: draw 300ms linear forwards 1600ms;
          }
          .order-2 {
            stroke-dasharray: 360;
            stroke-dashoffset: 360;
            animation: draw 450ms linear forwards 1200ms;
          }
          .order-1 {
            stroke-dasharray: 2060;
            stroke-dashoffset: 2060;
            animation: draw 2800ms linear forwards;
          }

          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
        <mask id="mask">
          <path
            className="draw order-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M838.686 143.65c-18.597 6.059-33.493 20.159-42.883 30.434-12.196 13.346-24.165 38.025-30.108 58.535-5.189 17.907-.991 28.015 1.002 38.284 11.798 9.291 38.123 30.752 62.886 34.254 27.239 2.501 91.623-106.055 68.494-125.755-20.302-16.126-89.465 91.057-75.722 119.598"
          />
          <path
            className="draw order-5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M346.164 46.695c65.39-35.752 188.971-71.505 319.751-11.514 19.677 9.211 60.991 37.368 79.188 50.296 8.399 15.149 23.996 84.835 93.585 58.173 14.398 6.786 45.593 26.662 59.391 35.752"
          />
          <path
            className="draw order-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M638.316 242.422c75.589-78.169 121.979-20.71 127.378-9.803m-127.378-53.217c62.391-63.021 96.586-38.782 116.982-28.481 20.397 10.302 24.264 13.163 40.504 23.163M540.534 137.59a88.591 88.591 0 0 0 14.15-15.035c37.02-49.962 15.756-133.724-208.52-75.86V81.84c69.223-16.361 150.078-33.307 176.973-4.002 1.196 1.303-47.993-17.813-176.973 30.059v35.752C463.956 105.576 522.292 112.109 553 122"
          />
          <path
            className="draw order-3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="m613.349 229.219 24.971 13.204v-63.021c-16.797-19.189-59.871-54.416-97.785-41.812v42.546"
          />
          <path
            className="draw order-2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M622.721 218.184c-1.112 1.474-4.399 5.331-9.374 11.035-29.387 33.694-117.677 131.82-164.511 183.709"
          />
          <path
            className="draw order-2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="m374.352 358.708 166.182-178.572 11.398-12.248c26.996-8.483 59.391-1.212 70.789 50.296"
          />
          <path
            className="draw order-1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M136.683 810.5c-12.6-41.108-92.185-121.708-128.7-96.424-32.757 31.793 105.895 142.119 127.905 114.541 5.302-6.643 33.339-45.232 45.346-66.025C193.242 741.8 440.258 444.64 448.835 431.644c3.124-4.734 2.834-11.308 0-18.716-4.946-12.928-17.639-28.396-33.45-41.063-15.163-12.147-30.007-14.635-41.035-13.157-7.063.947-12.561 3.521-15.575 6.227C351.666 371.316 74.807 634.754 17.57 701.5"
          />
        </mask>
        <path
          stroke="currentColor"
          strokeDasharray="8 16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          mask='url("#mask")'
          d="M374.35 358.708c-7.063.947-12.561 3.521-15.575 6.227C351.785 371.21 83.963 626.042 20.614 698M374.35 358.708c11.028-1.478 25.872 1.01 41.035 13.157 15.811 12.668 28.504 28.136 33.45 41.063m-74.485-54.22 166.182-178.572m-91.697 232.792c2.834 7.408 3.124 13.982 0 18.716-8.577 12.996-255.593 310.156-267.601 330.949-12.007 20.792-40.044 59.381-45.346 66.024-22.01 27.578-160.662-82.748-127.905-114.541 36.221-25.08 114.822 54.026 128.383 95.424m312.469-396.572c46.833-51.889 135.124-150.015 164.511-183.709m0 0c4.975-5.704 8.262-9.561 9.374-11.035-11.399-51.508-43.794-58.779-70.79-50.296l-11.398 12.248m72.814 49.083 24.971 13.204m0 0v-63.021m0 63.021c75.589-78.17 121.979-20.711 127.378-9.804m-127.378-53.217c-16.797-19.189-59.871-54.416-97.785-41.812m97.785 41.812c62.391-63.021 96.585-38.782 116.982-28.481 20.397 10.302 24.263 13.163 40.504 23.163M540.532 137.59v42.546m0-42.546a88.591 88.591 0 0 0 14.15-15.035c37.02-49.962 15.756-133.724-208.52-75.86m0 0c65.39-35.752 188.971-71.505 319.751-11.514 19.677 9.211 60.991 37.368 79.188 50.296 8.399 15.149 23.996 84.835 93.585 58.173M346.162 46.695V81.84c69.223-16.361 150.078-33.307 176.973-4.002 1.196 1.303-47.993-17.813-176.973 30.059v35.752c118.186-38.202 176.518-31.497 207.143-21.551m285.381 21.551c14.398 6.786 45.594 26.662 59.391 35.752m-59.391-35.752c-18.597 6.059-33.493 20.159-42.883 30.434m102.274 5.318c23.129 19.7-41.254 128.256-68.494 125.755-24.762-3.502-51.087-24.963-62.885-34.254-1.993-10.269-6.191-20.377-1.003-38.284m132.382-53.217c-18.637-14.803-78.446 74.302-77.503 111.098m-54.879-57.881c5.943-20.51 17.912-45.189 30.108-58.535"
        />
      </svg>
      <button
        className="text-text/50 hover:text-text/80 right-0 lg:right-64 bottom-0 p-4 absolute"
        onClick={replayAnimation}
      >
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
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      </button>
    </div>
  );
};

export default Hammer;
