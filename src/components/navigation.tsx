'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import MobileMenu from './ui/mobilemenu';

const Navigation: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  return (
    <>
      {isMobile ? <MobileMenu /> : <Sidebar />}
    </>
  );
};

export default Navigation;

// TODO use reference instead of hardcoding value https://tailwindcss.com/docs/configuration#referencing-in-java-script