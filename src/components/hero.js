/** @jsx jsx */

import { Text, Heading, Box, Flex } from 'theme-ui';
import Wrapper from '../components/wrapper';
import { jsx } from 'theme-ui';

export default ({ pretitle, title, subtitle }) => (
  <Flex>
    <Wrapper
      sx={{
        width: ['100%', null, '50%'],
        ml: [null, null, '50%']
      }}
    >
      <Box
        sx={{
          height: '100vh',
          mt: '24vh',
        }}
      >
        <Text as="span">{pretitle}</Text>
        <Heading
          as="h1"
          sx={{
            fontSize: [6, 7],
          }}
        >
          {title}
        </Heading>
        <Text as="h2">{subtitle}</Text>
      </Box>
    </Wrapper>
  </Flex>
);
