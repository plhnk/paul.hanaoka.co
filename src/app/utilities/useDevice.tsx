'use client';
import { useEffect } from 'react';

export function useDevice(
    mobileComponent: React.ReactNode,
    desktopComponent: React.ReactNode
  ) {
    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 640px)'); // using Tailwind default for sm size
  
      const handleWindowSizeChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          // Code to execute when the media query matches (window width is 640px or larger)
          desktopComponent;
          console.log('desktop');
        } else {
          mobileComponent;
          console.log('mobile');
        }
      };
  
      // Initial check of the media query
      handleWindowSizeChange({
        matches: mediaQuery.matches,
      } as MediaQueryListEvent);
  
      // Add listener for changes in the media query
      mediaQuery.addListener(handleWindowSizeChange);
  
      // Cleanup function to remove the listener when the component unmounts
      return () => {
        mediaQuery.removeListener(handleWindowSizeChange);
      };
    }, []); // Empty dependency array since we only want to run this effect once
  }
  