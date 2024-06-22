import {
  CircleUserRound,
  Layers,
  Camera,
  BadgeCheck,
  BookOpen,
  Calendar,
  Mail,
  Github,
  FileText,
  Twitter,
  Terminal,
  Pizza,
} from 'lucide-react';

const iconStyle = {
  size: 16,
  color: 'currentColor',
  strokeWidth: 2,
  className:
    'hidden sm:block text-element/50 self-center group-hover:text-accent group-focus-visible:text-accent/60',
};

export const getNavItems = (collapsed) => {
  const browse = [
    {
      icon: <CircleUserRound {...iconStyle} />,
      label: 'About',
      hotkey: 'a',
      collapsed: collapsed,
      url: '/about',
    },
    {
      icon: <Layers {...iconStyle} />,
      label: 'Projects',
      hotkey: 'p',
      collapsed: collapsed,
      url: '/projects',
    },
    {
      icon: <Camera {...iconStyle} />,
      label: 'Photos',
      hotkey: 'u',
      collapsed: collapsed,
      url: '/photos',
    },
    {
      icon: <BadgeCheck {...iconStyle} />,
      label: 'Picks',
      hotkey: 'i',
      collapsed: collapsed,
      url: '/recommends',
    },
    {
      icon: <BookOpen {...iconStyle} />,
      label: 'Readme',
      hotkey: 'e',
      collapsed: collapsed,
      url: '/readme',
    },
  ];

  const connect = [
    {
      icon: <Calendar {...iconStyle} />,
      label: 'Calendar',
      hotkey: 'c',
      collapsed: collapsed,
      url: 'https://cal.com/plhnk',
    },
    {
      icon: <Mail {...iconStyle} />,
      label: 'Email',
      hotkey: 'm',
      collapsed: collapsed,
      textToCopy: 'paul@hanaoka.co',
    },
    {
      icon: <Github {...iconStyle} />,
      label: 'GitHub',
      hotkey: 'g',
      collapsed: collapsed,
      url: 'https://github.com/plhnk',
    },
    {
      icon: <FileText {...iconStyle} />,
      label: 'Read.cv',
      hotkey: 'r',
      collapsed: collapsed,
      url: 'https://read.cv/plhnk',
    },
    {
      icon: <Twitter {...iconStyle} />,
      label: 'Twitter',
      hotkey: 't',
      collapsed: collapsed,
      url: 'https://twitter.com/plhnk',
    },
  ];

  const theme = [
    {
      icon: <Terminal {...iconStyle} />,
      label: 'Elite',
      hotkey: 'e',
      collapsed: collapsed,
      theme: 'elite',
    },
    {
      icon: <Pizza {...iconStyle} />,
      label: 'Exec',
      hotkey: 'c',
      collapsed: collapsed,
      theme: 'exec',
    },
  ];

  return [...browse, ...connect, ...theme];
};
