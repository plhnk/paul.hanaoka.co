'use client';
import { useEffect, useRef, useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LogoEsvIcon from '@/app/assets/images/icons/logo-esv';

import { getDateInfo } from '@/lib/utils';
import proverbsData from '../../lib/data/proverbs.json';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

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
  // // const proverbIndex = 11; // testing random proverb

  // // determine how many passages are available for the selected proverb
  // const passageCount = proverbs[proverbIndex].passages.length;
  // // get a random passage from the selected proverb, if available
  // const randomPassageIndex = Math.floor(Math.random() * passageCount);
  // // get the selected proverb
  // const proverb = proverbs[proverbIndex].passages[randomPassageIndex];
  // const passage =
  //   proverbs[proverbIndex].passage_meta[randomPassageIndex].canonical;

  const { className } = props;

  // const [proverb, setProverb] = useState(null);
  // const [passage, setPassage] = useState(null);

  const [proverb, setProverb] = useState<string | null>(null);
  const [passage, setPassage] = useState<string | null>(null);

  useEffect(() => {
    // Select a random proverb after hydration
    const proverbIndex = Number(today) - 1; // 0-indexed
    const passageCount = proverbs[proverbIndex].passages.length;
    const randomPassageIndex = Math.floor(Math.random() * passageCount);
    const selectedProverb = proverbs[proverbIndex].passages[randomPassageIndex];
    const selectedPassage =
      proverbs[proverbIndex].passage_meta[randomPassageIndex].canonical;

    setProverb(selectedProverb);
    setPassage(selectedPassage);
  }, [proverbs]);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const checkIfInView = () => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const rect = marquee.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      marquee.style.animationPlayState = inView ? 'running' : 'paused';
    }
  };

  useEffect(() => {
    checkIfInView(); // Initial check

    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);

    return () => {
      window.removeEventListener('scroll', checkIfInView);
      window.removeEventListener('resize', checkIfInView);
    };
  }, []);

  if (!proverb || !passage) {
    // Render skeleton while proverb is loading
    return (
      <div className="flex space-y-4">
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <div className={cn('overflow-hidden py-8 mb-24 sm:mb-16', className)}>
          <div className="relative w-full overflow-hidden whitespace-nowrap">
            <div
              ref={marqueeRef}
              style={{ animationPlayState: 'paused' }}
              className="inline-block whitespace-nowrap animate-[marquee_20s_linear_infinite] text-text"
            >
              <div className="flex *:pr-64">
                <span>{proverb}</span>
                <span>{proverb}</span>
              </div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        sideOffset={-8}
        alignOffset={0}
        className="group z-50 w-80 bg-card/95 border-card hover:border-element/50 hover:-translate-y-2 transition transform"
        asChild
      >
        <a
          href={'https://www.esv.org/' + passage}
          className="flex justify-between align-middle space-x-4"
        >
          <Avatar>
            <AvatarFallback>
              <LogoEsvIcon />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-sm font-light text-text/70 group-hover:text-text italic">
            {passage} from the ESV translation of the Bible.
          </div>
          <ArrowUpRight className="mr-1 -mt-1" />
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}

// TODO --> onClick reload for a new proverb (if available?)
