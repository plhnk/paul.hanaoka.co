import React from 'react';
import Proverbs from './widgets/proverbs';
import WeirdGuy from './widgets/weird-guy';

const Footer: React.FC = () => {
  return (
    <footer className="main-grid m-4 mt-10 sm:m-8 md:mb-24 sm:ml-80 max:ml-8">
      <div className="col-span-5 col-start-1 sm:col-start-2">
        <Proverbs />
      </div>
      {/* <WeirdGuy imageUrl="/images/tiny-dank-guy.png" /> */}
    </footer>
  );
};

export default Footer;
