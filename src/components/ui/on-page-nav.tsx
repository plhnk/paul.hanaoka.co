'use client';
import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import ProgressiveBlur from './progressiveblur';
import { cn } from '@/lib/utils';

const OnPageNav: React.FC<{
  categories: string[];
  scrollOffset: number;
  className?: string;
  collapsed?: boolean;
}> = ({ categories, scrollOffset, className, collapsed }) => {
  const [arrowDirections, setArrowDirections] = useState<
    Record<string, 'up' | 'down' | 'none'>
  >({});

  useEffect(() => {
    const handleWindowScroll = () => {
      const newArrowDirections = categories.reduce((directions, category) => {
        const element = document.getElementById(category);
        if (!element) return directions;

        const rect = element.getBoundingClientRect();
        const middleOfElement = rect.top + rect.height / 2;
        const middleOfViewport = window.innerHeight / 2;

        if (middleOfElement >= 0 && middleOfElement <= window.innerHeight) {
          directions[category] = 'none';
        } else if (middleOfElement > middleOfViewport) {
          directions[category] = 'down';
        } else {
          directions[category] = 'up';
        }
        return directions;
      }, {} as Record<string, 'up' | 'down' | 'none'>);
      setArrowDirections(newArrowDirections);
    };

    window.addEventListener('scroll', handleWindowScroll);
    handleWindowScroll(); // Initial call to set directions on mount
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [categories]);

  useEffect(() => {
    const handleResize = () => {
      // add more resize logic...
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const viewportWidth = window.innerWidth;
    const isLargeViewport = viewportWidth >= 2000;

    if (isLargeViewport) {
      const container = document.getElementById('2xl-faux-browser');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollToPosition =
          elementRect.top -
          containerRect.top +
          container.scrollTop -
          scrollOffset;
        container.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
      }
    } else {
      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        scrollOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const [arrowOpacity, setArrowOpacity] = useState(1);
  const [arrowRotate, setArrowRotate] = useState(0);

  useEffect(() => {
    const parentDiv = document.getElementById('onPageNav');
    if (!parentDiv) return;

    const handleParentScroll = () => {
      const maxScrollLeft = parentDiv.scrollWidth - parentDiv.clientWidth;
      const opacity =
        parentDiv.scrollLeft < maxScrollLeft
          ? 1 - parentDiv.scrollLeft / maxScrollLeft
          : 1;
      const rotate = parentDiv.scrollLeft < maxScrollLeft ? 0 : 180;

      setArrowOpacity(opacity);
      setArrowRotate(rotate);
    };

    parentDiv.addEventListener('scroll', handleParentScroll);
    handleParentScroll(); // Initial call to set opacity and rotate on mount
    return () => parentDiv.removeEventListener('scroll', handleParentScroll);
  }, []);

  const activeCategory = Object.entries(arrowDirections).reduce(
    (active, [category, direction]) => {
      if (direction === 'none') return category;
      if (active === null && direction === 'down') return category;
      return active;
    },
    null as string | null
  );

  const iconStyles = {
    className: 'invisible group-hover:visible opacity-80 absolute -right-4',
    stroke: 'currentColor',
  };

  return (
    <>
      <div
        className={cn(
          '-ml-4 pl-4 sm:-ml-7 sm:px-7 2xl:px-3 py-2 rounded-xl sticky top-0 sm:top-10 z-30 w-[calc(100% + .75rem)] sm:col-span-4 lg:col-span-5 flex overflow-x-scroll lg:overflow-x-visible gap-8',
          className
        )}
        id="onPageNav"
      >
        {categories.map((category) => (
          <button
            className={
              'group text-nowrap px-3 py-1 sm:px-4 sm:py-2 flex items-center relative capitalize hover:bg-card/20 rounded-md ' +
              (category === activeCategory
                ? 'bg-background/60'
                : 'bg-background/20')
            }
            onClick={() => scrollTo(category)}
            key={category}
          >
            {category}
            {arrowDirections[category] === 'up' ? (
              <ArrowUp {...iconStyles} />
            ) : arrowDirections[category] === 'down' ? (
              <ArrowDown {...iconStyles} />
            ) : null}
          </button>
        ))}
        <div className="sm:hidden sticky rounded-md right-0 z-10 backdrop-blur-md my-auto p-3 flex">
          <ArrowRight
            size={24}
            className="center-self-center opacity-80 transition-transform ease-in-out"
            style={{
              opacity: arrowOpacity,
              transform: `rotate(${arrowRotate}deg)`,
            }}
          />
        </div>
      </div>
      <ProgressiveBlur
        className={`block sticky -ml-4 -mt-10 z-20 top-0 h-32 sm:h-64 w-dvw lg:-ml-[25%] lg:max-w-[150%] rotate-180 ${
          collapsed ? 'sm:-ml-32' : 'sm:-ml-80'
        }`}
      />
    </>
  );
};

export default OnPageNav;
