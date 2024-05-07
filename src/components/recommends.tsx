'use client';
import React, { useEffect, useState, useLayoutEffect } from 'react';
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
import { ArrowDown, ArrowUp } from 'lucide-react';

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
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
              directions[category] = 'none';
            } else if (rect.top > window.innerHeight) {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categoryRefs]);

  return (
    <div className={`flex flex-col gap-y-32 my-48 main-content ${className}`}>
      <div className="-ml-6 px-9 py-2 rounded-xl bg-background/20 backdrop-blur-lg sticky top-11 z-30 w-full col-span-4 flex">
        {Object.keys(groupedRecommends).map((category) => (
          <button
            className="p-3 mr-8 inline"
            onClick={() => scrollTo(category)}
            key={category}
          >
            {category}
            {arrowDirections[category] === 'up' ? (
              <ArrowUp />
            ) : arrowDirections[category] === 'down' ? (
              <ArrowDown />
            ) : null}
          </button>
        ))}
      </div>
      {Object.entries(groupedRecommends).map(([category, recommends]) => (
        <div key={category} id={category} ref={categoryRefs[category]}>
          <ul className="my-16">
            {recommends.map((recommend, index) => (
              <li className="flex relative my-12" key={index}>
                <Image
                  alt={recommend.label + '’s logo'}
                  src={'/images/' + recommend.icon}
                  width={48}
                  height={48}
                  className="absolute top-6 -ml-3 w-6 h-6 rounded-md z-20"
                />
                <Card className="bg-background relative">
                  <CardHeader className="flex-row items-center z-10">
                    <CardTitle className="mr-4">
                      <Link href={`${recommend.url}`}>{recommend.label}</Link>
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
                              className="bg-transparent backdrop-blur-md drop-shadow-md"
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
                  <div className="ml-3 mt-5 flex flex-col items-start">
                    {recommend.tags.map((tag, index) => (
                      <div
                        className="rounded-full mb-2 px-3 py-1 bg-card text-element text-sm"
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
