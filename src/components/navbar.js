/** @jsx jsx */

import ThemeToggle from './ThemeToggle';
import { jsx, Link, useColorMode } from 'theme-ui';
import SocialIcons from './socialIcons';
import theme from '../gatsby-plugin-theme-ui'

export default (props) => {
    const colorMode = useColorMode()
  return (
    <nav
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Link>[logo]</Link>
      <div
        sx={{
          mx: ['auto', null, '14vw'],
        }}
      />
      <SocialIcons />
      {/* <Link>[feed]</Link>
    <Link>[about]</Link>
    <Link>[design]</Link> */}
      <div sx={{ mx: 'auto' }} />
      <ThemeToggle />
    </nav>
  );
};
