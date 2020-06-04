/** @jsx jsx */

import { jsx, Styled, Text } from 'theme-ui';
import Wrapper from '../components/wrapper';

export default ({ pretitle, title, subtitle }) => (
  <Wrapper
    sx={{
      height: '88vh',
      mt: '24vh',
    }}
  >
    <Text
      sx={{
        variant: 'styles.italic',
      }}
      as="span"
    >
      {pretitle}
    </Text>
    <Styled.h1
      as="h1"
      sx={{
        fontSize: ['12vw', 7, '6.9vw'],
      }}
    >
      {title}
    </Styled.h1>
    <Text as="h2">{subtitle}</Text>
  </Wrapper>
);
