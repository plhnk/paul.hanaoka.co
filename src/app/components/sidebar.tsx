import React, { ReactNode } from 'react';
import { Card } from '@radix-ui/themes';
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
  FileText,
  Terminal,
  Pizza,
} from 'lucide-react';
import NavSection from './ui/navsection';
import NavButton from './ui/navbutton';
import MobileMenu from './ui/mobilemenu';

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
      hotkey: 'm',
      textToCopy: 'paul@hanaoka.co',
    },
    {
      icon: <Github {...iconStyle} />,
      label: 'GitHub',
      hotkey: 'g',
      url: 'https://github.com/plhnk',
    },
    {
      icon: <FileText {...iconStyle} />,
      label: 'Read.cv',
      hotkey: 'r',
      url: 'https://read.cv/plhnk',
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
    // {
    //   icon: <Terminal {...iconStyle} />,
    //   label: 'Elite',
    //   hotkey: 'e',
    //   theme: 'business',
    // },
    // {
    //   icon: <Pizza {...iconStyle} />,
    //   label: 'Exec',
    //   hotkey: 'c',
    //   theme: 'fun',
    // },
    // TODO polish themes
    {
      icon: <WandSparkles {...iconStyle} />,
      label: 'System',
      hotkey: 's',
      theme: 'system',
    },
  ];

  return (
    <nav className="z-50 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen  sm:pb-16">
      <Card size="3" className="m-4 p-2 sm:m-8 sm:p-4 h-full">
        <div className="grid gap-2 sm:gap-0 grid-cols-[4fr_5fr] grid-rows-auto sm:grid-cols-none sm:grid-rows-[auto_auto_1fr_auto] content-start sm:h-full sm:w-56 my-1 py-2">
          <div className='col-span-2 sm:col-auto'>
            <NavButton
              icon={null}
              label={'Paul Hanaoka'}
              hotkey={'h'}
              url={'/'}
            />
          </div>
          <NavSection className="order-2 sm:order-1" label="Browse" buttons={browse} />
          <NavSection className="order-3 sm:order-2" label="Connect" buttons={connect} />
          <NavSection className="order-1 sm:order-3 row-span-2 sm:row-span-1" label="Theme" buttons={theme} />
        </div>
      </Card>
    </nav>
  );
};

export default Sidebar;
