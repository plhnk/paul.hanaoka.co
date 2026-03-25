import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  BookOpen,
  Camera,
  CircleUserRound,
  Github,
  Layers,
  Mail,
  PenLine,
  PocketKnife,
} from 'lucide-react';

export interface SidebarItemConfig {
  icon: LucideIcon;
  label: string;
  hotkey: string;
  url?: string;
  textToCopy?: string;
}

export const browseItems: SidebarItemConfig[] = [
  {
    icon: CircleUserRound,
    label: 'About',
    hotkey: 'a',
    url: '/about',
  },
  {
    icon: BookOpen,
    label: 'Readme',
    hotkey: 'e',
    url: '/readme',
  },
  {
    icon: BadgeCheck,
    label: 'Picks',
    hotkey: 'i',
    url: '/recommends',
  },
  {
    icon: Layers,
    label: 'Projects',
    hotkey: 'o',
    url: '/projects',
  },
  {
    icon: Camera,
    label: 'Photos',
    hotkey: 'u',
    url: '/photos',
  },
  {
    icon: PenLine,
    label: 'Posts',
    hotkey: 'y',
    url: '/posts',
  },
  {
    icon: PocketKnife,
    label: 'Utils',
    hotkey: 't',
    url: '/utils',
  },
];

export const connectItems: SidebarItemConfig[] = [
  {
    icon: Mail,
    label: 'Email',
    hotkey: 'm',
    textToCopy: 'paul@hanaoka.co',
  },
  {
    icon: Github,
    label: 'GitHub',
    hotkey: 'g',
    url: 'https://github.com/plhnk',
  },
];

export const utilityHotkeys = ['h', 's'] as const;
export const themeHotkeys = ['d', 'l', 'w'] as const;

export function getAllSidebarHotkeys(): string[] {
  return [
    ...browseItems,
    ...connectItems,
  ].map((item) => item.hotkey).concat([...utilityHotkeys, ...themeHotkeys]);
}
