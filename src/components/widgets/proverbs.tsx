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
  // import { useEffect, useRef, useState } from 'react';

  // ...

  const proverbRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const proverbElement = proverbRef.current;
    if (!proverbElement) return;

    const proverbWidth = proverbElement.offsetWidth;
    const animationDuration = proverbWidth / 100; // Adjust the divisor to control the speed

    let animationId: number;

    const animateProverb = () => {
      proverbElement.style.transform = 'translateX(100%)';
      proverbElement.style.transition = `transform ${animationDuration}s linear`;

      animationId = requestAnimationFrame(() => {
        proverbElement.style.transform = 'translateX(-100%)';
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      cancelAnimationFrame(animationId);
      proverbElement.style.transition = 'none';
      proverbElement.style.transform = 'translateX(0)';
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      animateProverb();
    };

    proverbElement.addEventListener('mouseenter', handleMouseEnter);
    proverbElement.addEventListener('mouseleave', handleMouseLeave);

    animateProverb();

    return () => {
      cancelAnimationFrame(animationId);
      proverbElement.removeEventListener('mouseenter', handleMouseEnter);
      proverbElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // ...

  // return (
  //   <HoverCard>
  //     <HoverCardTrigger asChild>
  //       <div className="overflow-hidden">
  //         <div className="text-text/80" ref={proverbRef}>
  //           {proverb}
  //         </div>
  //       </div>
  //     </HoverCardTrigger>
  //     {/* ... */}
  //   </HoverCard>
  // );
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="overflow-hidden">
          <div ref={proverbRef} className="text-text/80">
            {proverb}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
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
