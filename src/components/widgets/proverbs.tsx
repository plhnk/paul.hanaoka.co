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

const { today } = getDateInfo();

export default function Proverbs() {
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

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="overflow-hidden">
          <div className="text-text/60 font-light italic relative inline-flex whitespace-nowrap *:mr-4">
            {/* <div>{proverb}</div> */}
            <div>{proverb}</div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side='top'
        className="group w-80 border-card hover:border-element/50 hover:-translate-y-2 transition transform"
        asChild
      >
        <a
          href={'https://www.esv.org/' + passage}
          className="flex justify-between align-middle space-x-4"
        >
          {/* <div > */}
          <Avatar>
            <AvatarFallback>
              <LogoEsvIcon />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-sm font-light text-text/70 group-hover:text-text italic">
            {passage} from the ESV translation of the Bible.
          </div>
          {/* </div> */}
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}

// TODO --> onClick reload for a new proverb (if available)
// TODO --> on hover (or something) add a tooltip w/the canonical reference
// https://www.esv.org/Proverbs+1/
