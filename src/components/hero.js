/** @jsx jsx */

import { Text, Heading, Box, Flex } from 'theme-ui';
import Wrapper from '../components/wrapper';
import Img from 'gatsby-image';
import { jsx } from 'theme-ui';

export default ({ image, pretitle, title, subtitle }) => (
  <div>
    <Wrapper>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
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
    <Flex
      sx={{
        alignItems: 'flex-end',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <Img
        sx={{
          width: '100%',
          height: '50vh',
        }}
        fluid={image}
      />
    </Flex>
  </div>
);
