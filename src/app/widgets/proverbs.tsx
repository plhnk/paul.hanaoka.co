'use-client';
import DashboardCard from '../components/ui/dashboardcard';
import { getDateInfo } from '@/lib/utils';
import { useState } from 'react';

const { today } = getDateInfo();

import proverbsData from '../../lib/data/proverbs.json';
interface ProverbsProps {
  className?: string;
}

export default function Proverbs(props: ProverbsProps) {
  const proverbs: Proverbs = proverbsData;
  const { className } = props;
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

  return (
    <>
      <DashboardCard
        className={className}
        title="Daily Proverb"
        content={proverb}
      />
    </>
  );
}

// TODO --> onClick reload the card for a new proverb (if available)
// TODO --> on hover (or something) add a tooltip w/the canonical reference
