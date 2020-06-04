/** @jsx jsx */

import ThemeToggle from './themeToggle';
import { jsx, Flex, NavLink } from 'theme-ui';
import SocialIcons from './socialIcons';

export default (props) => {
  return (
    <Flex
      as='nav'
      {...props}
      sx={{
        alignItems: 'center',
        width: '100%',
      }}
    >
      <NavLink href='/' sx={{fontFamily: 'heading', fontWeight:'heading'}}>H</NavLink>
      <div
        sx={{
          mx: ['auto', null, '14vw'],
        }}
      />
      <SocialIcons />
      <div sx={{ mx: 'auto' }} />
      <ThemeToggle />
    </Flex>
  );
};
