'use client';
import React, { useEffect, useState } from 'react';
import { RecommendsProps } from '@/lib/utilities/types';
import Link from '../components/ui/link';
import recommendsData from '@/lib/data/recommends.json';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import OnPageNav from './ui/on-page-nav';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import Image from 'next/image';

const Recommends: React.FC<{ className?: string; collapsed?: boolean }> = ({
  className,
  collapsed,
}) => {
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

  // Create categoryRefs
  const categoryRefs = Object.keys(groupedRecommends).reduce(
    (refs, category) => {
      refs[category] = React.createRef();
      return refs;
    },
    {} as Record<string, React.RefObject<HTMLDivElement>>
  );

  console.log(Object.keys(groupedRecommends), 'onPageNav props');
  // console.log(Object.entries(groupedRecommends), 'entries');
  console.log(Object.entries(categoryRefs), 'categoryRefs');

  return (
    <div className={`relative flex flex-col main-content ${className} `}>
      <OnPageNav
        collapsed={collapsed}
        className="sm:px-3 sm:*:px-6 sm:-ml-3"
        categories={Object.keys(groupedRecommends)}
        scrollOffset={140}
      />

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
// add stickermule
