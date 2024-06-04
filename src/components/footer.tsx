import React from 'react';
import Proverbs from './widgets/proverbs';
import WeirdGuy from './widgets/weird-guy';

const Footer: React.FC = () => {
  return (
    <footer className="main-grid m-4 sm:mt-60 sm:m-8 md:mb-24 sm:ml-80 2xl:ml-8">
      <div className="col-span-5 col-start-1 lg:col-start-2  after:absolute after:-top-4 after:-left-4 after:-right-4 after:-bottom-4 p-4 after:bg-transparent-window after:m-4 relative after:pointer-events-none">
        <Proverbs />
      </div>
      {/* <WeirdGuy imageUrl="/images/tiny-dank-guy.png" /> */}
      {/* <div className="col-start-8">Colophon</div> */}
    </footer>
  );
};

export default Footer;
