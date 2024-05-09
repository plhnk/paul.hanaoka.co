'use client';
import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import ProgressiveBlur from './progressiveblur';

const OnPageNav: React.FC<{
  categories: string[];
  scrollOffset: number;
}> = ({ categories, scrollOffset }) => {
  const [arrowDirections, setArrowDirections] = useState<
    Record<string, 'up' | 'down' | 'none'>
  >({});

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const [arrowOpacity, setArrowOpacity] = useState(1);
  const [arrowRotate, setArrowRotate] = useState(0);

  useEffect(() => {
    const parentDiv = document.getElementById('onPageNav');
    if (!parentDiv) return;

    const handleScroll = () => {
      const maxScrollLeft = parentDiv.scrollWidth - parentDiv.clientWidth;
      const opacity =
        parentDiv.scrollLeft < maxScrollLeft
          ? 1 - parentDiv.scrollLeft / maxScrollLeft
          : 1;
      const rotate = parentDiv.scrollLeft < maxScrollLeft ? 0 : 180;

      setArrowOpacity(opacity);
      setArrowRotate(rotate);
    };

    parentDiv.addEventListener('scroll', handleScroll);
    return () => parentDiv.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top =
      element.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const iconStyles = {
    className: 'invisible group-hover:visible opacity-80 absolute -right-4',
    stroke: 'currentColor',
  };

  return (
    <>
      <div
        className={
          '-ml-3 pl-4 sm:-ml-6 sm:px-9 2xl:px-4 py-2 rounded-xl sticky top-0 sm:top-10 z-30 w-[calc(100% + .75rem)] sm:col-span-4 flex overflow-x-scroll'
        }
        id="onPageNav"
      >
        {categories.map((category) => (
          <button
            className="group text-nowrap p-3 mr-8 flex relative"
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
      <ProgressiveBlur className="block sticky -ml-4 sm:-ml-80 -mt-10 z-20 top-0 h-32 sm:h-64 w-dvw max-w-4xl 2xl:-ml-32 rotate-180" />
    </>
  );
};

export default OnPageNav;
