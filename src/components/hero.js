/** @jsx jsx */

import { jsx, Styled, Text, Box } from 'theme-ui';
import SocialIcons from './socialIcons';

const H1 = Styled.h1
const H2 = Styled.h2

export default ({ pretitle, title, subtitle }) => (
  <Box
    sx={{
      height: '88vh',
      mt: ['20vh', null, '30vh'],
    }}
  >
    <Text
      sx={{
        variant: 'styles.italic',
        color: 'neutral2',
      }}
      as="span"
    >
      {pretitle}
    </Text>
    <H1
      as="h1"
      sx={{
        ml: '-0.05em',
        fontSize: ['12vw', 7, '6.9vw'],
      }}
    >
      {title}
    </H1>
    <H2 sx={{fontFamily: 'body', fontWeight: 'body', color: 'neutral2',}}>{subtitle}</H2>
    <SocialIcons 
    sx={{
      float: 'right',
      mr: 3,
      mt: 4,
      gridTemplateColumns: 'none',
      position: 'sticky',
      top: 4,
      display:['grid', 'none', null]
      }} />
  </Box>
);
