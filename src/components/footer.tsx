import React, { useState, useEffect } from 'react';
import Proverbs from './widgets/proverbs';
import Weather from './widgets/weather';
import Photos from './widgets/photos';
import Calendar from './widgets/calendar';
import { getDateInfo } from '../lib/utils';
import Link from '@/components/ui/link';
import { MousePointer2, MoveUp } from 'lucide-react';
import { useSidebarContext } from '@/components/sidebar-provider';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  const { collapsed } = useSidebarContext();
  const year = getDateInfo().year;
  const [isVisible, setIsVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setIsVisible(scrollTop > 300);
      setAtBottom(scrollTop + windowHeight >= fullHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toTop = (
    <Button
      onClick={scrollToTop}
      className={`group fixed bottom-32 sm:bottom-12 backdrop-blur-sm right-4 sm:right-8 py-3 px-2 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${atBottom ? 'bg-accent' : 'bg-element/20'} text-white/80`}
      aria-label="Scroll to top"
    >
      <div className="relative w-5 h-8">
        <MoveUp className="w-5 h-8 absolute top-0 left-0 transform transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-0 ease-in-out" />
        <MoveUp className="w-5 h-8 absolute top-0 left-0 transform transition-all duration-300 group-hover:translate-y-0 translate-y-6 opacity-0 group-hover:opacity-100 ease-in-out" />
      </div>
    </Button>
  );

  return (
    <footer
      className={`main max-sm:grid-cols-4 max-sm:mb-32 sm:mt-48 ${
        collapsed ? 'sm:ml-32 xl:ml-0 2xl:mx-0' : 'sm:ml-80 xl:ml-0 2xl:mx-0'
      }`}
    >
      <Weather className="lg:col-start-2 col-span-2" />
      <Calendar className="col-span-2 md:max-lg:order-2" />
      <Photos className="col-start-1 md:col-start-3 lg:col-start-6 max-md:col-span-4 col-span-3 max-sm:h-[70vh] max-h-[800px] row-span-2 md:max-lg:order-1 md:max-lg:row-span-3" />
      <Proverbs className="lg:col-start-2 col-span-4 md:max-lg:col-span-2 md:max-lg:order-3" />
      <div className="flex flex-col md:flex-row justify-between lg:col-start-2 col-span-full lg:col-span-7 mt-40 md:mb-14 text-text/80 pr-12 lg:pr-0 order-last">
        <div className="">
          <MousePointer2 className="-ml-2 -mt-2 lg:-ml-6 md:-mt-8 block md:inline text-text/20" />
          <Link href="/about#Colophon">Designed & Built in the PNW </Link>
        </div>
        <span className="">
        <Link href="/privacy">Privacy Policy</Link>
          <span className='text-text/40 mx-4'>|</span> {'plhnk ©️ ' + year} 
        </span>
      </div>
      {toTop}
    </footer>
  );
};

export default Footer;
