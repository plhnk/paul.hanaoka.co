'use client';
import React, { useState, useEffect } from 'react';
import NavButton from './navbutton';
import { usePathname } from 'next/navigation';
import Sidebar from '../sidebar';

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
        <div className="flex justify-between m-4 backdrop-blur-lg bg-card/65 rounded-xl px-1">
          <NavButton label="Home" url="/" icon={undefined} hotkey={'h'} />
          <button onClick={handleMenuButtonClick} className="px-3">
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

// TODO why does window go wonky on /about
// // TODO add mobile styles for nav
// e.g. box shadow when nav is open, merge border radii
