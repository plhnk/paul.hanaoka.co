/** @jsx jsx */

import { Text, Heading } from 'theme-ui';
import Wrapper from '../components/wrapper';
import { jsx } from 'theme-ui';

export default ({ pretitle, title, subtitle }) => (
  <Wrapper
    sx={{
      height: '88vh',
      mt: '24vh',
    }}
  >
    <Text as="span">{pretitle}</Text>
    <Text
      as="h1"
      sx={{
        fontSize: [6, 7],
      }}
    >
      {title}
    </Text>
    <Text as="h2">{subtitle}</Text>
  </Wrapper>
);
