import React from 'react';
import Proverbs from './widgets/proverbs';
import Weather from './widgets/weather';
import Photos from './widgets/photos';
import Calendar from './widgets/calendar';

const Footer: React.FC = () => {
  return (
    <footer className="main-grid m-4 sm:mt-48 sm:pb-48 sm:m-8 sm:ml-80 xl:ml-0">
      <Weather className='col-start-2 col-span-2' />
      <Calendar className='col-span-2' />
      <Photos className='col-span-3 row-span-2' />
      <Proverbs className='col-start-2 col-span-4' />
    </footer>
  );
};

export default Footer;
