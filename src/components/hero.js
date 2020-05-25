/** @jsx jsx */

import { Text, Heading, Box, Flex } from 'theme-ui';
import NavBar from '../components/navbar'
import Wrapper from '../components/wrapper'
import Img from 'gatsby-image'
import { jsx } from 'theme-ui'

export default ({ image, pretitle, title, subtitle }) => (
  <Wrapper>
    <Box>
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
        fluid={image} />
    </Flex>
    <NavBar />
  </Wrapper>
);
