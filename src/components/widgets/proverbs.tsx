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
  // const proverbIndex = 11;
  const proverbIndex = Number(today) - 1; // 0-indexed

  // determine how many passages are available for the selected proverb
  const passageCount = proverbs[proverbIndex].passages.length;
  // get a random passage from the selected proverb, if available
  const randomPassageIndex = Math.floor(Math.random() * passageCount);
  // get the selected proverb
  const proverb = proverbs[proverbIndex].passages[randomPassageIndex];
  const passage =
    proverbs[proverbIndex].passage_meta[randomPassageIndex].canonical;

  const { className } = props;
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <div className={cn('overflow-hidden py-8 mb-24 sm:mb-16', className)}>
          <div className="text-text/60 font-light italic w-full *:mr-4">
            {/* <div>{proverb}</div> */}
            <div>{proverb}</div>
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
          {/* </div> */}
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}

// TODO --> onClick reload for a new proverb (if available)
// TODO --> on hover (or something) add a tooltip w/the canonical reference
// https://www.esv.org/Proverbs+1/
