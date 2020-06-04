/** @jsx jsx */

import { jsx, Styled, Text } from 'theme-ui';
import Wrapper from '../components/wrapper';

export default ({ pretitle, title, subtitle }) => (
  <Wrapper
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
    <Styled.h1
      as="h1"
      sx={{
        ml: '-0.05em',
        fontSize: ['12vw', 7, '6.9vw'],
      }}
    >
      {title}
    </Styled.h1>
    <Styled.h2 sx={{fontFamily: 'body', fontWeight: 'body', color: 'neutral2',}}>{subtitle}</Styled.h2>
  </Wrapper>
);
