import React from 'react';
import { Sun, MoonStar, Coffee, Sunrise, Sunset } from 'lucide-react';
import Projects from '@/components/projects';
import MaskedImage from '@/components/ui/maskedImage';
import Highlight from '@/components/ui/highlight';

const svgMask = `
<svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 0H0V70C0 97.6142 22.3858 120 50 120C77.6142 120 100 97.6142 100 70V0Z" fill="#D9D9D9"/>
</svg>
`;

const TimeBasedGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 8) {
    return { message: 'Hello Early Bird', IconComponent: Sunrise };
  } else if (currentHour >= 8 && currentHour < 12) {
    return { message: 'Good Morning', IconComponent: Coffee };
  } else if (currentHour >= 12 && currentHour < 18) {
    return { message: 'Good Afternoon', IconComponent: Sun };
  } else if (currentHour >= 18 && currentHour < 21) {
    return { message: 'Good Evening', IconComponent: Sunset };
  } else {
    return { message: 'Sweet Dreams', IconComponent: MoonStar };
  }
};

export default function Home() {
  const { message, IconComponent } = TimeBasedGreeting();

  return (
    <>
      <div className="col-span-7 lg:col-start-2">
        <div className="flex justify-between">
          <span className="flex items-center gap-2 mt-6">
            <IconComponent
              className="text-text/50 -ml-6 -mr-0.5"
              width={20}
              height={20}
              strokeWidth={1.5}
            />
            {message}
          </span>
          <span className="mt-6 flex items-center gap-2 small-caps font-mono font-light text-green-50 px-3 py-0 h-8 bg-green-950/50 rounded-full outline outline-2 outline-green-950/30 -outline-offset-1">
            <div className="animate-pulse bg-green-500 rounded-full h-2 w-2 outline outline-2 -outline-offset-1 outline-green-700/50" />{' '}
            Available
          </span>
        </div>
        <div className="flex justify-between items-end mt-40 mb-32">
          <h1 className="text-4xl text-text/60">
            Paul Hanaoka is a <br />
            <Highlight word="designer" hoverContent="designer" /> with a passion
            for building <br />
            <Highlight
              word="high-quality"
              hoverContent="Beautiful and useful"
            />{' '}
            <Highlight
              word="products"
              hoverContent="mostly software, but sometimes websites, homes, cabinets, and anything else that needs building"
            />{' '}
            and doing
            <br />
            other stuff good too.
          </h1>
          <MaskedImage
            svgPath={svgMask}
            imageSrc="/images/tiny-dank-guy.png"
            width="300px"
            height="300px"
          />
        </div>
      </div>
      <div className="col-span-4 lg:col-start-2">
        <Projects variant="random" />
      </div>
    </>
  );
}
