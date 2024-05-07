'use client';
import React, { useEffect, useState } from 'react';
import { RecommendsProps } from '@/lib/utilities/types';
import Link from '../components/ui/link';
import recommendsData from '@/lib/data/recommends.json';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import Image from 'next/image';
import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import ProgressiveBlur from './ui/progressiveblur';

const Recommends: React.FC<{ className?: string }> = ({ className }) => {
  const [recommends, setRecommends] = useState<RecommendsProps[]>([]);

  useEffect(() => {
    setRecommends(recommendsData);
  }, []);

  const groupedRecommends = recommends.reduce(
    (groups: { [key: string]: RecommendsProps[] }, item) => {
      const group = groups[item.category] || [];
      group.push(item);
      groups[item.category] = group;
      return groups;
    },
    {}
  );

  // Smooth scrolling to sections
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.pageYOffset - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Create a state to store the direction of each arrow
  const [arrowDirections, setArrowDirections] = useState<
    Record<string, 'up' | 'down' | 'none'>
  >({});

  // Create categoryRefs
  const categoryRefs = Object.keys(groupedRecommends).reduce(
    (refs, category) => {
      refs[category] = React.createRef();
      return refs;
    },
    {} as Record<string, React.RefObject<HTMLDivElement>>
  );

  // Update arrowDirections when the scroll position changes
  useEffect(() => {
    const handleScroll = () => {
      const newArrowDirections = Object.entries(categoryRefs).reduce(
        (directions, [category, ref]) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const middleOfElement = rect.top + rect.height / 2;
            const middleOfViewport = window.innerHeight / 2;
            if (middleOfElement >= 0 && middleOfElement <= window.innerHeight) {
              directions[category] = 'none';
            } else if (middleOfElement > middleOfViewport) {
              directions[category] = 'down';
            } else {
              directions[category] = 'up';
            }
          }
          return directions;
        },
        {} as Record<string, 'up' | 'down' | 'none'>
      );
      setArrowDirections(newArrowDirections);
    };

    // Nice Horizontal Arrow --> disappears when you get to end
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categoryRefs]);
  const [arrowOpacity, setArrowOpacity] = useState(1);
  const [arrowRotate, setArrowRotate] = useState(0); 

  useEffect(() => {
    const parentDiv = document.getElementById('onPageNav');
    if (!parentDiv) return;

    const handleScroll = () => {
      // Calculate the maximum scroll position
      const maxScrollLeft = parentDiv.scrollWidth - parentDiv.clientWidth;
      // Calculate the opacity based on the current scroll position and the maximum scroll position
      const opacity = parentDiv.scrollLeft < maxScrollLeft ? 1 - parentDiv.scrollLeft / maxScrollLeft : 1;
      const rotate = parentDiv.scrollLeft < maxScrollLeft ? 0 : 180;
      // Set the opacity state variable to the calculated opacity
      setArrowOpacity(opacity);
      setArrowRotate(rotate);
      console.log(opacity, 'arrow opacity');
    };

    parentDiv.addEventListener('scroll', handleScroll);
    return () => parentDiv.removeEventListener('scroll', handleScroll);
  }, []);

  const iconStyles = {
    className: 'invisible group-hover:visible opacity-80 absolute -right-4',
    stroke: 'currentColor',
  };

  return (
    <div className={`relative flex flex-col mt-40 2xl:mt-0 main-content ${className} `}>
      <div
        className={
          '-ml-3 pl-4 sm:-ml-6 sm:px-9 2xl:px-4 py-2 rounded-xl sticky top-0 sm:top-10 z-30 w-[calc(100% + .75rem)] sm:col-span-4 flex overflow-x-scroll'
        }
        id="onPageNav"
      >
        {/* overflow-visible  */}
        {/*  overflow-x-scroll overflow-y-clip */}
        {Object.keys(groupedRecommends).map((category) => (
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
            style={{ opacity: arrowOpacity, transform: `rotate(${arrowRotate}deg)` }}
          />
        </div>
      </div>
      <ProgressiveBlur className="block sticky -ml-4 sm:-ml-80 -mt-10 z-20 top-0 h-32 sm:h-64 w-dvw max-w-4xl 2xl:-ml-32 rotate-180" />
      {Object.entries(groupedRecommends).map(([category, recommends]) => (
        <div
          className="my-16 sm:my-32 2xl:my-20"
          key={category}
          id={category}
          ref={categoryRefs[category]}
        >
          <ul className="my-16">
            {recommends.map((recommend, index) => (
              <li
                className="flex flex-col sm:flex-row relative my-12"
                key={index}
              >
                <Image
                  alt={recommend.label + '’s logo'}
                  src={'/images/' + recommend.icon}
                  width={48}
                  height={48}
                  className="absolute right-4 sm:right-[unset] top-4 sm:top-6 sm:-ml-3 w-6 h-6 rounded-md z-10"
                />
                <Card className="bg-background relative">
                  <CardHeader className="flex-row items-center z-10">
                    <CardTitle className="mr-4">
                      {recommend.url ? (
                        <Link className="p-4 pl-0 pr-6" href={recommend.url}>
                          {recommend.label}
                        </Link>
                      ) : (
                        recommend.label
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-w-[60ch]">
                    <div className="relative z-10">
                      <p className="mb-4 italic font-light">
                        {recommend.description}
                      </p>
                      {(Array.isArray(recommend.referralLink)
                        ? recommend.referralLink
                        : []
                      ).map((referral, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger>
                              <Link href={referral.url} className="mr-4">
                                {referral.cta}
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              className="bg-transparent border border-element/10 backdrop-blur-md drop-shadow-md"
                              align="start"
                              alignOffset={-16}
                            >
                              {referral.description}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    <div
                      className="absolute w-[200%] h-[200%] bg-blend-hard-light bg-cover bg-left-bottom bg-no-repeat bg-background pointer-events-none inset-0 blur-3xl z-0 from-background/80 to-background/30 -rotate-12"
                      style={{
                        backgroundImage: `linear-gradient(to top right, var(--tw-gradient-stops)), url(${
                          '/images/' + recommend.icon
                        })`,
                      }}
                    />
                  </CardContent>
                </Card>
                {recommend.tags && (
                  <div className="ml-3 mt-5 flex flex-row sm:flex-col items-start overflow-x-scroll">
                    {recommend.tags.map((tag, index) => (
                      <div
                        className="rounded-full text-nowrap mr-2 sm:mr-0 sm:mb-2 px-3 py-1 bg-card text-element text-sm"
                        key={index}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Recommends;

// TODO --> add external Link, to Link? or something

// TODO --> componentize:
// sidescroll
// card?
// tags
// onpage nav
// TODO --> sticky nav not working on mobile
// TODO --> review z-indexes on mobile
// TODO --> review z-indexes on desktop
// TODO --> style current onPage items for mobile
// TODO --> styles for the diff tags
// TODO --> link tags? lots more work there