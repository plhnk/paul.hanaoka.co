'use client';
import React, { useState, useEffect, useRef } from 'react';
import NavButton from './navbutton';
import { usePathname } from 'next/navigation';
import Sidebar from '../sidebar';
import { cn } from '@/lib/utils';
import { getIcon, useWeatherData } from '../../lib/utilities/weather';
import { X, Menu } from 'lucide-react';
import ProgressiveBlur from './progressiveblur';

const MobileMenu: React.FC = () => {
  const menuRef = useRef(null);

  const { data, isLoading } = useWeatherData();

  const shortForecast = data
    ? data.forecastData.properties.periods[0].shortForecast
    : 'loading...';

  const iconStyle = {
    size: 16,
    className: 'text-text/80 mr-2 self-center',
  };

  const icon = getIcon(shortForecast, iconStyle);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(true);

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // reset the mobile menu state when the pathname changes
  const resetState = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [resetState]);

  // close the mobile menu when clicking/touching outside it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        (menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        handleMenuButtonClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={menuRef}
        className={
          isMobileMenuOpen ? 'absolute top-0 left-0 w-dvw h-dvh' : 'hidden'
        }
      />
      <ProgressiveBlur
        className={
          'fixed bottom-0 left-0 w-full ' +
          `${isMobileMenuOpen ? 'h-4/5' : 'h-1/5'}`
        }
      />
      <Sidebar className={isMobileMenuOpen ? 'block' : 'hidden'} />
      <div className="sm:hidden fixed bottom-1 left-0 w-full z-50">
        <div
          className={cn(
            'flex justify-between m-4 mt-0 py-1 px-1',
            isMobileMenuOpen
              ? 'bg-accent/05'
              : 'backdrop-blur-lg bg-card/65 rounded-xl shadow-menu'
          )}
        >
          <NavButton
            className="w-auto rounded-[.85rem]"
            label={
              <>
                <span className="text-text/90">paul.</span>
                <span className="text-text/50">hanaoka.co</span>
              </>
            }
            url="/"
            icon={icon}
            hotkey={'h'}
          />
          <button
            onClick={handleMenuButtonClick}
            className="my-0.5 py-2 px-3 flex"
          >
            {isMobileMenuOpen ? (
              <>
                Close{' '}
                <X
                  size={18}
                  color="currentColor"
                  className="ml-2 self-center text-text/80"
                />
              </>
            ) : (
              <>
                {' '}
                Menu{' '}
                <Menu
                  size={18}
                  color="currentColor"
                  className="ml-2 self-center text-text/80"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

// TODO why does window go wonky on /about --> can possibly ignore b/c it looks fine on a phone
// TODO progressive blur outside open menu?
// TODO tap anywhere outside menu to close
