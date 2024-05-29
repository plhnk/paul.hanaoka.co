'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import {
  BadgeCheck,
  Calendar,
  Camera,
  CircleUserRound,
  Layers,
  PanelLeftOpen,
  PanelLeftClose,
  Mail,
  Github,
  Twitter,
  FileText,
  Terminal,
  Pizza,
  Home,
} from 'lucide-react';
import NavSection from './ui/navsection';
import NavButton from './ui/navbutton';
import ModeToggle from './ui/modetoggle';
import { cn } from '@/lib/utils';
interface SidebarProps {
  children?: ReactNode;
  iconStyle?: object;
  className?: string;
  collapsed?: boolean;
  toggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, collapsed, toggleCollapse }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const iconStyle = {
    size: 16,
    color: 'currentColor',
    strokeWidth: 2,
    className: `hidden sm:block text-element/50 self-center group-hover:text-accent group-focus-visible:text-accent/60 ${
      collapsed ? 'mr-0' : 'mr-2'
    }`,
  };

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
    // {
    //   icon: <PenLine {...iconStyle} />,
    //   label: 'Blog',
    //   hotkey: 'b',
    //   collapsed: collapsed,
    //   url: '/blog',
    // },
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
    // TODO polish themes
  ];

  return (
    <>
      <nav
        className={cn(
          'z-40 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen sm:pb-16 mb-1 2xl:left-auto 2xl:bottom-auto 2xl:top-auto 2xl:max-h-[calc(1200px_-_1rem)]',
          className
        )}
      >
        <div
          className={`sm:w-64 backdrop-blur-lg rounded-lg lg:rounded-xl m-4 p-2 pt-3 pb-[3.25rem] sm:p-0 lg:p-2 sm:m-8 h-full bg-card lg:bg-card/20 xl:bg-transparent shadow-menu sm:shadow-transparent ${
            collapsed && 'sm:w-auto sm:p-2'
          }`}
        >
          <div className="grid p-0 pb-0.5 sm:h-full gap-3 sm:gap-2 grid-cols-[4fr_4fr_1fr] grid-rows-auto sm:grid-cols-none sm:grid-rows-[auto_1fr_auto_auto_auto] content-start">
            <div className="lg:bg-card rounded-lg sm:p-2">
              <div className="hidden sm:col-auto sm:block">
                <NavButton
                  collapsed={collapsed}
                  icon={collapsed && <Home {...iconStyle} />}
                  label={
                    <>
                      <span className="text-text/90">paul.</span>
                      <span className="text-text/50">hanaoka.co</span>
                    </>
                  }
                  hotkey={'h'}
                  url={'/'}
                />
              </div>
              <NavSection
                collapsed={collapsed}
                className=""
                label="Browse"
                buttons={browse}
              />
            </div>
            <div className='hidden sm:block' />
            <div className="lg:bg-card rounded-lg sm:p-2">
              <NavSection
                collapsed={collapsed}
                // className="sm:mt-2.5"
                label="Connect"
                buttons={connect}
              />
            </div>
            <ModeToggle collapsed={collapsed} className="" />
            {isMobile ? null : (
              <div className="h-full flex align-center items-center">
                <button
                  className="w-auto p-4 bg-transparent rounded-lg"
                  onClick={toggleCollapse}
                >
                  {collapsed ? (
                    <PanelLeftOpen {...iconStyle} />
                  ) : (
                    <PanelLeftClose {...iconStyle} />
                  )}
                </button>
              </div>
            )}
            <hr className="block sm:hidden col-span-3 border-text/5 mx-2 mt-2" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

// TODO add headshot in lower left corner
// TODO rotate headshot based on cursor position
