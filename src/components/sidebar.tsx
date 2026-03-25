'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Home, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModeToggle from './ui/modetoggle';
import NavButton from './ui/navbutton';
import NavSection from './ui/navsection';
import {
  browseItems,
  connectItems,
  type SidebarItemConfig,
} from './sidebar-config';

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  toggleCollapse?: () => void;
}

function isActiveRoute(currentPath: string | null, route: string): boolean {
  if (currentPath === null) {
    return false;
  }

  return currentPath === route || currentPath.startsWith(`${route}/`);
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)
  );
}

export default function Sidebar({
  className,
  collapsed,
  toggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        isEditableElement(event.target)
      ) {
        return;
      }

      const sidebar = sidebarRef.current;
      if (!sidebar) {
        return;
      }

      const key = event.key.toLowerCase();
      const hotkeyTarget = Array.from(
        sidebar.querySelectorAll<HTMLElement>('[data-hotkey]')
      ).find(
        (element) =>
          element.dataset.hotkey === key &&
          element.getClientRects().length > 0 &&
          !element.hasAttribute('disabled')
      );

      if (!hotkeyTarget) {
        return;
      }

      event.preventDefault();
      hotkeyTarget.click();
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const getIconStyle = (route: string | undefined, checkActive = true) => ({
    size: 16,
    color: 'currentColor',
    strokeWidth: 2,
    className: `hidden sm:block self-center group-hover:text-accent group-focus-visible:text-accent/60 ${
      checkActive && route && isActiveRoute(pathname, route)
        ? 'text-accent'
        : 'text-element/50'
    }`,
  });

  const createButtons = (
    items: SidebarItemConfig[],
    checkActive = true
  ) =>
    items.map((item) => {
      const Icon = item.icon;

      return {
        ...item,
        collapsed,
        icon: <Icon {...getIconStyle(item.url, checkActive)} />,
      };
    });

  const browseButtons = createButtons(browseItems);
  const connectButtons = createButtons(connectItems, false);

  return (
    <nav
      ref={sidebarRef}
      className={cn(
        'z-40 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen sm:pb-16 mb-1',
        className
      )}
    >
      <div
        className={`sm:w-64 lg:w-auto rounded-xl m-4 p-2 pt-3 pb-[3.25rem] sm:p-0 lg:p-2 sm:m-8 h-full bg-card lg:bg-transparent shadow-menu sm:shadow-transparent transition-all duration-300 ${
          collapsed ? 'sm:w-auto' : ''
        }`}
      >
        <div className="grid p-0 pb-0.5 sm:h-full gap-3 sm:gap-0 lg:gap-8 grid-cols-[1fr_2fr] grid-rows-auto sm:grid-cols-none sm:grid-rows-[auto_1fr_auto] content-start overflow-y-scroll hide-scrollbar transition-all duration-300">
          <div className="lg:bg-card rounded-xl sm:p-2">
            <div className="hidden sm:col-auto sm:block">
              <NavButton
                collapsed={collapsed}
                icon={
                  collapsed ? <Home {...getIconStyle(undefined, false)} /> : null
                }
                label={
                  <span>
                    <span className="text-text/90 gap-0">paul.</span>
                    <span className="text-text/50">hanaoka.co</span>
                  </span>
                }
                hotkey="h"
                url="/"
                className="mb-2 lg:mb-4"
              />
            </div>
            <NavSection
              collapsed={collapsed}
              label="Browse"
              buttons={browseButtons}
            />
          </div>
          <div className="hidden sm:block" />
          <div className="lg:bg-card rounded-xl sm:p-2 flex justify-between sm:flex-col gap-6 sm:gap-4">
            <NavSection
              collapsed={collapsed}
              className="w-full"
              label="Connect"
              buttons={connectButtons}
            />
            <ModeToggle collapsed={collapsed} className="mr-2 sm:mr-[unset]" />
            <NavButton
              collapsed={collapsed}
              onClick={toggleCollapse}
              hotkey="s"
              className="hidden sm:flex"
              icon={
                collapsed ? (
                  <PanelLeftOpen {...getIconStyle(undefined, false)} />
                ) : (
                  <PanelLeftClose {...getIconStyle(undefined, false)} />
                )
              }
            />
          </div>
          <hr className="block sm:hidden col-span-2 border-text/5 mx-2 mt-2" />
        </div>
      </div>
    </nav>
  );
}
