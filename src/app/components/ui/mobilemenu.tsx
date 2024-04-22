'use client';
import React, { useState, useEffect } from 'react';
import NavButton from './navbutton';
import { usePathname } from 'next/navigation';
import Sidebar from '../sidebar';
import { cn } from '@/lib/utils';

const MobileMenu: React.FC = () => {
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
        <div className={cn("flex justify-between m-4 mt-0 py-1 px-1", isMobileMenuOpen ? 'bg-accent/05' : 'backdrop-blur-lg bg-card/65 rounded-xl shadow-menu')}>
          <NavButton label="Hanaoka.co" url="/" icon={undefined} hotkey={'h'} /> 
          <button onClick={handleMenuButtonClick} className="px-3">
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

// TODO why does window go wonky on /about --> can possibly ignore b/c it looks fine on a phone
// TODO add mobile styles for nav
// e.g. box shadow when nav is open, merge border radii
// connect the homepage icon with the weather