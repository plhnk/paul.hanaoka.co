/** @jsx jsx */

import ThemeToggle from './themeToggle';
import { jsx, Flex, NavLink } from 'theme-ui';
import SocialIcons from './socialIcons';

export default (props) => {
    // const colorMode = useColorMode()
  return (
    <Flex
      as='nav'
      {...props}
      sx={{
        alignItems: 'center',
        width: '100%',
      }}
    >
      <NavLink href='/' sx={{fontFamily: 'heading', fontWeight:'heading', size:3,}}>H</NavLink>
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
