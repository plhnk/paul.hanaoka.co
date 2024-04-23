'use client';
import React, { useState, useEffect } from 'react';
import NavButton from './navbutton';
import { usePathname } from 'next/navigation';
import Sidebar from '../sidebar';
import { cn } from '@/lib/utils';
import { getIcon, useWeatherData } from '../../lib/utilities/weather';
import { X, Menu } from 'lucide-react';

const MobileMenu: React.FC = () => {
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

  return (
    <>
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
          <NavButton className='w-auto rounded-[.85rem]' label="Hanaoka.co" url="/" icon={icon} hotkey={'h'} />
          <button
            onClick={handleMenuButtonClick}
            className="my-0.5 py-2 px-3 flex"
          >
            {isMobileMenuOpen ? (
              <>
                Close <X size={18} color="currentColor" className="ml-2 self-center text-text/80" />
              </>
            ) : (
              <>
                {' '}
                Menu <Menu size={18} color="currentColor" className="ml-2 self-center text-text/80" />
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