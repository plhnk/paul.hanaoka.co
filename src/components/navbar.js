/** @jsx jsx */

import ThemeToggle from './themeToggle';
import { jsx, Link, Flex } from 'theme-ui';
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
      <Link>[logo]</Link>
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
