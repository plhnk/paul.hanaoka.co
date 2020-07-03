/** @jsx jsx */

import ThemeToggle from './themeToggle';
import Gradient from './gradient';
import { jsx, Flex, NavLink } from 'theme-ui';
import SocialIcons from './socialIcons';

// TODO show/hide nav on scroll https://www.digitalocean.com/community/tutorials/gatsbyjs-react-hooks-gatsby

const NavBar = (props) => {
  
  return (
    <Flex
      id='hidingNav'
      as="nav"
      {...props}
      sx={{
        alignItems: 'center',
        width: '100%',
        zIndex: 3,
        backgroundColor: ['text', 'transparent', null],
      }}
    >
      {/* <Gradient
        to='top'
        sx={{
          fill: 'background',
          position: 'absolute',
          zIndex: 0,
          left: 0,
          width: '100vw',
          bottom: 0,
          height: '24vh',
          minHeight: '200px',
          maxHeight: '400px',
        }}
      /> */}
      <NavLink
        href="/"
        sx={{
          fontFamily: 'heading',
          fontWeight: 'heading',
          color: ['background', 'text', null],
        }}
      >
        H
      </NavLink>
      <div
        sx={{
          mx: ['auto', null, '14vw'],
        }}
      />
      <SocialIcons display={['dribbble', 'github', 'twitter', 'unsplash']} />
      <div sx={{ mx: 'auto' }} />
      <ThemeToggle />
    </Flex>
  );
};

export default NavBar;
