import React from 'react';
import Proverbs from './widgets/proverbs';
import WeirdGuy from './widgets/weird-guy';

const Footer: React.FC = () => {
  return (
    <footer className="my-16">
      <Proverbs />
      {/* <WeirdGuy imageUrl="/images/tiny-dank-guy.png" /> */}
    </footer>
  );
};

export default Footer;
