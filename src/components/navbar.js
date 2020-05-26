/** @jsx jsx */

import ThemeToggle from './ThemeToggle';
import { jsx, Link } from 'theme-ui';
import SocialIcons from './socialIcons';

export default (props) => (
  <nav
    {...props}
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <Link>[logo]</Link>
    <div sx={{ 
        mx: ['auto', null, '10%' ]
        }} />
    <SocialIcons/>
    {/* <Link>[feed]</Link>
    <Link>[about]</Link>
    <Link>[design]</Link> */}
    <div sx={{ mx: 'auto' }} />
    <ThemeToggle />
  </nav>
);
