'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  BadgeCheck,
  BookOpen,
  Calendar,
  Camera,
  CircleUserRound,
  Layers,
  PanelLeftOpen,
  PanelLeftClose,
  Mail,
  PenLine,
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
import { install } from '@github/hotkey';

interface SidebarProps {
  children?: ReactNode;
  iconStyle?: object;
  className?: string;
  collapsed?: boolean;
  toggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  collapsed,
  toggleCollapse,
}) => {
  const pathname = usePathname();
  const isActiveRoute = (
    currentPath: string | null,
    route: string
  ): boolean => {
    if (currentPath === null) return false;
    return currentPath === route || currentPath.startsWith(`${route}/`);
  };

  const [isMobile, setIsMobile] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);

  // const handleScroll = (e) => {
  //   const element = e.target;
  //   setIsScrolled(
  //     element.scrollTop > 0 &&
  //       element.scrollTop + element.clientHeight < element.scrollHeight
  //   );
  // };
  // start to have custom scrollbar...probably not worth it

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    // const sidebarElement = document.querySelector('.scroll-y');
    // if (sidebarElement) {
    //   sidebarElement.addEventListener('scroll', handleScroll);
    //   return () => sidebarElement.removeEventListener('scroll', handleScroll);
    // }
    const setupHotkeys = () => {
      const elements = document.querySelectorAll('[data-hotkey]');
      elements.forEach((el) => {
        install(el as HTMLElement, el.getAttribute('data-hotkey')!);
        el.addEventListener('hotkey-fire', (event) => {
          // console.log('Hotkey fired:', event);
          if (event.target instanceof HTMLElement) {
            // console.log('Hotkey fired for element:', event.target);
            event.target.click();
          }
        });
      });
    };

    // wait half second for DOM to be ready? for sidebar collapse
    setTimeout(() => {
      setupHotkeys();
    }, 100);

    // Setup a MutationObserver to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          setupHotkeys();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const getIconStyle = (route: string | null, checkActive: boolean = true) => ({
    size: 16,
    color: 'currentColor',
    strokeWidth: 2,
    className: `hidden sm:block self-center group-hover:text-accent group-focus-visible:text-accent/60 ${
      checkActive && route && isActiveRoute(pathname, route)
        ? 'text-accent'
        : 'text-element/50'
    }`,
  });

  const browse = [
    {
      icon: <CircleUserRound {...getIconStyle('/about')} />,
      label: 'About',
      hotkey: 'a',
      collapsed: collapsed,
      url: '/about',
    },
    {
      icon: <BookOpen {...getIconStyle('/readme')} />,
      label: 'Readme',
      hotkey: 'e',
      collapsed: collapsed,
      url: '/readme',
    },
    {
      icon: <BadgeCheck {...getIconStyle('/recommends')} />,
      label: 'Picks',
      hotkey: 'i',
      collapsed: collapsed,
      url: '/recommends',
    },
    {
      icon: <Layers {...getIconStyle('/projects')} />,
      label: 'Projects',
      hotkey: 'o',
      collapsed: collapsed,
      url: '/projects',
    },
    {
      icon: <Camera {...getIconStyle('/photos')} />,
      label: 'Photos',
      hotkey: 'u',
      collapsed: collapsed,
      url: '/photos',
    },
    {
      icon: <PenLine {...getIconStyle('/posts')} />,
      label: 'Posts',
      hotkey: 'y',
      collapsed: collapsed,
      url: '/posts',
    },
    // write a test so that hotkeys don't conflict
  ];

  const connect = [
    {
      icon: <Calendar {...getIconStyle(null, false)} />,
      label: 'Calendar',
      hotkey: 'c',
      collapsed: collapsed,
      url: 'https://cal.com/plhnk',
    },
    {
      icon: <Mail {...getIconStyle(null, false)} />,
      label: 'Email',
      hotkey: 'm',
      collapsed: collapsed,
      textToCopy: 'paul@hanaoka.co',
    },
    {
      icon: <Github {...getIconStyle(null, false)} />,
      label: 'GitHub',
      hotkey: 'g',
      collapsed: collapsed,
      url: 'https://github.com/plhnk',
    },
    {
      icon: <Github {...getIconStyle(null, false)} />,
      label: 'Text me',
      hotkey: 'w',
      collapsed: collapsed,
      url: 'sms:+13105259584',
    },
    {
      icon: <FileText {...getIconStyle(null, false)} />,
      label: 'Read.cv',
      hotkey: 'r',
      collapsed: collapsed,
      url: 'https://read.cv/plhnk',
    },
    {
      icon: <Twitter {...getIconStyle(null, false)} />,
      label: 'Twitter',
      hotkey: 't',
      collapsed: collapsed,
      url: 'https://twitter.com/plhnk',
    },
  ];

  return (
    <>
      <nav
        // wrapper (no bg)
        className={cn(
          'z-40 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen sm:pb-16 mb-1',
          className
        )}
      >
        <div
          // inner wrapper (invisible on larger screens)
          className={`sm:w-64 lg:w-auto rounded-xl m-4 p-2 pt-3 pb-[3.25rem] sm:p-0 lg:p-2 sm:m-8 h-full bg-card lg:bg-transparent shadow-menu sm:shadow-transparent transition-all duration-300 ${
            collapsed && 'sm:w-auto'
          }`}
        >
          {/* TODO customize overflow scrollbar */}
          {/* {isScrolled && (
              <div className="absolute top-0 left-[-8px] h-full w-2 bg-gray-300 rounded-full" />
            )} */}
          {/* <div
            className={`absolute top-0 left-0 right-0 h-6 pointer-events-none ${
              isScrolled ? 'bg-gradient-to-b from-gray-100' : ''
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 h-6 pointer-events-none ${
              isScrolled ? 'bg-gradient-to-t from-gray-100' : ''
            }`}
          /> */}
          <div className="grid p-0 pb-0.5 sm:h-full gap-3 sm:gap-0 lg:gap-8 grid-cols-[1fr_2fr] grid-rows-auto sm:grid-cols-none sm:grid-rows-[auto_1fr_auto] content-start overflow-y-scroll hide-scrollbar transition-all duration-300">
            <div className="lg:bg-card rounded-xl sm:p-2">
              <div className="hidden sm:col-auto sm:block">
                <NavButton
                  collapsed={collapsed}
                  icon={collapsed && <Home {...getIconStyle(null, false)} />}
                  label={
                    <span>
                      <span className="text-text/90 gap-0">paul.</span>
                      <span className="text-text/50">hanaoka.co</span>
                    </span>
                  }
                  hotkey={'h'}
                  url={'/'}
                  className="mb-2 lg:mb-4"
                />
              </div>
              <NavSection
                collapsed={collapsed}
                className=""
                label="Browse"
                buttons={browse}
              />
            </div>
            <div className="hidden sm:block" />
            <div className="lg:bg-card rounded-xl sm:p-2 flex justify-between sm:flex-col gap-6 sm:gap-4">
              <NavSection
                collapsed={collapsed}
                className="w-full"
                label="Connect"
                buttons={connect}
              />
              <ModeToggle
                collapsed={collapsed}
                className="mr-2 sm:mr-[unset]"
              />
              {isMobile ? null : (
                <NavButton
                  collapsed={collapsed}
                  onClick={toggleCollapse}
                  hotkey="s"
                  icon={
                    collapsed ? (
                      <PanelLeftOpen {...getIconStyle(null, false)} />
                    ) : (
                      <PanelLeftClose {...getIconStyle(null, false)} />
                    )
                  }
                />
              )}
            </div>
            <hr className="block sm:hidden col-span-2 border-text/5 mx-2 mt-2" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
