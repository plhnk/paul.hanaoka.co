/** @jsx jsx */

import ThemeToggle from './themeToggle';
import { jsx, Flex, NavLink, useColorMode } from 'theme-ui';
import SocialIcons from './socialIcons';

// TODO show/hide nav on scroll https://www.digitalocean.com/community/tutorials/gatsbyjs-react-hooks-gatsby

const NavBar = (props) => {
  
  return (
    <Flex
      id="hidingNav"
      as="nav"
      {...props}
      sx={{
        alignItems: 'center',
        backgroundColor: ['black', null, 'transparent'],
        zIndex: 3,
        maxWidth: '100vw',
        p: 3,
        m: 3,
        // ml: [null, null, '-44%'],
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <NavLink
        href="/"
        sx={{
          pl: 0,
        }}
      >
        H
      </NavLink>
      <div sx={{ mx: ['auto', 3, null] }} />
      <Flex>
        <NavLink href="/photos">Photos</NavLink>
        <NavLink href="/posts">Posts</NavLink>
      </Flex>
      <div
        sx={{
          mx: ['auto', 3, '7vw'],
        }}
      />
      <SocialIcons
        sx={{ display: ['none', 'grid', null] }}
      />
      <div sx={{ mx: 'auto' }} />
      <ThemeToggle sx={{ color: 'white' }} />
    </Flex>
  );
};

export default NavBar;
