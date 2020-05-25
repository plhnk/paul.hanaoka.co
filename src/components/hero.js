/** @jsx jsx */

import { Styled, Text, Image, Heading, Box } from 'theme-ui';
import NavBar from '../components/navbar'
import Wrapper from '../components/wrapper'
import Img from 'gatsby-image'
import { jsx } from 'theme-ui'

export default ({ image, pretitle, title, subtitle, data }) => (
  <Wrapper>
    <Box>
      <Text as="span">{pretitle}</Text>
      <Heading
        as="h1"
        sx={{
          fontSize: 7,
        }}
      >
        {title}
      </Heading>
      <Text as="h2">{subtitle}</Text>
    </Box>
    <Img fluid={image} />
    <NavBar />
  </Wrapper>
);
