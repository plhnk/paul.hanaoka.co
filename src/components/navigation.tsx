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
    <div>
      {isMobile ? <MobileMenu /> : <Sidebar />}
    </div>
  );
};

export default Navigation;