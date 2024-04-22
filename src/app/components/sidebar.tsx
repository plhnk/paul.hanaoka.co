'use client';
import { cn } from '@/lib/utils';
import React, { ReactNode, useState, useEffect } from 'react';
import {
  CircleUserRound,
  Layers,
  PenLine,
  Mail,
  Github,
  Twitter,
  FileText,
  Terminal,
  Pizza,
} from 'lucide-react';
import NavSection from './ui/navsection';
import NavButton from './ui/navbutton';
import ModeToggle from './ui/modetoggle';
interface SidebarProps {
  children?: ReactNode;
  iconStyle?: object;
}

const iconStyle = {
  size: 16,
  color: 'currentColor',
  strokeWidth: 2,
  className:
    'text-element/50 self-center mr-2 group-hover:text-accent group-focus-visible:text-accent/60',
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
      icon: <Terminal {...iconStyle} />,
      label: 'Elite',
      hotkey: 'e',
      theme: 'elite',
    },
    {
      icon: <Pizza {...iconStyle} />,
      label: 'Exec',
      hotkey: 'c',
      theme: 'exec',
    },
    // TODO polish themes
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    // TODO add mobile styles for nav
    // e.g. box shadow when nav is open, merge border radii
    <>
      <nav
        className={
          `${isMobileMenuOpen ? 'hidden ' : 'block '}` +
          'z-40 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen  sm:pb-16 mb-12'
        }
      >
        <div className="backdrop-blur-lg rounded-xl m-4 p-2 sm:m-8 sm:p-4 h-full bg-card/65">
          <div className="grid p-0 py-0.5 sm:h-full sm:w-56 gap-2 sm:gap-2 grid-cols-[4fr_5fr] grid-rows-auto sm:grid-cols-none sm:grid-rows-[auto_auto_1fr_auto] content-start">
            <div className="hidden sm:col-auto sm:block">
              <NavButton
                icon={null}
                label={'Hanaoka.co'}
                hotkey={'h'}
                url={'/'}
              />
            </div>
            <NavSection className="" label="Browse" buttons={browse} />
            <NavSection
              className="sm:mt-2.5"
              label="Connect"
              buttons={connect}
            />
            {/* <NavSection className="" label="Theme" buttons={theme} /> */}
            <ModeToggle />
          </div>
        </div>
      </nav>
      <button
        onClick={handleMenuButtonClick}
        className="block sm:hidden fixed right-0 bottom-0 m-4 p-2 px-3 z-50 backdrop-blur-lg bg-card/65 rounded-xl"
      >
        {isMobileMenuOpen ? 'Menu' : 'Close'}
      </button>
    </>
  );
};

export default Sidebar;