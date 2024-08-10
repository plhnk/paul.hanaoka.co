'use client';
import { useEffect, useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import LogoEsvIcon from '@/app/assets/images/icons/logo-esv';
import { getDateInfo } from '@/lib/utils';
import proverbsData from '../../lib/data/proverbs.json';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import DashboardCard from '../ui/dashboardcard';

const { today } = getDateInfo();

export default function Proverbs(props: { className?: string }) {
  const proverbs: Proverbs = proverbsData;
  interface Proverbs {
    [key: number]: {
      query: string;
      passages: string[];
      passage_meta: {
        canonical: string;
      }[];
    };
  }

  const { className } = props;
  const proverbIndex = Number(today) - 1; // 0-indexed
  const [currentProverbIndex, setCurrentProverbIndex] = useState(0);

  const passageCount = proverbs[proverbIndex].passages.length;
  const proverb = proverbs[proverbIndex].passages[currentProverbIndex];
  const passage =
    proverbs[proverbIndex].passage_meta[currentProverbIndex].canonical;

  const handleClick = () => {
    if (passageCount > 1) {
      setCurrentProverbIndex((prevIndex) => (prevIndex + 1) % passageCount);
    }
  };

  const ESV_hover = (
    <HoverCard openDelay={100}>
      <HoverCardTrigger className='cursor-default'>
        <LogoEsvIcon />
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        align="start"
        sideOffset={32}
        alignOffset={-4}
        className="group z-50 bg-card/60 backdrop-blur-md rounded-md w-auto border-card/80 hover:border-element/50 hover:-translate-y-2 transition transform"
        asChild
      >
        <a
          href={'https://www.esv.org/' + passage}
          className="flex justify-between align-middle space-x-4"
        >
          <div className="space-y-1 text-sm font-light normal-case tracking-normal text-text/70 group-hover:text-text italic">
            {passage}
          </div>
          <ArrowUpRight className="mr-1 -mt-1 group-hover:text-text/80" />
        </a>
      </HoverCardContent>
    </HoverCard>
  );

  const title = (
    <span className="flex justify-between">
      {'Proverb of the Day'}
      {ESV_hover}
    </span>
  );

  // Render skeleton while proverb is loading
  if (!proverb || !passage) {
    return (
      <div className="flex space-y-4">
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  const dots = Array.from({ length: passageCount }).map((_, index) => (
    <span
      key={index}
      className={cn('h-2 w-2 rounded-full', {
        'bg-element/10': index !== currentProverbIndex,
        'bg-element/20': index === currentProverbIndex,
      })}
    />
  ));

  return (
    <DashboardCard
      title={title}
      content={proverb}
      className={cn(`${passageCount > 1 ? 'cursor-pointer' : 'pb-2 md:pb-8'}`, className)}
      onClick={passageCount > 1 ? handleClick : undefined}
      graphic={
        passageCount > 1 ? <div className="flex space-x-2">{dots}</div> : null
      }
    />
  );
}
