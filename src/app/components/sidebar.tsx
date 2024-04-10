import React, { ReactNode } from 'react';
import { Card, Flex, Box } from '@radix-ui/themes';
import {
  CircleUserRound,
  Layers,
  PenLine,
  Mail,
  Github,
  Twitter,
  WandSparkles,
  Moon,
  Sun,
  Terminal,
  Pizza,
} from 'lucide-react';
import NavSection from './ui/navsection';
import NavButton from './ui/navbutton';

interface SidebarProps {
  children?: ReactNode;
  iconStyle?: object;
}

const iconStyle = {
  size: 16,
  color: 'currentColor',
  strokeWidth: 2,
  className: 'text-neutral-700 self-center mr-2 group-hover:text-neutral-400',
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const browse = [
    {
      icon: <CircleUserRound {...iconStyle} />,
      label: 'About',
      hotkey: 'a',
      url: '/about',
    },
    {
      icon: <Layers {...iconStyle} />,
      label: 'Portfolio',
      hotkey: 'p',
      url: '/portfolio',
    },
    {
      icon: <PenLine {...iconStyle} />,
      label: 'Blog',
      hotkey: 'b',
      url: '/blog',
    },
  ];

  const connect = [
    {
      icon: <Mail {...iconStyle} />,
      label: 'Email',
      hotkey: 'e',
      textToCopy: 'paul@hanaoka.co',
    },
    {
      icon: <Github {...iconStyle} />,
      label: 'GitHub',
      hotkey: 'g',
      url: 'https://github.com/plhnk',
    },
    {
      icon: <Twitter {...iconStyle} />,
      label: 'Twitter',
      hotkey: 't',
      url: 'https://twitter.com/plhnk',
    },
  ];

  const theme = [
    {
      icon: <Moon {...iconStyle} />,
      label: 'Dark',
      hotkey: 'd',
      theme: 'dark',
    },
    {
      icon: <Sun {...iconStyle} />,
      label: 'Light',
      hotkey: 'l',
      theme: 'light',
    },
    {
      icon: <Terminal {...iconStyle} />,
      label: 'CLI',
      hotkey: 'c',
      theme: 'business',
    },
    {
      icon: <Pizza {...iconStyle} />,
      label: 'Fun',
      hotkey: 'f',
      theme: 'fun',
    },
    {
      icon: <WandSparkles {...iconStyle} />,
      label: 'System',
      hotkey: 's',
      theme: 'system',
    },
  ];

  return (
    <nav className="z-50 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen  sm:pb-16">
      <Card size="3" className="m-4 p-4 sm:m-8 sm:p-4 h-full">
        <Flex
          direction={{
            initial: 'row',
            xs: 'column',
            // TODO match up radix and tailwind breakpoints
          }}
          className="sm:h-full sm:w-56 my-1 py-2"
        >
          <NavButton icon={null} label={'Paul Hanaoka'} hotkey={'h'} url={'/'}/>
          <NavSection label="Browse" buttons={browse} />
          <Box className="m-2" />
          <NavSection label="Connect" buttons={connect} />
          <Box style={{ flexGrow: 1 }} />
          <NavSection label="Theme" buttons={theme} />
        </Flex>
      </Card>
    </nav>
  );
};

export default Sidebar;
