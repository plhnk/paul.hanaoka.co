'use client';
import React from 'react';
import { Sun, MoonStar, Coffee, Sunrise, Sunset } from 'lucide-react';

const Greeting: React.FC = () => {
  const currentHour = new Date().getHours();
  let message: string;
  let IconComponent: React.ComponentType<any>;

  if (currentHour >= 5 && currentHour < 8) {
    message = 'Hello Early Bird';
    IconComponent = Sunrise;
  } else if (currentHour >= 8 && currentHour < 12) {
    message = 'Good Morning';
    IconComponent = Coffee;
  } else if (currentHour >= 12 && currentHour < 18) {
    message = 'Good Afternoon';
    IconComponent = Sun;
  } else if (currentHour >= 18 && currentHour < 21) {
    message = 'Good Evening';
    IconComponent = Sunset;
  } else {
    message = 'Sweet Dreams';
    IconComponent = MoonStar;
  }

  return (
    <span className="flex items-center gap-2 mt-6">
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
