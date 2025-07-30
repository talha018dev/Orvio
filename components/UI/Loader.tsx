
import { cn } from '@/utils/tailwind-merge';
import React from 'react';

const Loader = ({ divClassName }: { divClassName?: string }) => {
  const items = Array.from({ length: 9 });
  return (
    <div className={cn("bg-pageBgColor bg-opacity-50 z-50 flex items-center justify-center", divClassName)}>
      <div className='grid grid-cols-3 grid-rows-3 size-12'>
        {items.map((_, index) => (
          <div
            key={index}
            className='bg-primary'
            style={{
              animation: `flipping-18i5bq 1.5s ${index * 0.1}s infinite backwards`
            }}
          ></div>
        ))}
        <style>
          {`
          @keyframes flipping-18i5bq {
            0% {
              transform: perspective(67.2px) rotateX(-90deg);
            }
            50%, 75% {
              transform: perspective(67.2px) rotateX(0);
            }
            100% {
              opacity: 0;
              transform: perspective(67.2px) rotateX(0);
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
