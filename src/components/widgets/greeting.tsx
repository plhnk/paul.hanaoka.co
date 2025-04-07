'use client';
import React from 'react';
import { Sun, MoonStar, Coffee, Sunrise, Sunset } from 'lucide-react';
import { cn } from '@/lib/utils';

type GreetingProps = {
  className?: string;
};

const Greeting: React.FC<GreetingProps> = ({ className }) => {
  const currentHour = new Date().getHours();
  let message: string;
  let IconComponent: React.ComponentType<any>;
  //TODO:    做个动态效果
  if (currentHour >= 5 && currentHour < 8) {
    message = 'Hello Early Bird';
    IconComponent = Sunrise;
  } else if (currentHour >= 8 && currentHour < 12) {
    message = '早上好';
    IconComponent = Coffee;
  } else if (currentHour >= 12 && currentHour < 18) {
    message = '下午好';
    IconComponent = Sun;
  } else if (currentHour >= 18 && currentHour < 21) {
    message = '晚上好';
    IconComponent = Sunset;
  } else {
    message = 'Sweet Dreams';
    IconComponent = MoonStar;
  }

  return (
    <span className={cn('flex items-center gap-2', className)}>
      <IconComponent
        className="text-text/50 lg:-ml-6 lg:-mr-0.5"
        width={20}
        height={20}
        strokeWidth={1.5}
      />
      {message}
    </span>
  );
};

export default Greeting;
